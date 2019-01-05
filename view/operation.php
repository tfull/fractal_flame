<?php
require_once("function.php");

$pdo = connect_db();

$id = (int)$_GET["id"];
$value = $_GET["value"];

if(strcmp($value, "N") == 0){
    $value = null;
}else{
    $value = (int)$value;
}

$query = "update images set score = :score where id = :id";
$statement = $pdo->prepare($query);
$statement->execute(array(":id" => $id, ":score" => $value));
?>
