angular.module('app', [
]).controller('appCtrl', function($scope, $http){

  $scope.currentIndex = 0;

  $scope.incrementIndex = function(){
    this.currentIndex++;
    if(this.currentIndex >= this.headlines.length){
      this.currentIndex -= this.headlines.length;
    }
  };

  $scope.isIndex = function(index){
    return index === $scope.currentIndex;
  };

  $scope.headlines = [];
  $scope.nprHeadlines = [];

  $scope.images = [{
      src: 'http://www.sadmuffin.net/cherrybam/graphics/graphics-cartoon/pebbles-bam-bam001.gif',
      title: 'Pic 1'
    }, {
      src: 'http://www.desicomments.com/dc3/01/209355/209355.gif',
      title: 'Pic 2'
    }, {
      src: 'http://www.things4myspace.com/wp-content/uploads/2007/cartoon/cartoon-60.gif',
      title: 'Pic 3'
    }];

  $scope.espnData = function(){
    $http({method: 'GET', url: 'http://api.espn.com/v1/now/popular?apikey=nbkcdh4nsvzpm6kj5fvy8p2e'})
    .success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.headlines = [];
      for(var i = 0; i < data.feed.length; i++){
        var cur = data.feed[i];
        $scope.headlines.push(cur);
      }
      console.log('Espn Data Successfuly Retrieved!');
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Espn Data Error!');
      console.log(data);
    });
  };

  $scope.nprData = function(){
    $http({method: 'GET', url: 'http://api.npr.org/query?id=1001&output=JSON&apiKey=MDE1MTA4OTE4MDE0MDQ0MzIxMDc5NGM4NQ001'})
    .success(function(data){
      $scope.nprHeadlines = [];
      for(var i = 0; i < 10; i++){
        var cur = data.list.story[i];
        $scope.nprHeadlines.push(cur);
      }
      console.log($scope.nprHeadlines);
    })
    .error(function(data){
      console.log('Failed to get NPR Data');
    });
  };

  $scope.espnData();


  $scope.nprData();

  setInterval(function(){
    $scope.$apply(function(){
      $scope.incrementIndex();
    });
  }, 3000);

  setInterval(function(){
    $scope.espnData();
  }, 60000);


});