// Controller for entire project
suckMyProject.controller('AppCtrl', function ($scope,Projekt) {
	$scope.cameraSupported = function(){
		return Projekt.getCameraSupported();
	}
	
})