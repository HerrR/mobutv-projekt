suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt) {
	$scope.imagesPerPage = 10;
	Projekt.apiGetTopPictures();
	$scope.topPictures = function(){
		return Projekt.getTopPictures();
	}
});