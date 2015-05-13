suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt) {
	$scope.imagesPerPage = 1;
	Projekt.apiGetTopPictures();
	$scope.topPictures = function(){
		return Projekt.getTopPictures();
	}
});