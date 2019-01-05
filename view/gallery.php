<?php
require_once("function.php");

$pdo = connect_db();

$query = "select id, txt from images";
$statement = $pdo->prepare($query);
$statement->execute();

$rows = array_chunk($statement->fetchAll(PDO::FETCH_ASSOC), 5);

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Gallery</title>
</head>
<body>
  <table>
    <tbody>
<?php
foreach($rows as $row){
    echo spaces(6) . "<tr>\n";
    foreach($row as $record){

        $id = $record["id"];
        echo spaces(8) . "<td>\n";
        echo spaces(10) . "<div>$id</div>\n";
        echo spaces(10) . "<div><img src='preview.php?id=$id' width='180px' height='180px' /></div>\n";
        echo spaces(8) . "</td>\n";
    }
    echo spaces(6) . "</tr>\n";
}
?>
    </tbody>
  </table>
</body>
</html>