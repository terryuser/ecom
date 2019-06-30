$(document).ready(function() {
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

    $.getJSON("stock.json", function (stockList) {
        console.log(stockList);
        
        //Define stock item format
        var keySymbol = '<div class"key code">' + stockList.symbol + '</div>';
        var keyName = '<div class="key name">' + stockList.name + '</div>';
    });

    // var stockSymbol;
    // console.log(stockSammary);

    var apiKey = "7UQB9ISU3Q3RNEKI";


    // var stockSammary = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "http://hq.sinajs.cn/list=hk00001",
    //     "method": "GET"
    // }

    // $.ajax(stockSammary).done(function(response) {
    //     var data = response.split('"');


    //     $("#updateStamp").append('Updated on' + data);

        // var keyExchange = '<div class="key exchange">' + data[i].exchange + '</div>';
        // var keyChange = '<div class="key change">' + data[i].change + '</div>';
        // var keyStrength = '<div class="key rsi">' + data[i].strength + '</div>';
        // var keyPassion = '<div class="key passion">' + data[i].passion + '</div>';
        // var keyReach = '<div class="key reach">' + data[i].reach + '</div>';

        // var addFavBTN = '<button class="addFav" data="' + data[i].symbol + '">add</button>';

        // var listItemHTML = keySymbol + keyName + keyExchange + keyChange + keyStrength + keyPassion + keyReach;

        // $("#stock-list-block").append('<div class="listItem" id=' + data[i].symbol + '>' + listItemHTML + '</div>' + addFavBTN);
        // $("#stock-list-block").append('<div class="listItem">' + listItemHTML + '</div>');

        // AddToFav();
    // });
}


var stockLista;