suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt) {
	$scope.test = Projekt.returnVariable();
	Projekt.apiGetTopPictures();
	$scope.topPictures = function(){
		return Projekt.getTopPictures();
	}
});