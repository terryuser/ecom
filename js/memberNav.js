$(document).ready(function() {
    Logout();
});

function Logout() {
    $("#logout-action").click(function() {
        $.cookie('status', null);
        $.cookie('user', null);
        location.reload();
    });
}