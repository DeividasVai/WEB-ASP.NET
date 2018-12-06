// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// DEVA 2018-12-06

$(".indexButtons").on("click", function () {
    addEntry($(this).attr("data-dataType"));
});

function addEntry(givenClassType) {
    $.ajax({
        type: "POST",
        url: "Home/AddEntry",
        data: { firstName: $('#firstName').val(), lastName: $('#lastName').val(), age: $('#age').val(), classType: givenClassType },
        cache: false,
        success: function () {
            $(".rows").append("<tr class='"+givenClassType+"'> \
                                    <td>"+ $('#firstName').val() + "</td> \
                                    <td>"+ $('#lastName').val() + "</td> \
                                    <td>"+ $('#age').val() + "</td> \
                                </tr>");
        }
    });
}