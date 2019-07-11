$(document).ready(function() {
    checkLogin();
    scrollTop();
});


function checkLogin() {
    var check_login = $.cookie('status');

    if (check_login == "member") {
        $('#member_block').load('/html/memberNav.html');
    } else {
        $('#member_block').load('/html/guestNav.html');
    }
}

function scrollTop() {
    var btn = $('#scrollTop');
    btn.hide();

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            btn.show('slow');
        } else {
            btn.hide('fast');
        }
    });

    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });
}