$(document).ready(function () {
    //includeHTML();
    checkLogin();
    indexBtn();
});

function indexBtn() {
    $("#open-login-panel").click(function () {
        console.log("panel open");
        $("#login-panel").toggle(200);
    });

    $("#login-action").click(function () {
        var login = $("#login-name").val();
        var pass = $("#login-password").val();
    
        var loginData = login + "&" + pass;
    
        $.ajax({
            type: 'POST',
            url: './api/sign-in',
            dataType:"text",
            data:loginData,
            success: function(data) {
                if (data == 'success') {
                    localStorage.setItem("login_status", "logined");
                    location.reload();
                }  
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    });
}


function checkLogin() {
    var check_login = localStorage.getItem("login_status");
    //var check_login = document.cookie;

    if (check_login == "logined") {
        $(".login-btn").hide();
        $("#logout").show();
    } else {
        $(".login-btn").show();
        $("#logout").hide();
    }
}


function setCookie(cname, cvalue, exdays) {
    
}