$(document).ready(function() {
    var login_status = $.cookie('status');
    var check_stage = localStorage.getItem("register");
    console.log(login_status);

    var title = "";
    var paragraph = "";
    var holdTime = 8000;

    if (login_status == "member" && check_stage == "yes") {
        title = "Registration Success";
        paragraph = "Thank you for registration. You can add your stock into watchlist now! Enjoy!";
        localStorage.removeItem("register");

        window.setTimeout(function() {
            window.location.replace("/");
        }, holdTime);
    } else {
        title = "Access Failed";
        paragraph = "We will change to main page soon. Please wait.";

        window.setTimeout(function() {
            window.location.replace("/");
        }, holdTime);
    }

    $(".title").html(title);
    $(".paragraph").html(paragraph);
    $('.secondCount').html(holdTime/1000);
});