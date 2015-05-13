// CLIENT ID
// 01bb30dcd7262a6

// CLIENT SECRET
// af58558e6c211fda15f7a44a505c171f380c819e

var callApi = function(){
	$.ajax({
		url: "https://api.imgur.com/3/gallery/hot/viral/0.json",
		type: "GET",
		headers: {
			"Authorization":"Client-ID 01bb30dcd7262a6"
		},
		success: function(data){
			console.log(data);
		}
	})
}