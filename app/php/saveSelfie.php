<?php
	// saveSelfie.php
	include_once("config.php");
	include_once("functions.php");

	$selfie = $_POST['selfie'];
	$imgurID = $_POST['imgurID'];

	$checkPreviousQuery = "SELECT count(*) num FROM mobutv_picRef WHERE imgurPicID = '".$imgurID."';";
	$numPrevious = queryDb($conn, $checkPreviousQuery);

	$num = $numPrevious->fetch_object()->num;

	if($num < 1){
		$picRefID = 0;
	} else {
		$picRefIDQuery = "SELECT max(refID) currentMax FROM mobutv_picRef WHERE imgurPicID = '".$imgurID."';";
		$currentMaxID = queryDb($conn, $picRefIDQuery)->fetch_object()->currentMax;
		$picRefID = $currentMaxID+1;
	}

	$insertQuery = "INSERT INTO mobutv_picRef VALUES('".$imgurID."','".$selfie."',".$picRefID.")";
	queryDb($conn, $insertQuery);

	// $insertTestQuery = "INSERT INTO mobutv_test VALUES('"

	$return["selfie"] = $selfie;
	$return["imgurID"] = $imgurID;
	// $return["checkPreviousQuery"] = $checkPreviousQuery;
	// $return["num"] = $num;

	echo json_encode($return);
?>