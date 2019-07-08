$(document).ready(function () {
    checkLogin();
});

function checkLogin() {
    var check_login = $.cookie('status');

    if (check_login == "member") {
        $('#member_block').load('/html/memberNav.html');
    } else {
        $('#member_block').load('/html/guestNav.html');
    }
}