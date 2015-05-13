suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt, $sce) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	$scope.cameraSupported = true;

	var video = document.getElementById("video");
	var videoObj = {"video":true};
	var errBack = function(error){
		$scope.cameraSupported = false;
		console.log("Video capture error: ", error.code);
	};

	$scope.imagesPerPage = 10;
	Projekt.apiGetTopPictures($scope.currentPage);

	$(".scrollable").draggable();

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
		if(randomSelfie){
			return randomSelfie;
		} else {
			return "img/placeholder-reactionface.jpg";
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
		console.log("Current picture LIKED!");
		$scope.postLiked = true;
		context.drawImage(video, 0, 0, 250, 250);
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported){
			Projekt.saveSelfie(convertCanvasToImage(canvas).src, $scope.currentPicture().id);
		}
	}

	$scope.dislikeCurrentPicture = function(){
		console.log("Current picture DISLIKED");
		$scope.postDisliked = true;
		context.drawImage(video, 0, 0, 250, 250);
		Projekt.getSelfie($scope.currentPicture().id);
		if($scope.cameraSupported){
			Projekt.saveSelfie(convertCanvasToImage(canvas).src, $scope.currentPicture().id);
		}
	}

	$scope.nextPicture = function(){
		$scope.postLiked = false;
		$scope.postDisliked = false;
		Projekt.setCurrentPictureIndex(Projekt.getCurrentPictureIndex()+1);
	}

	$scope.currentPicture = function(){
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
			video.src = window.URL.createObjectURL(stream);
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