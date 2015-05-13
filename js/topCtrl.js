suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt) {
	var video = document.getElementById("video");
	var videoObj = {"video":true};
	var errBack = function(error){
		$scope.cameraSupported = false;
		console.log("Video capture error: ", error.code);
	};

	$scope.imagesPerPage = 10;
	Projekt.apiGetTopPictures($scope.currentPage);
	
	$scope.currentPage = function(){
		return Projekt.getCurrentPage();
	}

	$scope.currentPictureIndex = function(){
		return Projekt.getCurrentPictureIndex();
	}

	$scope.nextPicture = function(){
		Projekt.setCurrentPictureIndex(Projekt.getCurrentPictureIndex()+1);
	}

	$scope.currentPicture = function(){
		console.log(Projekt.getPicture($scope.currentPictureIndex()));
		return Projekt.getPicture($scope.currentPictureIndex());
	}

	$scope.topPictures = function(){
		return Projekt.getTopPictures();
	}


	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			$scope.cameraSupported = true;
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			$scope.cameraSupported = true;
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			$scope.cameraSupported = true;
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
});