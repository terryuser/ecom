$(document).ready(function () {
    Logout();
});

function indexBtn() {
    $("#logout-action").click(function () {
        $.cookie('status', null);
        $.cookie('user', null);
        location.reload();
    });
}