<?php
require_once("function.php");

function command_list(){
    $pdo = connect_db();

    $parameters = array();

    if(isset($_GET["order"])){
        $order = $_GET["order"];
    }else{
        $order = null;
    }
    if(isset($_GET["score"])){
        $score = $_GET["score"];
    }else{
        $score = null;
    }
    if(isset($_GET["score_range"])){
        $score_range = $_GET["score_range"];
    }else{
        $score_range = null;
    }

    error_log($score_range);

    $query_order = null;
    if(strcmp($order, "ascending") == 0){
        $query_order = "order by id asc";
    }else{
        $query_order = "order by id desc";
    }

    $query_where_array = array();
    if(! is_null($score)){
        if(strcmp($score, "N") == 0){
            $query_where_array[] = "score is null";
        }else{
            $cmp = "=";
            if(strcmp($score_range, "less") == 0){
                $cmp = "<=";
            }else if(strcmp($score_range, "greater") == 0){
                $cmp = ">=";
            }
            $query_where_array[] = "score $cmp :score";
            $parameters[":score"] = $score;
        }
    }

    $query_array = array("select id, score from images");
    if(! empty($query_array)){
        $query_array[] = "where " . implode(" and ", $query_where_array);
    }
    if(! is_null($query_order)){
        $query_array[] = $query_order;
    }
    $query_array[] = "limit 10000";

    $query = implode(" ", $query_array);
    $statement = $pdo->prepare($query);
    $statement->execute($parameters);

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
