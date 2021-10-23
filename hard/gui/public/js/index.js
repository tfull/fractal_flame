$(function() {

    const array_coefficient = ["a", "b", "c", "d", "e", "f"];
    const array_color = ["R", "G", "B"];

    const color_sample = {
        red: [
            {
                name: "桜色",
                code: "fdeeef",
                rgb: [253, 238, 239]
            },
            {
                name: "灰桜",
                code: "eddbd8",
                rgb: [237, 219, 216]
            },
            {
                name: "退紅色",
                code: "e8bab2",
                rgb: [232, 186, 178]
            },
            {
                name: "一斤染",
                code: "f5b2b2",
                rgb: [245, 178, 178]
            },
            {
                name: "紅梅色",
                code: "f3a7a5",
                rgb: [243, 167, 165]
            },
            {
                name: "薄紅",
                code: "f29c97",
                rgb: [242, 156, 151]
            },
            {
                name: "撫子色",
                code: "f4b4cc",
                rgb: [244, 180, 204]
            },
            {
                name: "鴇色",
                code: "f4b3c2",
                rgb: [244, 179, 194]
            },
            {
                name: "珊瑚色",
                code: "f4ada3",
                rgb: [244, 173, 163]
            },
            {
                name: "東雲色",
                code: "f4ac92",
                rgb: [244, 172, 146]
            },
            {
                name: "桃色",
                code: "f09199",
                rgb: [240, 145, 153]
            },
            {
                name: "赤",
                code: "e6002f",
                rgb: [230, 0, 47]
            },
            {
                name: "金赤",
                code: "e8380d",
                rgb: [232, 56, 13]
            },
            {
                name: "紅色",
                code: "d7003a",
                rgb: [215, 0, 58]
            },
            {
                name: "今様色",
                code: "cb5366",
                rgb: [203, 83, 102]
            },
            {
                name: "韓紅色",
                code: "e95464",
                rgb: [233, 84, 100]
            },
            {
                name: "朱色",
                code: "e94709",
                rgb: [233, 71, 9]
            },
            {
                name: "潤朱",
                code: "d95e4d",
                rgb: [217, 94, 77]
            },
            {
                name: "洗朱",
                code: "e37e58",
                rgb: [227, 126, 88]
            },
            {
                name: "丹色",
                code: "ed6d46",
                rgb: [237, 109, 70]
            },
            {
                name: "真赭",
                code: "ec6d74",
                rgb: [236, 109, 116]
            },
            {
                name: "鉛丹色",
                code: "e66a4f",
                rgb: [230, 106, 79]
            },
            {
                name: "黄丹",
                code: "ee7948",
                rgb: [238, 121, 72]
            },
            {
                name: "緋色",
                code: "db4f2e",
                rgb: [219, 79, 46]
            },
            {
                name: "浅緋",
                code: "e1806a",
                rgb: [225, 128, 106]
            },
            {
                name: "紅緋",
                code: "e83828",
                rgb: [232, 56, 40]
            },
            {
                name: "猩々緋",
                code: "e60012",
                rgb: [230, 0, 18]
            },
            {
                name: "薔薇色",
                code: "e94e66",
                rgb: [233, 78, 102]
            },
            {
                name: "牡丹色",
                code: "e55a9b",
                rgb: [229, 90, 155]
            },
            {
                name: "躑躅色",
                code: "e95295",
                rgb: [233, 82, 149]
            },
            {
                name: "真紅",
                code: "b60033",
                rgb: [182, 0, 51]
            },
            {
                name: "臙脂",
                code: "b94047",
                rgb: [185, 64, 71]
            },
            {
                name: "茜色",
                code: "b7282d",
                rgb: [183, 40, 45]
            },
            {
                name: "苺色",
                code: "bb5561",
                rgb: [187, 85, 97]
            },
            {
                name: "蘇芳",
                code: "9e3d3e",
                rgb: [158, 61, 62]
            },
            {
                name: "深緋",
                code: "994233",
                rgb: [153, 66, 51]
            },
            {
                name: "暗紅色",
                code: "965161",
                rgb: [150, 81, 97]
            },
            {
                name: "梅鼠",
                code: "c39eab",
                rgb: [195, 158, 171]
            }
        ],
        yellow: [
            {
                name: "鶯茶",
                code: "715c1e",
                rgb: [113, 92, 30]
            },
            {
                name: "鶸茶",
                code: "9f975d",
                rgb: [159, 151, 93]
            },
            {
                name: "黄色",
                code: "ffd900",
                rgb: [255, 217, 0]
            },
            {
                name: "中黄",
                code: "ffea00",
                rgb: [255, 234, 0]
            },
            {
                name: "黄赤",
                code: "ec6800",
                rgb: [236, 104, 0]
            },
            {
                name: "苅安色",
                code: "f5e56b",
                rgb: [245, 229, 107]
            },
            {
                name: "黄蘗色",
                code: "fef263",
                rgb: [254, 242, 99]
            },
            {
                name: "梔子色",
                code: "fedc5e",
                rgb: [254, 220, 94]
            },
            {
                name: "鬱金色",
                code: "fabf13",
                rgb: [250, 191, 19]
            },
            {
                name: "肌色",
                code: "fce2c4",
                rgb: [252, 226, 196]
            },
            {
                name: "雄黄",
                code: "fde0a5",
                rgb: [253, 224, 165]
            },
            {
                name: "雌黄",
                code: "fdd23e",
                rgb: [253, 210, 62]
            },
            {
                name: "蜜柑色",
                code: "f18d00",
                rgb: [241, 141, 0]
            },
            {
                name: "柑子色",
                code: "f6ad48",
                rgb: [246, 173, 72]
            },
            {
                name: "橙色",
                code: "f08300",
                rgb: [240, 131, 0]
            },
            {
                name: "赤橙",
                code: "ea5504",
                rgb: [234, 85, 4]
            },
            {
                name: "柿色",
                code: "ed6d3d",
                rgb: [237, 109, 61]
            },
            {
                name: "洗柿",
                code: "f8c6b5",
                rgb: [248, 198, 181]
            },
            {
                name: "杏色",
                code: "f7b977",
                rgb: [247, 185, 119]
            },
            {
                name: "人参色",
                code: "ee7836",
                rgb: [238, 120, 54]
            },
            {
                name: "菜の花色",
                code: "ffef3f",
                rgb: [255, 239, 63]
            },
            {
                name: "山吹色",
                code: "f8b500",
                rgb: [248, 181, 0]
            },
            {
                name: "萱草色",
                code: "f49d43",
                rgb: [244, 157, 67]
            },
            {
                name: "蒲公英色",
                code: "ffd900",
                rgb: [255, 217, 0]
            },
            {
                name: "向日葵色",
                code: "fcc800",
                rgb: [252, 200, 0]
            },
            {
                name: "油色",
                code: "b4a468",
                rgb: [180, 164, 104]
            },
            {
                name: "卵色",
                code: "fcd475",
                rgb: [252, 212, 117]
            },
            {
                name: "芥子色",
                code: "d2b74e",
                rgb: [210, 183, 78]
            }
        ],
        blue: [
            {
                name: "青",
                code: "0095d9",
                rgb: [0, 149, 217]
            },
            {
                name: "空色",
                code: "a0d8ef",
                rgb: [160, 216, 239]
            },
            {
                name: "水色",
                code: "bce2e8",
                rgb: [188, 226, 232]
            },
            {
                name: "瑠璃色",
                code: "1d50a2",
                rgb: [29, 80, 162]
            },
            {
                name: "瑠璃紺",
                code: "18448e",
                rgb: [24, 68, 142]
            },
            {
                name: "群青色",
                code: "4e67b0",
                rgb: [78, 103, 176]
            },
            {
                name: "白群",
                code: "83ccd2",
                rgb: [131, 204, 210]
            },
            {
                name: "紺青",
                code: "133463",
                rgb: [19, 52, 99]
            },
            {
                name: "藍色",
                code: "0f5579",
                rgb: [15, 87, 121]
            },
            {
                name: "濃藍",
                code: "082752",
                rgb: [8, 39, 82]
            },
            {
                name: "瓶覗き",
                code: "a2d7dd",
                rgb: [162, 215, 221]
            },
            {
                name: "勝色",
                code: "55576c",
                rgb: [85, 87, 108]
            },
            {
                name: "縹色",
                code: "2980af",
                rgb: [41, 128, 175]
            },
            {
                name: "紺色",
                code: "213a70",
                rgb: [33, 58, 112]
            },
            {
                name: "濃紺",
                code: "00053a",
                rgb: [0, 5, 58]
            },
            {
                name: "鉄紺",
                code: "0b1644",
                rgb: [11, 22, 68]
            },
            {
                name: "紺藍",
                code: "474488",
                rgb: [71, 68, 136]
            },
            {
                name: "納戸色",
                code: "007d92",
                rgb: [0, 125, 146]
            },
            {
                name: "鉄納戸",
                code: "2d5667",
                rgb: [45, 86, 103]
            },
            {
                name: "納戸茶",
                code: "317270",
                rgb: [49, 114, 112]
            },
            {
                name: "錆納戸",
                code: "388493",
                rgb: [56, 132, 147]
            },
            {
                name: "藤納戸",
                code: "706caa",
                rgb: [112, 108, 170]
            },
            {
                name: "鉄色",
                code: "005242",
                rgb: [0, 82, 66]
            },
            {
                name: "浅葱色",
                code: "00a1ae",
                rgb: [0, 161, 174]
            },
            {
                name: "水浅葱",
                code: "7faba9",
                rgb: [127, 171, 169]
            },
            {
                name: "錆浅葱",
                code: "5c9291",
                rgb: [92, 146, 145]
            },
            {
                name: "新橋色",
                code: "64bcc7",
                rgb: [100, 188, 199]
            },
            {
                name: "露草色",
                code: "239dda",
                rgb: [35, 157, 218]
            },
            {
                name: "勿忘草色",
                code: "89c3eb",
                rgb: [137, 195, 235]
            },
            {
                name: "秘色",
                code: "c7ddd8",
                rgb: [199, 221, 216]
            }
        ]
    };

    var parameter_list;
    var parameter_index;

    $(document).ready(function() {
        $.get({
            url: "/api/parameter/list"
        }).done(function(json) {
            parameter_list = JSON.parse(json);
            listUpParameters();
            $.get({
                url: "/api/parameter/index",
                dataType: "json"
            }).done(function(json) {
                parameter_index = json;
                loadVariations();
            }).fail();
        }).fail();

        var colors = Object.keys(color_sample);
        var div_sapmle = $("#color_sample");

        for (var i = 0; i < colors.length; i++) {
            div_sapmle.append(
                $("<button>").attr("type", "button").text(colors[i])
            );
        }
    });

    function getParameter(name) {
        for (var i = 0; i < parameter_list.length; i++) {
            if (parameter_list[i].name == name) {
                return parameter_list[i].value;
            }
        }
    }

    function setParameter(name, value) {
        for (var i = 0; i < parameter_list.length; i++) {
            if (parameter_list[i].name == name) {
                parameter_list[i].value = value;
            }
        }
    }

    function getRelatedParameters(index) {
        var array = [];

        for (var i = 0; i < parameter_index.length; i++) {
            if (parameter_index[i].indices.includes(index)) {
                var name = parameter_index[i].name;
                var value = getParameter(name);

                array.push({ name: name, value: value });
            }
        }

        return array;
    }

    function getParameterIndices(name) {
        for (var i = 0; i < parameter_index.length; i++) {
            if (parameter_index[i].name == name) {
                return parameter_index[i].indices;
            }
        }
    }

    function loadVariations() {
        var variation = $("#variation");

        for (var i = 0; i <= 48; i++) {
            var div = $("<div>").addClass("variation").data("index", i);
            var img = $("<img>").addClass("grid").data("index", i);
            var weight = $("<input>").attr("type", "number").addClass("weight").data("index", i).val(0);
            var label = $("<span>").text("weight");

            div.append(img).append(
                $("<span>").html("v<sub>" + String(i) + "</sub>")
            ).append($("<br>"));

            $.each(getRelatedParameters(i), function(index, param) {
                div.append(
                    $("<span>").text(param.name)
                ).append(
                    $("<input>").attr("type", "number").
                        addClass("parameter").
                        data("name", param.name).
                        val(param.value)
                );
            });

            div.append("<br>").append(label).append(weight);
            variation.append(div);
            loadImage(i);
        }
    }

    function loadImage(index) {
        $.post({
            url: "/api/grid/" + String(index),
            data: JSON.stringify(parameter_list)
        }).done(function(base64) {
            $(".grid").filter(function(i) {
                return $(this).data("index") == index;
            }).attr("src", "data:image/png;base64," + base64);
        }).fail();
    }

    function listUpParameters() {
        var div = $("#parameter").empty();

        for (var i = 0; i < parameter_list.length; i++) {
            var span = $("<span>").text(parameter_list[i].name);
            var input = $("<input>").attr("type", "number").
                addClass("parameter").
                attr("step", "any").
                data("name", parameter_list[i].name).
                val(parameter_list[i].value);

            div.append(span).append(input);
        }
    }

    $(document).on("change", ".weight", function() {
        var weight = parseInt($(this).val());

        if (weight > 0) {
            $(this).parent().addClass("weighted");
        } else {
            $(this).parent().removeClass("weighted");
        }
    });

    $(document).on("change", ".parameter", function() {
        var name = $(this).data("name");
        var value = Number($(this).val());

        $(".parameter").filter(function(e) {
            return $(this).data("name") == name;
        }).val(value);

        setParameter(name, value);
        $.each(getParameterIndices(name), function(index, value) {
            loadImage(value);
        });
    });

    $(document).on("change", ".color", function() {
        var input_colors = $(this).parent().parent().find(".color");
        var colors = [null, null, null];

        input_colors.each(function(index) {
            if ($(this).data("variable") == "R") {
                colors[0] = String(Math.round(Number($(this).val()) * 100)) + "%";
            } else if ($(this).data("variable") == "G") {
                colors[1] = String(Math.round(Number($(this).val()) * 100)) + "%";
            } else if ($(this).data("variable") == "B") {
                colors[2] = String(Math.round(Number($(this).val()) * 100)) + "%";
            } else {
                alert("illegal color");
            }
        });

        $(this).parent().parent().find(".palette").css("background-color", "rgb(" + colors.join(",") + ")");
    });

    $("#add_new_function").on("click", function() {
        addNewFunction(null);
    });

    $(document).on("click", "#color_sample button", function() {
        var colors = color_sample[$(this).text()];
        var rgb = colors[Math.floor(Math.random() * colors.length)].rgb;

        addNewFunction([rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]);
    });

    function addNewFunction(colors) {
        var div_function = $("#function");
        var div_item = $("<div>").addClass("function");
        var palette = $("<div>").addClass("palette");
        var div_coefficient = $("<div>");
        var div_color = $("<div>");
        var button_delete = $("<button>").text("delete");
        var input_weight = $("<input>").attr("type", "number").addClass("weight");

        if (colors === null) {
            colors = [Math.random(), Math.random(), Math.random()];
        }

        for (var i = 0; i < array_coefficient.length; i++) {
            div_coefficient.append(
                $("<span>").text(array_coefficient[i])
            ).append(
                $("<input>").attr("type", "number").
                    addClass("coefficient").
                    attr("name", array_coefficient[i]).
                    attr("step", "any").
                    attr("min", -1).
                    attr("max", 1).
                    data("variable", array_coefficient[i]).
                    val(Math.random() * 2 - 1)
            );
        }

        for (var i = 0; i < array_color.length; i++) {
            div_color.append(
                $("<span>").text(array_color[i])
            ).append(
                $("<input>").attr("type", "number").
                    addClass("color").
                    attr("name", array_color[i]).
                    attr("step", "any").
                    attr("min", 0).
                    attr("max", 1).
                    data("variable", array_color[i]).
                    val(colors[i])
            );
        }

        var cm = colors.map(c => String(c * 100) + "%");

        palette.css("background-color", "rgb(" + cm.join(",") + ")");

        input_weight.val(Math.floor(Math.random() * 20) + 1);

        button_delete.on("click", function() {
            $(div_item).remove();
        });

        div_item.
            append(palette).
            append(div_coefficient).
            append(div_color).
            append($("<div>").append($("<span>").text("weight")).append(input_weight)).
            append($("<div>").append(button_delete));
        div_function.append(div_item);
    }

    $("#draw").on("click", function() {
        const size = 480;

        var button_draw = $(this);
        var functions = [];
        var variations = [];

        $(".function").each(function(index) {
            var div_function = $(this);

            data = {}

            $.each(array_coefficient, function(index, x) {
                var elem = div_function.find(".coefficient").filter(function(index) {
                    return $(this).data("variable") == x;
                });
                data[x] = Number(elem.val());
            });

            $.each(array_color, function(index, x) {
                var elem = div_function.find(".color").filter(function(index) {
                    return $(this).data("variable") == x;
                });
                data[x] = Number(elem.val());
            });

            data["weight"] = parseInt($(this).find(".weight").val());

            functions.push(data);
        });

        $(".variation").filter(function(index) {
            return parseInt($(this).find(".weight").val()) > 0;
        }).each(function(index) {
            variations.push({
                index: $(this).data("index"),
                weight: parseInt($(this).find(".weight").val())
            });
        });

        button_draw.attr("disabled", true);

        $.post({
            url: "/api/draw",
            data: JSON.stringify({
                repeat: parseInt($("#repeat").val()),
                width: size,
                height: size,
                density: 3,
                xaxis: [-1.0, 1.0],
                yaxis: [1.0, -1.0],
                background: [0.0, 0.0, 0.0],
                functions: functions,
                variations: variations,
                parameters: []
            })
        }).done(function(base64) {
            $("#canvas").attr("src", "data:image/png;base64," + base64);
        }).fail().always(function() {
            button_draw.attr("disabled", false);
        });
    });

});
