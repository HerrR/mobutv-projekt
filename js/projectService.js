suckMyProject.factory('Projekt',function ($http) {
  var aVariable = "I am a variable from the model!";
  var topPictures = [];

  this.returnVariable = function(){
    return aVariable;
  }

  this.apiGetTopPictures = function(){
    var req = {
      method: "GET",
      url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
      headers: {
        "Authorization":"Client-ID 01bb30dcd7262a6"
      }
    }
    $http(req).success(function(data){
      console.log(data);
      topPictures = data.data;
    });
  }

  this.getTopPictures = function(){
    return topPictures;
  }

  return this;
});