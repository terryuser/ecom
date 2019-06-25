$(document).ready(function () {
    register();
});


function register() {
    $("#register-submit").click(function(){
        var login = $("#reg-name").val();
        var pass = $("#reg-password").val();
        var email = $("#reg-email").val();

        var loginData = login + "&" + pass + "&" + email;
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:9000/api/sign-up',
            dataType:"text",
            data:loginData,
            success: function(data) {
                console.log("Sending register data: " + data);
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    });
}