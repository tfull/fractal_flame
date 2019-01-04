<?php
require_once("function.php");

function get_input_log($name){
    $base = basename($name, ".png");
    return file_get_contents("../soft/log/" . $base . ".log");
}

exec("ls ../soft/image/*.png", $output);

$rows = array_chunk($output, 5);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <title>Viewer</title>
</head>
<body>
  <table>
    <tbody>
<?php
foreach($rows as $row){
    echo spaces(6) . "<tr>\n";
    foreach($row as $item){
        echo spaces(8) . "<td>\n";
        echo spaces(10) . "<div><img src='$item' width='180px' height='180px' /></div>\n";
        echo spaces(10) . "<div><textarea rows='3' cols='20'>" . get_input_log($item) . "</textarea></div>\n";
        echo spaces(10) . "\n";
        echo spaces(8) . "</td>\n";
    }
    echo spaces(6) . "</tr>\n";
}
?>
    </tbody>
  </table>
</body>
</html>
