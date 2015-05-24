suckMyProject.factory('Projekt',function ($http) {
  var noAlbumPictures = [];
  var currentPage = 0;
  var currentPictureIndex = 0;
  var randomSelfie;
  var cameraSupported = false;
  var loading = false;
  var displayInstructions = true;
  var currentSelfie = "img/camera-not-supported.jpg";

  this.setCameraSupported = function(bool){
    cameraSupported = bool;
  }

  this.getCameraSupported = function(){
    return cameraSupported;
  }

  this.isLoading = function(){
    return loading;
  }

  // API call to imgur for their top pictures.
  this.apiGetTopPictures = function(page){
    var req = {
      method: "GET",
      url: "https://api.imgur.com/3/gallery/hot/viral/"+page+".json",
      headers: {
        "Authorization":"Client-ID 01bb30dcd7262a6",
        "Accept": 'application/json'
      }
    }
    $http(req).success(function(data){
      // Filter out albums (and animated)
      addTopPicturesNoAlbums(data.data);
    });
  }

  this.saveSelfie = function(selfie, picID){
    $.ajax({
      method: "POST",
      url: "php/saveSelfie.php",
      data: {"selfie": selfie, "imgurID":picID},
      dataType: "JSON",
      success: function(data){
        console.log("Selfie saved successfully!");
      }
    })
  }

  // Get a reaction pic for the given imgur picture.
  this.getSelfie = function(picID){
    loading = true;
    var req = {
      method: "GET",
      url: "php/getSelfie.php",
      params: {"imgurID": picID}
    }

    $http(req).success(function(data){
      if(data.selfie != null){
        randomSelfie = data.selfie;
        loading = false;
      } else {
        // No previous selfie for the given picture.
        randomSelfie = null;
        loading = false;
      }
    })
  }

  this.getCurrentSelfie = function(){
    return currentSelfie;
  }

  this.setCurrentSelfie = function(selfie){
    currentSelfie = selfie;
  }

  this.getRandomSelfie = function(){
    return randomSelfie;
  }

  this.setCurrentPage = function(page){
    currentPage = page;
  }

  this.getCurrentPage = function(){
    return currentPage;
  }

  this.setCurrentPictureIndex = function(index){
    currentPictureIndex = index;
  }

  this.getCurrentPictureIndex = function(){
    return currentPictureIndex;
  }


  var addTopPicturesNoAlbums = function(pictures){
    // Filter out albums and animated pictures
    for(picture in pictures){
      if(!pictures[picture].is_album){
        if(!pictures[picture].animated){
          noAlbumPictures.push(pictures[picture]);
        }
      }
    }
  }

  this.getTopPictures = function(){
    return noAlbumPictures;
  }

  this.numFilteredPictures = function(){
    return noAlbumPictures.length;
  }

  this.getPicture = function(index){
    return noAlbumPictures[index];
  }

  return this;
});