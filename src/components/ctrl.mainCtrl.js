module.exports = function($scope, TestFactory, $upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
		$upload.upload({
			url: '/',
			method: 'POST',
			file: files
		}).success(function(data, status, headers, config) {
           console.log(data);
           console.log(status);
           console.log(headers);
           console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        });
    };
}
