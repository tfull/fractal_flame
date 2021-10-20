$(function() {

    const array_coefficient = ["a", "b", "c", "d", "e", "f"];
    const array_color = ["R", "G", "B"];

    var parameter_list;
    var parameter_index;

    $(document).ready(function() {
        $.get({
            url: "/api/parameter/list"
        }).done(function(json) {
            parameter_list = JSON.parse(json);
            listUpParameters();
            $.get({
                url: "/api/parameter/index"
            }).done(function(json) {
                parameter_index = JSON.parse(json);
                loadVariations();
            }).fail();
        }).fail();

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

    function listUpNonZeroVariations() {
    }

    $(document).on("change", ".parameter", function() {
        var name = $(this).data("name");
        var value = Number($(this).val());

        $(".parameter").filter(function(e) {
            return $(this).data("name") == name;
        }).val(value);

        setParameter(name, value);
        $.each(getParameterIndices(name), function(index, value) {
            console.log(value);
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
        var div_function = $("#function");
        var div_item = $("<div>").addClass("function");
        var palette = $("<div>").addClass("palette");
        var div_coefficient = $("<div>");
        var div_color = $("<div>");
        var button_delete = $("<button>").text("delete");
        var input_weight = $("<input>").attr("type", "number").addClass("weight");

        var colors = [Math.random(), Math.random(), Math.random()];

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
    });

    $("#draw").on("click", function() {
        const size = 480;

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
        }).fail();
    });

});
