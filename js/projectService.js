suckMyProject.factory('Projekt',function () {
  var aVariable = "I am a variable from the model!";

  this.returnVariable = function(){
    return aVariable;
  }
  
  return this;
});