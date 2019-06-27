$(document).ready(function() {
    register();
});


function register() {
    $("#register-submit").click(function() {
        var Input_name = $("#reg-name").val();
        var Input_pw = $("#reg-password").val();
        var Input_email = $("#reg-email").val();

        checkInputNull("#reg-name", "Please provide your name.");
        checkInputNull("#reg-password-confirm", "Please confirm your password.");
        checkInputNull("#reg-password", "Please set up your password.");
        checkInputNull("#reg-email", "Please provide your email.");

        if ($("#reg-password-confirm").val() != Input_pw) {
            $("#reg-password-confirm").parent().append("<div class='alertMsg'><p></p></div>");
            console.log("confirm pw error");
        } else {
            if (!$("#agreement").prop("checked")) {
                $("#agreement").parent().append("<div class='alertMsg'><p>Please agree of the policy.</p></div>");
                console.log("confirm agreement error");
            } else {
                console.log("All confirm");
                var loginData = { "name": Input_name, "password": Input_pw, "email": Input_email };
                console.log(loginData);
                //name + "&" + password + "&" + email;
                console.log("Sending to mongodb");
                $.ajax({
                    type: 'POST',
                    url: '/api/signupsubmit',
                    dataType: "text",
                    data: JSON.stringify(loginData),
                    success: function(data) {
                        console.log("Sending register data: " + data);
                    },
                    error: function(xhr, status, error) {
                        console.log('Error: ' + error.message);
                    }
                });
            }
        }
    });
}

function checkInputNull(target, msg) {
    if ($(target).val() == null || $(target).val() == "") {
        $(target).parent(".input-wrapper").append("<div class='alertMsg'><p>" + msg + "</p></div>");
        return false;
    }
}