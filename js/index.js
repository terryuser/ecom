$(document).ready(function () {
  var check_login = localStorage.getItem("login_status");

  console.log(check_login);
   
  if (check_login == "logined") {
    $(".login-btn").hide();
    $("#logout").show();
  } else {
    $(".login-btn").show();
    $("#logout").hide();
  }
  
});
