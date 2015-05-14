suckMyProject.factory('Projekt',function ($http) {
  var noAlbumPictures = [];
  var currentPage = 0;
  var currentPictureIndex = 0;
  var randomSelfie;
  var cameraSupported = false;
  var loading = false;

  this.setCameraSupported = function(bool){
    cameraSupported = bool;
    console.log("Camera supported set to "+bool);
  }

  this.getCameraSupported = function(){
    return cameraSupported;
  }

  this.isLoading = function(){
    return loading;
  }

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
      console.log(data.data);
      addTopPicturesNoAlbums(data.data);
    });
  }

  this.saveSelfie = function(selfie, picID){
    console.log("saveSelfie called!");
    console.log(selfie);
    console.log(picID);
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
        randomSelfie = null;
        loading = false;
        console.log("No previous selfie for pic with id "+picID);
      }
    })
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

  this.getPicture = function(index){
    return noAlbumPictures[index];
  }

  return this;
});