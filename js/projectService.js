suckMyProject.factory('Projekt',function ($http) {
  // var topPictures = [];
  var noAlbumPictures = [];
  var currentPage = 0;
  var currentPictureIndex = 0;

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
      // topPictures = data.data;
      addTopPicturesNoAlbums(data.data);
    });
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