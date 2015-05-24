suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt) {
	//Prepare the canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	// Check for camera support
	$scope.cameraSupported = function(){
		return Projekt.getCameraSupported();
	}

	// Prepare the video
	var video = document.getElementById("video");
	var videoObj = {"video":true};
	var errBack = function(error){
		Projekt.setCameraSupported(false);
		console.log("Video capture error: ", error.code);
	};

	function convertCanvasToImage(canvas) {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		return image;
	}

	$scope.randomSelfie = function(){
		var randomSelfie = Projekt.getRandomSelfie();
		if(Projekt.isLoading()){
			return "img/loading.gif";
		} else {		
			if(randomSelfie){
				return randomSelfie;
			} else {
				return "img/placeholder-reactionface.jpg";
			}
		}
	}

	$scope.hasDescription = function(){
		var currentPicture = Projekt.getPicture(Projekt.getCurrentPictureIndex());
		if(currentPicture){
			if(currentPicture.description){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	$scope.showReactions = function(){
		return true;
	}

	$scope.currentPage = function(){
		return Projekt.getCurrentPage();
	}

	$scope.currentPictureIndex = function(){
		return Projekt.getCurrentPictureIndex();
	}

	// The code gets a little bit repetative for "likeCurrentPicture" and "dislikeCurrentPicuture", sorry about that!
	
	$scope.likeCurrentPicture = function(){
		$scope.postLiked = true;
		$("#instructions").remove();
		$(".imageContainer").addClass('rotate-left').delay(700).fadeOut(1);
		// Get a reaction pic for the current picture from the database		
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported()){
			// If the camera is supported, take a picture of the users reactionface
			context.drawImage(video, 0, 0, 250, 250);
			var selfie = convertCanvasToImage(canvas).src;
			Projekt.setCurrentSelfie(selfie);
			Projekt.saveSelfie(selfie, $scope.currentPicture().id);
		}
	}

	$scope.dislikeCurrentPicture = function(){
		$scope.postDisliked = true;
		$("#instructions").remove();
		$(".imageContainer").addClass('rotate-right').delay(700).fadeOut(1);
		// Get a reaction pic for the current picture from the database
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported()){
			// If the camera is supported, take a picture of the users reactionface
			context.drawImage(video, 0, 0, 250, 250);
			var selfie = convertCanvasToImage(canvas).src;
			Projekt.setCurrentSelfie(selfie);
			Projekt.saveSelfie(selfie, $scope.currentPicture().id);
		}
	}

	$scope.nextPicture = function(){
		$(".imageContainer").removeClass('rotate-left rotate-right').fadeIn(400);
		$scope.postDisliked = false;
		$scope.postLiked = false;
		window.scrollTo(0,0);
		Projekt.setCurrentPictureIndex(Projekt.getCurrentPictureIndex()+1);
		
		// If the user requests the next picture after the last picture in the album we make a new api request to get more images.
		if(Projekt.getCurrentPictureIndex() === (Projekt.numFilteredPictures()-1)){
			Projekt.setCurrentPage(Projekt.getCurrentPage()+1);
			Projekt.apiGetTopPictures($scope.currentPage());
		}
	}

	$scope.yourFace = function(){
		if($scope.cameraSupported()){
			return Projekt.getCurrentSelfie();
		} else {
			return "img/camera-not-supported.jpg";
		}
	}

	$scope.currentPicture = function(){
		return Projekt.getPicture($scope.currentPictureIndex());
	}

	$scope.topPictures = function(){
		return Projekt.getTopPictures();
	}

	var startVideo = function(){
		if(navigator.getUserMedia) { // Standard
			navigator.getUserMedia(videoObj, function(stream) {
				Projekt.setCameraSupported(true);
				$scope.$apply();
				video.src = stream;
				video.play();
			}, errBack);
		} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
			navigator.webkitGetUserMedia(videoObj, function(stream){
				Projekt.setCameraSupported(true);
				$scope.$apply();
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errBack);
		}
		else if(navigator.mozGetUserMedia) { // Firefox-prefixed
			navigator.mozGetUserMedia(videoObj, function(stream){
				Projekt.setCameraSupported(true);
				$scope.$apply();
				video.src = window.URL.createObjectURL(stream);
				video.play();
			}, errBack);
		}
	}

	startVideo();
	Projekt.apiGetTopPictures($scope.currentPage());
});