(function(){
    function load(){
        var req = new XMLHttpRequest();
        req.open("GET", "operation.php?command=list");
        req.onreadystatechange = function(){
            if(req.readyState == 4){
                if(req.status == 200){
                    list_images(req.responseText);
                }
            }
        };
        req.send(null);
    }

    function list_images(text){
        const images_per_row = 5;
        var records = JSON.parse(text);

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
        load();
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

    window.onload = load;
})();
