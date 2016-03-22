angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http){
    $scope.test = 'Hello world!';

    $scope.comments = [];
    $scope.addComment = function() {
      $scope.comments.push({title:$scope.formContent,upvotes:0});
      $scope.formContent='';
      if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
      });
      $scope.formContent = '';
    };
    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment.id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };
    $scope.getAll();
  }
]);

