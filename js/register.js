$(document).ready(function() {
    register();
});


function register() {
    $("#register-submit").click(function() {
        var name = $("#reg-name").val();
        var password = $("#reg-password").val();
        var email = $("#reg-email").val();

        console.log("input name value: " + name);
        console.log("input password value: " + password);
        console.log("input email value: " + email);

        checkInputNull("#reg-name", "Please provide your name.");
        checkInputNull("#reg-password-confirm", "Please confirm your password.");
        checkInputNull("#reg-password", "Please set up your password.");
        checkInputNull("#reg-email", "Please provide your email.");

        if ($("#reg-password-confirm").val() != password) {
            $("#reg-password-confirm").parent().append("<div class='alertMsg'><p></p></div>");
            console.log("confirm pw error");
        } else {
            if (!$("#agreement").prop("checked")) {
                $("#agreement").parent().append("<div class='alertMsg'><p>Please agree of the policy.</p></div>");
                console.log("confirm agreement error");
            } else {
                console.log("All confirm");
                var loginData = name + "&" + password + "&" + email;
                console.log("Sending to mongodb");
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1:9000/api/signup',
                    dataType: "text",
                    data: loginData,
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