<?php
	include_once("config.php");
	include_once("functions.php");

	$picID = $_GET["imgurID"];

	$getMaxRefIDQuery = "SELECT max(refID) maxRefID FROM mobutv_picRef WHERE imgurPicID = '".$picID."';";
	$maxRefID = queryDb($conn, $getMaxRefIDQuery)->fetch_object()->maxRefID;

	if(is_null($maxRefID)){
		// No previous pictures
		$refID = null;
		$return["previousPicturesExists"] = false;
	} else if ($maxRefID == 0){
		// One previous picture
		$refID = $maxRefID;
		$return["previousPicturesExists"] = true;
	} else {
		// A number of previous pictures exists -> Randomize an ID from the existing pictures.
		$refID = rand(0,$maxRefID); 
		$return["previousPicturesExists"] = true;
	}

	if(!is_null($refID)){
		$getSelfieQuery = "SELECT selfiePic FROM mobutv_picRef WHERE imgurPicID = '".$picID."' AND refID = ".$refID.";";
		$selfie = queryDb($conn, $getSelfieQuery)->fetch_object()->selfiePic;
	} else {
		$selfie = null;
	}

	$return["selfie"] = $selfie;
	$return["maxRefID"] = $maxRefID;
	$return["picID"] = $picID;
	$return["refID"] = $refID;
	echo json_encode($return);

?>