var express = require('express'), app = express(), router = express.Router();

var path = require('path');
var request = require('request');
var querystring = require('querystring');
var moment = require('moment');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcript  = require('bcryptjs');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = mongoose.connect('mongodb://localhost/challengr');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  picture: String,
  facebook: String,
});

var User = mongoose.model('User', userSchema);

function createToken(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

app.post('/auth/facebook', function(req, res) {
  var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/me';
  var friensUrl = 'https://graph.facebook.com/me/friends';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: 'b3b14c6f11718a30b38299d5ed8454d8',
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }
    accessToken = querystring.parse(accessToken);

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: friensUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {

        return res.status(500).send({ message: profile.error.message });
      }
      if (req.headers.authorization) {

        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.facebook = profile.id;
            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createToken(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        //Step 3b. Create a new user account or return an existing one.
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createToken(existingUser);
            return res.send({ token: token });
          }
          var user = new User();
          user.facebook = profile.id;
          user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.displayName = profile.name;
          user.save(function() {
            var token = createToken(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

app.use(express.static(path.join(__dirname, 'www')));

app.listen(port, function(){
  console.log('app is running on port: '+ port);
})
