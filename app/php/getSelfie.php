<?php
	include_once("config.php");
	include_once("functions.php");

	$picID = $_GET["imgurID"];

	$getMaxRefIDQuery = "SELECT max(refID) maxRefID FROM mobutv_picRef WHERE imgurPicID = '".$picID."';";
	$maxRefID = queryDb($conn, $getMaxRefIDQuery)->fetch_object()->maxRefID;

	if(is_null($maxRefID)){
		$refID = null;
		$return["previousPicturesExists"] = false;
		// No previous pictures
	} else if ($maxRefID == 0){
		$refID = $maxRefID;
		$return["previousPicturesExists"] = true;
		// One previous thing
	} else {
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