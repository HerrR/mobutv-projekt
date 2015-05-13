suckMyProject.factory('Projekt',function ($http) {
  var noAlbumPictures = [];
  var currentPage = 0;
  var currentPictureIndex = 0;
  var randomSelfie;

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
    var req = {
      method: "GET",
      url: "php/getSelfie.php",
      params: {"imgurID": picID}
    }

    $http(req).success(function(data){
      if(data.selfie != null){
        randomSelfie = data.selfie;
      } else {
        randomSelfie = null;
        console.log("No previous selfie from this image");
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
        noAlbumPictures.push(pictures[picture]);
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