// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// DEVA 2018-12-06

$("#id").load('load', function () {
        
        $("#id").val($(".rows >tr").length + 1);
});

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
    if ($("#id").val().length > 0 && $("#firstName").val().length > 0 && $("#lastName").val().length > 0 && $("#age").val().length > 0)
    {
        $.ajax({
            type: "POST",
            url: "Home/AddEntry",
            data: {
                id : $("#id").val(),
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                age: $("#age").val(),
                classType: givenClassType
            },
            cache: false,
            success: function() {
                $(".rows").append("<tr class='" + givenClassType + "'> \
                                       <td>" + $('#id').val() + "</td> \
                                       <td>" + $('#firstName').val() + "</td> \
                                       <td>" + $('#lastName').val() + "</td> \
                                       <td>" + $('#age').val() + "</td> \
                                   </tr>");
            }
        });
    }
    else {
        var href = $('.hiddenBtn').attr('href');
        window.location.href = href; //causes the browser to refresh and load the requested url
    }
}

