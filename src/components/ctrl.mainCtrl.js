module.exports = function($scope, TestFactory, $upload) {
    $scope.image = 'tester';
    $scope.upload = function (files) {
		$upload.upload({
			url: '/api/upload',
			method: 'POST',
			file: files
		}).success(function(data, status, headers, config) {
           console.log(data);
           console.log(status);
           console.log(headers);
           console.log(config);

           $scope.image = config.file[0].name;
        });
    };
}
