function evaluate_score(object){
    var id = document.operation.image_id.value;
    var menu = document.operation.score;
    var index = menu.selectedIndex;
    var value = menu.options[index].value;
    var req = new XMLHttpRequest();
    req.open("GET", "operation.php?id=" + id + "&value=" + value, true);
    req.send(null);
}
