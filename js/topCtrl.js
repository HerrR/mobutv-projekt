suckMyProject.controller('TopCtrl', function ($scope, $http, Projekt, $sce) {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var video = document.getElementById("video");
	var videoObj = {"video":true};
	var errBack = function(error){
		$scope.cameraSupported = false;
		console.log("Video capture error: ", error.code);
	};
	$(".scrollable").draggable();

	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

	$scope.test = function(){
		console.log($("#test").contents().find("body").html());
		// var test = $("#test");

		console.log("TEST!");
	}
	function convertCanvasToImage(canvas) {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		return image;
	}


	$scope.imagesPerPage = 10;
	Projekt.apiGetTopPictures($scope.currentPage);
	
	$scope.currentPage = function(){
		return Projekt.getCurrentPage();
	}

	$scope.currentPictureIndex = function(){
		return Projekt.getCurrentPictureIndex();
	}

	$scope.nextPicture = function(){
		context.drawImage(video, 0, 0, 500, 500);
		console.log(convertCanvasToImage(canvas));
		Projekt.setCurrentPictureIndex(Projekt.getCurrentPictureIndex()+1);
	}

	$scope.currentPicture = function(){
		// console.log(Projekt.getPicture($scope.currentPictureIndex()));
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