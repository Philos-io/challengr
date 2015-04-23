(function(module){
	'use strict';


	var mehdi_davy = {
		basket: [{mehdi_score: 1, davy_score:2, done: false, startDate: ''}]
	};

	var max_davy = {
		foot: [{max_score: 2, davy_score: 2, done: true, startDate: ''}],
		fifa: [{}]
	};

	var davy = {
		firstname: 'Davy',
		lastname: 'Engone',
		picture: 'img/team_davy.jpg',
		sports: ['BASKET', 'TENNIS', 'FIFA'],
		facebookid: "9788786717561",
		token: 'qlkdjfaoierjazlkrf',
		challengr: [mehdi_davy],
		invite_sent: [],
		invite_received: []
	};

	var mehdi = {
		firstname: 'Mehdi',
		lastname: 'Mitchell',
		picture: 'img/team_mehdi.jpg',
		sports: ['BASKET', 'TENNIS', 'FIFA'],
		facebookid: "9788786717561",
		token: 'qlkdjfaoierjazlkrf',
		challengr: [mehdi_davy],
		invite_sent: [],
		invite_received: []
	};

	var data = {
		users: [davy, mehdi]
	};


	module.factory('data', function(){
		return data;
	});

})(angular.module('challengr'));