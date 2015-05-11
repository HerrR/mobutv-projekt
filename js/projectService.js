suckMyProject.factory('Projekt',function ($http) {
  var topPictures = [];

  this.apiGetTopPictures = function(){
    var req = {
      method: "GET",
      url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
      headers: {
        "Authorization":"Client-ID 01bb30dcd7262a6",
        "Accept": 'application/json'
      }
    }
    $http(req).success(function(data){
      console.log(data.data);
      topPictures = data.data;
    });
  }

  this.getTopPictures = function(){
    return topPictures;
  }

  return this;
});