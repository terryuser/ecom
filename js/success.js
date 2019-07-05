$(document).ready(function() {
    var login_status = $.cookie('status');
    var check_stage = $.cookie('register');
    console.log(login_status);

    var title = "";
    var paragraph = "";

    if (login_status == "member" && check_stage == "yes") {
        title = "Registration Success";
        paragraph = "Thank you for registration. You can add your stock into watchlist now! Enjoy!";
        $.cookie('register', null);

        window.setTimeout(function(){
            window.location.replace("/");
        }, 5000);
    } else {
        title = "Access Failed";
        paragraph = "We will change to main page. Please wait.";

        window.setTimeout(function(){
            window.location.replace("/");
        }, 5000);
    }

    $(".title").html(title);
    $(".paragraph").html(paragraph);
});