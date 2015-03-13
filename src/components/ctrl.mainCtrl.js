module.exports = function($scope, TestFactory, $upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
		$upload.upload({
			url: '/',
			method: 'POST',
			file: files
		});
    };
}
