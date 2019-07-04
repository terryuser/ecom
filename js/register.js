$(document).ready(function() {
    $(".alertMsg").hide();
    register();
});


function register() {
    $("#register-submit").click(function() {
        var Input_name = $("#reg-name").val();
        var Input_pw = $("#reg-password").val();
        var Input_email = $("#reg-email").val();

        checkRegister();

        if ($("#reg-password-confirm").val() != Input_pw) {
            $("#reg-password-confirm").next('.alertMsg').html("Please confirm your password.").show();
            $("#register-submit").attr("disabled", true);
        } else {
            if (!$("#agreement").prop("checked")) {
                $("#agreement").next('.alertMsg').html("Please agree of the policy.").show();
                $("#agreement").change(function() {
                    if (this.checked) {
                        $("#agreement").next('.alertMsg').hide();
                        $('#register-submit').removeAttr("disabled");
                    }
                });
            } else {
                $("#agreement").next('.alertMsg').hide();
                console.log("All confirm");
                var loginData = { name: Input_name, password: Input_pw, email: Input_email };
                console.log(loginData);
                //name + "&" + password + "&" + email;
                console.log("Sending to mongodb");
                $.ajax({
                    type: 'POST',
                    url: '/api/register/submit',
                    dataType: "JSON",
                    data: loginData,
                    success: function(data) {
                        console.log("Respon data: " + data.message);

                        if (data.message == "nameExist") {
                            $('#reg-name').next('.alertMsg').html("This name has been used. Please change.").show();
                        }

                        if (data.message == "emailExist") {
                            $('#reg-email').next('.alertMsg').html("This email address has been used. Please change.").show();
                        }

                        if (data.message == "success") {

                            var days = 7;

                            $.cookie('status', "member", { expires: days, path: '/' });
                            $.cookie('user_id', Input_name, { expires: days, path: '/' });
                            $.cookie('user', Input_name, { expires: days, path: '/' });

                            window.location.replace("/register/success");
                        }
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
        $(target).next('.alertMsg').html(msg).show();
        $("#register-submit").attr("disabled", true);
    }

    $(target).on("change paste keyup", function() {
        $(target).next('.alertMsg').hide();
        $('#register-submit').removeAttr("disabled");
    });
}

function checkRegister() {
    checkInputNull("#reg-name", "Please provide your name.");
    checkInputNull("#reg-password-confirm", "Please confirm your password.");
    checkInputNull("#reg-password", "Please set up your password.");
    checkInputNull("#reg-email", "Please provide your email.");
}