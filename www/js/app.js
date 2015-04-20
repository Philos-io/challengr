// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('challengr', ['ionic', 'satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($authProvider){
    $authProvider.facebook({
      clientId: '1570189643235177',
      url: '/auth/facebook',
      scope: 'user_friends'
    });

    // $authProvider.facebook({
    //   authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
    //   redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
    //   scope: 'email',
    //   scopeDelimiter: ',',
    //   requiredUrlParams: ['display', 'scope'],
    //   display: 'popup',
    //   type: '2.0',
    //   popupOptions: { width: 481, height: 269 }
    // });
})
.controller('LoginController', function($auth) {
    this.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
});;
