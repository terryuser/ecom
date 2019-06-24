$(document).ready(function () {

    $("#login-in-press").click(function(){
        var login = $("#name").val();
        var pass = $("#password").val();

        var loginData = login + "&" + pass;
        console.log(loginData);
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:9000/login',
            dataType:"text",
            data:loginData,
            success: function(data) {
                if (data == 'success') {
                    localStorage.setItem("login_status", "logined");
                    location.reload();
                }  
                console.log(data);
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });

        /*
        var correctPw = "admin";

        if ($("#name").val() == correctPw) {
            alert("success");
        } else {
            alert("fail");
        }
        */

    });

    $("#logout").click(function(){
        localStorage.setItem("login_status", "failed");
        location.reload();
    });


    $("#reg-in-press").click(function(){
        var login = $("#name").val();
        var pass = $("#password").val();

        var loginData = login + "&" + pass;
        console.log(loginData);
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:9000/register',
            dataType:"text",
            data:loginData,
            success: function(data) {
                console.log(data);
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    });

});
