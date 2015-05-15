suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt, $sce) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	$scope.cameraSupported = function(){
		return Projekt.getCameraSupported();
	}

	var video = document.getElementById("video");
	var videoObj = {"video":true};
	var errBack = function(error){
		Projekt.setCameraSupported(false);
		console.log("Video capture error: ", error.code);
	};


	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

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

	$scope.likeCurrentPicture = function(){
		$scope.postLiked = true;
		// $scope.showOverlay = true;
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported()){
			context.drawImage(video, 0, 0, 250, 250);
			var selfie = convertCanvasToImage(canvas).src;
			Projekt.setCurrentSelfie(selfie);
			Projekt.saveSelfie(selfie, $scope.currentPicture().id);
			// Projekt.saveSelfie(convertCanvasToImage(canvas).src, $scope.currentPicture().id);
		}
	}

	$scope.dislikeCurrentPicture = function(){
		$scope.postDisliked = true;
		// $scope.showOverlay = true;
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported()){
			context.drawImage(video, 0, 0, 250, 250);
			// console.log(convertCanvasToImage(canvas).src);
			// $scope.yourFace = convertCanvasToImage(canvas).src;
			var selfie = convertCanvasToImage(canvas).src;
			Projekt.setCurrentSelfie(selfie);
			Projekt.saveSelfie(selfie, $scope.currentPicture().id);
			// Projekt.saveSelfie(convertCanvasToImage(canvas).src, $scope.currentPicture().id);
		}
	}

	$scope.nextPicture = function(){
		$scope.postLiked = false;
		// $scope.showOverlay = false;
		$scope.postDisliked = false;
		window.scrollTo(0,0);
		Projekt.setCurrentPictureIndex(Projekt.getCurrentPictureIndex()+1);
		if(Projekt.getCurrentPictureIndex() === (Projekt.numFilteredPictures()-1)){
			// Last picture
			Projekt.setCurrentPage(Projekt.getCurrentPage()+1);
			Projekt.apiGetTopPictures($scope.currentPage());


		}
		// console.log("Picture number "+ Projekt.getCurrentPictureIndex() +" out of "+Projekt.numFilteredPictures());
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