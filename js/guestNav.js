$(document).ready(function () {
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
    
        var loginData = { name: login, password: pass };
    
        $.ajax({
            type: 'POST',
            url: '/api/login',
            dataType: "JSON",
            data: loginData,
            success: function(data) {
                if (data.message == 'LoginSuccess') {
                    console.log("Login Success. Member: " + login);
                    var days = 7;
                    
                    $.cookie('status', "member", { expires: days, path: '/' });
                    $.cookie('user', data.name, { expires: days, path: '/' });
                    location.reload();
                } else {
                    console.log("Login Failed");
                    $('#login-password').next('.alertMsg').html("Login Failed").show();
                }
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    });
}