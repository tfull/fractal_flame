<?php
function connect_db(){
    $host = getenv("DB_HOST");
    $user = getenv("DB_USER");
    $password = getenv("DB_PASSWORD");

    try{
        return new PDO("mysql:host=$host;dbname=fractal_flame;charset=utf8", $user, $password);
    }catch(PDOException $e){
        var_dump($e->message());
        exit;
    }
}

function spaces($n){
    return str_repeat(" ", $n);
}
?>
