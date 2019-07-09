var user = $.cookie('user');
var status = $.cookie('status');
var sendData = {name: user};

$(document).ready(function() {

});

function getMemberInfo() {
    console.log(sendData);
    $.ajax({
        type: 'POST',
        url: '/api/member/getInfo',
        dataType: "json",
        data: sendData,
        success: function(respon) {
            console.log(respon.message);
            if (respon.message == "exist") {
                InWatchList = true;
                $('#WatchList').removeClass("add").addClass("remove").html("Remove");
            } else {
                InWatchList = false;
                $('#WatchList').addClass("add").removeClass("remove").html("Add");
            }
        }
    });
}