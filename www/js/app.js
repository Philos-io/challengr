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
    controller: 'ChallengrController as vm'
  })
  .state('challengr', {
    url: '/challengr/:userid',
    templateUrl: 'templates/challengr.html',
    controller: 'ChallengrController as vm'
  });

  $urlRouterProvider.otherwise('/contact');
})
.config(function($authProvider){
    $authProvider.facebook({
      clientId: '1570189643235177',
      url: '/auth/facebook',
      scope: 'user_friends'
    });
})
.controller('LoginController', function($auth) {
    this.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
})
.controller('ChallengrController', function($scope, $ionicModal) {
  // Create the login modal that we will use later
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

});
