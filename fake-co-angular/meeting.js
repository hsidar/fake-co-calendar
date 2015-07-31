angular.module('Meeting', ['ngResource'])


.controller('MeetingCtrl', function($scope, $resource) {
  $scope.meetings = $resource('http://fake-co-calendar.herokuapp.com/api/v1/events',{callback:'JSON_CALLBACK'},{get:{method: 'JSONP'}});
  $scope.meetingsResult = $scope.meetings.get();
});