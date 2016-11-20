'use strict';

// Declare app level module which depends on views, and components
var myApp=angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'youtube-embed'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

myApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
});

myApp.service('uriService',function(){
  var uriString = 'uriFromservice';

  var setUri = function(newObj) {
    uriString= newObj
  };

  var getUri = function(){
    return uriString;
  };

  return {
    setUri:setUri,
    getUri:getUri
  };

});
myApp.value('uri','someUri');

myApp.controller('myctrlr',['$scope','$http','uriService',function($scope,$http,uriService){
  $scope.theVideo='sMKoNBRZM1M';
  $scope.baseUri="https://embed.spotify.com/?uri=spotify:trackset:Tracks:";
  $scope.uri=uriService.getUri();

  $scope.setUri=function(s){
    uriService.setUri(s);
  };
  var tracks = '';
  $scope.getGenre=function(genre){
    $http({ method: 'GET', url: 'https://api.spotify.com/v1/search?q=genre:'+genre+'&type=track' }).
    success(function (data, status, headers, config) {
      //console.log(JSON.stringify(data));
      console.log(data.tracks.items)
      data.tracks.items
      tracks='';
      for(var i =0;i<(data.tracks.items.length<10?data.tracks.items.length:10);i++){
        //console.log(data.tracks.items[i].uri);
        tracks= tracks +','+ data.tracks.items[i].uri.replace("spotify:track:","");
      }
      tracks = tracks.slice(1);
      console.log(tracks);
      uriService.setUri(tracks);
    }).
    error(function (data, status, headers, config) {
      console.log(JSON.stringify(data));
      console.log(status+headers+config);
    });
  };

}]);

