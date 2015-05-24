<?php
	// saveSelfie.php
	include_once("config.php");
	include_once("functions.php");

	$selfie = $_POST['selfie'];
	$imgurID = $_POST['imgurID'];

	// Get number of previous selfies with the given imgurID
	$checkPreviousQuery = "SELECT count(*) num FROM mobutv_picRef WHERE imgurPicID = '".$imgurID."';";
	$numPrevious = queryDb($conn, $checkPreviousQuery);
	$num = $numPrevious->fetch_object()->num;

	if($num < 1){
		$picRefID = 0;
	} else {
		// Generate new ID and assign it to the picture reference.
		$picRefIDQuery = "SELECT max(refID) currentMax FROM mobutv_picRef WHERE imgurPicID = '".$imgurID."';";
		$currentMaxID = queryDb($conn, $picRefIDQuery)->fetch_object()->currentMax;
		$picRefID = $currentMaxID+1;
	}

	// Prepare the insertion query
	$insertQuery = "INSERT INTO mobutv_picRef VALUES('".$imgurID."','".$selfie."',".$picRefID.")";

	// Run the insertion query.
	queryDb($conn, $insertQuery);
?>