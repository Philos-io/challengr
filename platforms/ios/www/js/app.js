// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('challengr', ['ionic']) //satellizer

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
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'LoginController as lg'
  })
  .state('contact', {
    url: '/contact',
    templateUrl: 'templates/contact.html',
    controller: 'FriendController as vm'
  })
  .state('challengr', {
    url: '/challengr/:userid',
    templateUrl: 'templates/challengr.html',
    controller: 'ChallengrController as vm'
  })
  .state('new', {
    url: '/challengr/:userid/new',
    templateUrl: 'templates/challengrDetails.html',
    controller: 'ChallengrController as vm'
  })
  .state('details', {
    url: '/challengr/:userid/:challengrid',
    templateUrl: 'templates/challengrDetails.html',
    controller: 'ChallengrController as vm'
  })
  .state('details.new', {
    url: '/new',
    templateUrl: 'templates/challengrDetails.html',
    controller: 'ChallengrController as vm'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController as vm'
  });

  $urlRouterProvider.otherwise('/login');
})
// .config(function($authProvider){
//     $authProvider.facebook({
//       clientId: '1570189643235177',
//       url: '/auth/facebook',
//       scope: 'user_friends'
//     });
// })
.controller('LoginController', function($state, $timeout) {
    // this.authenticate = function() {
    //   $auth.authenticate('facebook');
    // };

    this.authenticate = function(){
      $timeout(function(){
        $state.go('contact');
      }, 2000);
    };
})
.controller('FriendController', function($scope, userService, $ionicModal, AppConfig){

  var self = this;

  $ionicModal.fromTemplateUrl('templates/invite.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  self.closeInvite = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  self.invite = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  self.inviteSent = function() {
  };


  function activate(){
    if (AppConfig.currentUser) {
      self.currentUser = AppConfig.currentUser;

      return
    }

    userService.getCurrentUser().then(function(response){
      self.currentUser = response.current;

      AppConfig.currentUser = self.currentUser;
    });
  }

  activate();
})
.controller('ChallengrController', function($state, $ionicModal, $ionicHistory, AppConfig, userService) {
  // Create the login modal that we will use later
  var self = this;

  function activate(){

    if (!AppConfig.currentUser) {
      
      $state.go('contact');
      
      return;
    }

    userService.getUserByID($state.params.userid)
    .then(function(friend){
      self.friend = friend;
    });


    self.lastChallenges = [];

    self.currentUser = AppConfig.currentUser;

    self.challenges = AppConfig.currentUser.challengr.filter(function(item){
      return item[$state.params.userid] !== undefined;
    })[0][$state.params.userid];

    for(var key in self.challenges){
      self.lastChallenges.push({
        name: key,
        challenges: self.challenges[key]
      });
    }
  }

  activate();

  self.goBack = function(){
    $ionicHistory.goBack();
  };

});
