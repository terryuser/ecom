$(document).ready(function() {
    var login_status = $.cookie('login_status');
    console.log(login_status);

    if (login_status == "member") {
        var title = "Registration Success";
    } else {
        var title = "Request login";
    }

    $(".title").html(title);
    $(".paragraph").html();
});