module.exports = function($scope, TestFactory, $upload) {
    $scope.images = [];

    $scope.upload = function (files) {
  		$upload.upload({
  			url: '/api/upload',
  			method: 'POST',
  			file: files
  		}).success(function(data, status, headers, config) {
             console.log(data);
             $scope.images = data;
             console.log($scope.images);
      });
    }
}
