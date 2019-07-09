var user = $.cookie('user');
var status = $.cookie('status');
var sendData = { name: user };
var memberInfo = {};


$(document).ready(function() {
    if ($.cookie('status') == "member") {
        getMemberInfo();
        console.log(memberInfo);
        $('#member-name').val(memberInfo.name);
        $('#member-email').val(memberInfo.email);
        displayWatchlist();
    } else {

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

function deleteAC() {
    var member_ID = memberInfo._id;

    $.ajax({
        type: 'DELETE',
        url: '/api/member/delete',
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