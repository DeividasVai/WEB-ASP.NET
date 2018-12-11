// DEVA 2018-12-06

$(".actionBtn").on("click", function () {
    addEntry($(this).attr("data-dataType"));
});

$(".actionDropDown").on("click", function () {
    addEntry($(this).attr("data-dataType"));
});

//setInputFilter($("#id"), function (value) {
//    return /^\d*$/.test(value);
//});

function addEntry(givenClassType) {
    if ($("#firstName").val().length > 0 && $("#lastName").val().length > 0 && $("#age").val().length > 0) {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var age = $("#age").val();
        $.ajax({
            type: "POST",
            url: "Home/AddEntry",
            contentType: "application/json; charset=utf-8",
            data: {
                person: {firstName, lastName, age},
                classType: givenClassType
            },
            cache: false,
            success: function (response) {
                if (response != null) {
                    $(".rows").append("<tr class='" + givenClassType + "'> \
                                       <td>" + response.id + "</td> \
                                       <td>" + $('#firstName').val() + "</td> \
                                       <td>" + $('#lastName').val() + "</td> \
                                       <td>" + $('#age').val() + "</td> \
                                   </tr>");
                }
            }
        });
    }
    else {
        var href = $('.hiddenBtn').attr('href');
        window.location.href = href; //causes the browser to refresh and load the requested url
    }
}

// send msg

$("#send").on("click", function () {
    if ($("#message").val().length < 1) {
        document.getElementById("message").style.backgroundColor = "#e02c2c";
        document.getElementById("message").style.color = "#fff";
        return;
    }
    document.getElementById("message").style.backgroundColor = "transparent";
    document.getElementById("message").style.color = "#000";
    var href = $('.hiddenBtn').attr('href');
    window.location.href = href;
});