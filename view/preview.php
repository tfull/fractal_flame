<?php
require_once("function.php");

$id = $_GET["id"];
$pdo = connect_db();

$query = "select * from images where id = :id";
$statement = $pdo->prepare($query);
$statement->execute(array("id" => $id));

$q = $statement->fetch();

header("Content-Type: image/png");
echo $q["png"]
?>
