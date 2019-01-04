<?php
function connect_db(){
    $config = json_decode(file_get_contents("./config.json"), true);
    try{
        return new PDO("mysql:host=localhost;dbname=fractal_flame;charset=utf8", $config["user"], $config["password"]);
    }catch(PDOException $e){
        var_dump($e->message());
        exit;
    }
}

function spaces($n){
    return str_repeat(" ", $n);
}
?>
