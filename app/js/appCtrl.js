// Controller for entire project, for this project we only used one view but for future development this might be more useful.
suckMyProject.controller('AppCtrl', function ($scope,Projekt) {
	$scope.cameraSupported = function(){
		return Projekt.getCameraSupported();
	}
})