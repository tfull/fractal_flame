<?php
require_once("function.php");

function command_list(){
    $pdo = connect_db();

    $query = "select id, txt, score from images order by id desc limit 200";
    $statement = $pdo->prepare($query);
    $statement->execute();

    echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
}

function command_score(){
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
}

if(strcmp($_GET["command"], "list") == 0){
    command_list();
}else if(strcmp($_GET["command"], "score") == 0){
    command_score();
}else{
    http_response_code(412);
}
?>
