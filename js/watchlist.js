var user = $.cookie('user');
var status = $.cookie('status');
var sendData = { name: user };
var memberInfo = {};


$(document).ready(function() {
    if ($.cookie('status') == "member") {
        getMemberInfo();
        console.log(memberInfo);
        $('#member-name').html(memberInfo.name);
        $('#member-email').val(memberInfo.email);
        $('#update').hide();
        displayWatchlist();
        
        $('#member-email').on("change paste keyup", function() {
            if ($('#member-email').val() != memberInfo.email) {
                $('#update').show();
            } else {
                $('#update').hide();
            }
         });

        $('#update').click(function(){
            updateInfo();
        });

        $('#cancel').click(function(){
            $('#member-email').val(memberInfo.email);
        });

        $('#deleteAC').click(function(){
            deleteAC();
        })

    } else {
        window.location.replace("/register/success");
    }
});

function getMemberInfo() {
    console.log("request data = " + JSON.stringify(sendData));
    $.ajax({
        type: 'POST',
        url: '/api/member/getInfo',
        dataType: "json",
        data: sendData,
        async: false,
        success: function(respon) {
            memberInfo = respon;
        }
    });
}

function displayWatchlist() {
    var stocklist = memberInfo.watchlist;
    console.log("Member watchlist: " + stocklist);

    $.each(stocklist, function(index, stock) {
        console.log(stock);

        var apiURL = "https://financialmodelingprep.com/api/v3/company/profile/" + stock.toString();

        var stockapi = {
            "async": true,
            "crossDomain": true,
            "url": apiURL,
            "method": "GET"
        }

        $.ajax(stockapi).done(function(response) {
            console.log(response);
            var data = response.profile;
            var Name = '<div class="key symbol">' + data.companyName + '</div>';
            var Price = '<div class="key price">' + data.price + '</div>';
            var Change = '<div class="key change">' + data.changes + '</div>';
            var ChangesPercentage = '<div class="key changepercentage">' + data.changesPercentage + '</div>';
            var deleteBTN = '<div class="action delete" id="del_' + stock + '" data="' + stock + '">delete</div>';

            $('#watchlist-block').append('<div class = "listItem" id="item_' + stock + '">' + Name + Price + Change + ChangesPercentage + deleteBTN + '</div>');

            var deleteID = '#del_' + stock;

            $(deleteID).click(function() {
                console.log("delete" + $(this).attr('data'));
                deleteWatchlist($(this).attr('data'));
            });
        });
    });
}

function deleteWatchlist(symbol) {
    var deleteJSON = { name: user, stock: symbol };

    $.ajax({
        type: 'DELETE',
        url: '/api/watchlist/delete',
        dataType: "JSON",
        data: deleteJSON,
        success: function(data) {
            if (data.message == "deleted") {
                console.log("Delete Success");
                var deleteItem = '#item_' + symbol;
                $(deleteItem).remove();
            }
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}

function updateInfo() {
    var newEmail = $('#member-email').val();
    var updateInfo = {name: user, email: newEmail};

    $.ajax({
        type: 'PUT',
        url: '/api/member/update',
        dataType: "JSON",
        data: updateInfo,
        success: function(data) {
            console.log(data.message);
            if (data.message == "updated") {
                $('#update').hide();
                $('#member-email').addClass('green').next('.alertMsg').html('Email updated!');
            } else if (data.message == "emailExist") {
                $('#member-email').removeClass('green').next('.alertMsg').html('Email existed!');
            } else {
                $('#member-email').removeClass('green').next('.alertMsg').html('Unexperted error');
            }
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}

function deleteAC() {
    var member_ID = memberInfo._id;
    var deleteMember = {name: user, _id: member_ID};

    var alert = confirm("You confirm delete you account?");

    if (alert == true) {
        $.ajax({
            type: 'DELETE',
            url: '/api/member/delete',
            dataType: "JSON",
            data: deleteMember,
            success: function(data) {
                console.log(data);
                $.cookie('status', null);
                $.cookie('user', null);
                console.log("Delete success");
                window.location.replace("/");
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    } else {

    }
}