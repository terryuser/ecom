$(document).ready(function () {
    stockSammary();
});

function AddToFav() {
    $(".addFav").click(function() {
        var stock = $(this).attr('data');
        var member;
        console.log(stock);
    });
}

function stockSammary() {
    var stockSammary = {
        "async": true,
        "crossDomain": true,
        "url": "https://stock.p.rapidapi.com/v1/funds",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "stock.p.rapidapi.com",
            "X-RapidAPI-Key": "aa4a4ca3famsh848267a0a99e223p125cc3jsn3ec1cfd6d129"
        }
    }

    $.ajax(stockSammary).done(function (response) {
        var data = response.result.funds;
        $("#updateStamp").append('Updated on' + response.result.timestamp);

        $.each(data, function (i, item) {

            //Define stock item format
            var keySymbol = '<div class"key symbol">'+ data[i].symbol + '</div>';
            var keyName = '<div class="key name">'+ data[i].name + '</div>';
            var keyExchange = '<div class="key exchange">'+ data[i].exchange + '</div>';
            var keyChange = '<div class="key change">'+ data[i].change + '</div>';
            var keyStrength = '<div class="key rsi">'+ data[i].strength + '</div>';
            var keyPassion = '<div class="key passion">'+ data[i].passion + '</div>';
            var keyReach = '<div class="key reach">'+ data[i].reach + '</div>';

            var addFavBTN = '<button class="addFav" data="' + data[i].symbol + '">add</button>';

            var listItemHTML = keySymbol + keyName + keyExchange + keyChange + keyStrength + keyPassion + keyReach;

            $("#stock-list-block").append('<div class="listItem" id=' + data[i].symbol + '>' + listItemHTML + '</div>' + addFavBTN);
        });

        AddToFav();
    });
}

