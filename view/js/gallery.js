const chunk_size = 100;
var global_images = [];

function get_page(){
    return Number(document.page.number.value);
}

function set_page(n){
    document.page.number.value = String(n);
}

function change_page(){
    list_images();
}

function page_before(){
    var page = get_page();
    if(page <= 1){
        return;
    }
    set_page(page - 1);
    list_images();
}

function page_after(){
    var page = get_page();
    if(page == get_max_page()){
        return;
    }
    set_page(page + 1);
    list_images();
}

function get_max_page(){
    var length = global_images.length;
    if(length == 0){
        return 1;
    }
    return Math.floor((length + chunk_size - 1) / chunk_size);
}

function set_max_page(n){
    var mpn = document.getElementById("max_page_number");
    mpn.innerHTML = String(n);
}

function load_images(text){
    global_images = JSON.parse(text);
    set_page(1);
    set_max_page(get_max_page());
}

function list_images(){
    const images_per_row = 5;

    var index_image = (get_page() - 1) * chunk_size;
    var records = global_images.slice(index_image, index_image + chunk_size);

    var content = document.getElementById("content");
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }

    var i;
    var n = records.length;
    var table = document.createElement("table");
    var tr, td;

    for(i = 0; i < n; i++){
        if(i % images_per_row == 0){
            tr = document.createElement("tr");
        }

        td = document.createElement("td");
        td.appendChild(text_block(String(records[i].id)));
        td.appendChild(image_block(records[i]));
        td.appendChild(text_block("score: " + text_score(records[i].score)));
        tr.appendChild(td);

        if((i + 1) % images_per_row == 0){
            table.appendChild(tr);
            tr = null;
        }
    }

    if(tr != null){
        table.appendChild(tr);
    }

    content.appendChild(table);
}

function search(){
    var url = "operation.php?command=list";

    var order = document.condition.order.value;
    var score = document.condition.score.value;
    var score_range = document.condition.score_range.value;

    if(order == "ascending" || order == "descending"){
        url += "&order=" + order;
    }

    if(score != "none"){
        url += "&score=" + score;
        if(score_range == "less" || score_range == "greater"){
            url += "&score_range=" + score_range;
        }else{
            url += "&score_range=equal";
        }
    }

    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.onreadystatechange = function(){
        if(req.readyState == 4){
            if(req.status == 200){
                load_images(req.responseText);
                list_images();
            }
        }
    };
    req.send(null);
}

function text_block(text){
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div;
}

function image_block(record){
    var a = document.createElement("a");
    var img = document.createElement("img");
    a.href = "detail.php?id=" + record.id;
    a.style.display = "block";
    img.src = "preview.php?id=" + record.id;
    img.style.width = "180px";
    img.style.height = "180px";
    a.appendChild(img);
    return a;
}

function text_score(score){
    if(score == null){
        return "*";
    }else{
        return String(score);
    }
}

window.onload = search;
