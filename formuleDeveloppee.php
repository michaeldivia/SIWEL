<?php
include_once("DatabaseQuery.php");


global $request;
$request = new DatabaseQuery();

$formuleSemi=$_GET["formuleInscrite"];

var_dump($formuleSemi);


$elements = $request->select("SELECT * FROM fonction_organique",NULL);
var_dump($elements);

?>