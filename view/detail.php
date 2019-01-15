<?php
require_once("function.php");

$id = $_GET["id"];

$pdo = connect_db();

$query = "select * from images where id = :id";
$statement = $pdo->prepare($query);
$statement->execute(array("id" => $id));

$record = $statement->fetch();

$score = is_null($record["score"]) ? null : (int)$record["score"];

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Detail</title>
  <script src="js/detail.js"></script>
</head>
<body>
  <img style="display:block; margin:auto;" src="preview.php?id=<?php echo $id; ?>" width="360px" height="360px" /></div>
  <textarea style="display:block; margin:auto;" rows="10" cols="100"><?php echo $record["txt"]; ?></textarea></div>
  <form name="operation">
    <input type="hidden" name="image_id" value="<?php echo $id; ?>" />
    <select name="score" onChange="evaluate_score(this)">
      <option value="N"<?php if(is_null($score)){ echo " selected"; } ?>>未評価</option>
      <option value="-1"<?php if($score === -1){ echo " selected"; } ?>>-1. bad</option>
      <option value="0"<?php if($score === 0){ echo " selected"; } ?>> 0. normal</option>
      <option value="1"<?php if($score === 1){ echo " selected"; } ?>> 1. good</option>
      <option value="2"<?php if($score === 2){ echo " selected"; } ?>> 2. great</option>
      <option value="3"<?php if($score === 3){ echo " selected"; } ?>> 3. excellent</option>
    </select>
  </form>
</body>
</html>
