(function(module){
	'use strict';


	var challenges = {
		
		davyengone: {
			basketball: [
				{home: 1, away:2, done: false, startDate: ''},
				{home: 3, away:2, done: true, startDate: ''}
			],
			football: [
				{home: 4, away:2, done: false, startDate: ''},
				{home: 2, away:2, done: true, startDate: ''}
			]
		},
		maxczet:{
			football: [{home: 2, away: 2, done: false, startDate: ''}],
			fifa: [{home: 2, away: 2, done: true, startDate: ''}],
		}
	};

	var davy = {
		name: 'Davy Engone',
		displayName: 'davyengone',
		picture: 'img/team_davy.jpg',
		description: 'Bring up the challenge',
		sports: ['BASKET', 'TENNIS', 'FIFA'],
		facebookid: "9788786717561",
		token: 'qlkdjfaoierjazlkrf',
		challengr: [],
		friends: [mehdi],
		invite_sent: [],
		invite_received: []
	};

	var max = {
		name: 'Maxime Czetwertynski',
		displayName: 'maxczet',
		picture: 'img/team_max.jpg',
		description: 'You cannot beat at football',
		sports: ['BASKET', 'TENNIS', 'FOOTBALL'],
		facebookid: "9979877568590",
		token: 'qlkdjfaoierjazlkrf',
		challengr: [],
		friends: [mehdi],
		invite_sent: [],
		invite_received: []
	};

	var mehdi = {
		name:  'Mehdi Mitchell',
		displayName: 'mehdimitchell',
		picture: 'img/team_mehdi.jpg',
		description: 'All challenges are welcome!',
		sports: ['BASKET', 'TENNIS', 'FIFA'],
		facebookid: "9788786717561",
		token: 'qlkdjfaoierjazlkrf',
		challengr: [challenges],
		friends: [davy, max],
		invite_sent: [],
		invite_received: []
	};

	var data = {
		current: mehdi
	};

	module.factory('userService', function($q){
		return {
			getCurrentUser: function(){
				var defer = $q.defer();

				defer.resolve(data);
				return defer.promise;
			},

			getUserByID: function(displayName){
				
				var defer = $q.defer();


				var user = [davy, mehdi, max].filter(function(user){
					return user.displayName === displayName;
				})[0];

				defer.resolve(user);

				return defer.promise;
			}
		};
	})
	.value('AppConfig', {});

})(angular.module('challengr'));