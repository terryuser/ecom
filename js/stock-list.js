$(document).ready(function() {
    mostActive();
});

function Add_watchlist() {
    $(".addFav").click(function() {
        var stock = $(this).attr('data');
        var member;
        console.log(stock);
    });
}

function mostActive() {

    // var apiURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + item.symbol + "&apikey=" + apiKey;
    var apiURL = "https://financialmodelingprep.com/api/v3/stock/actives";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {

        var data = response.mostActiveStock;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.companyName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges = '<div class="key changes">' + item.changes + '</div>';
            var keyPercent = '<div class="key changesPercentage">' + item.changesPercentage + '</div>';

            var listItemHTML = keySymbol + keyName + keyPrice + keyChanges + keyPercent;

            var addFavBTN = '<button class="addFav" data="' + item.ticker + '">add</button>';

            $("#mostActive").append('<div class="listItem" id=' + item.ticker + '>' + listItemHTML + '</div>' + addFavBTN);

            Add_watchlist();

        });



    });







    // var stockapi = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": apiURL,
    //     "method": "GET"
    // }



    // var stockSymbol;
    // console.log(stockSammary);




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

    // var listItemHTML = keySymbol + keyName + keyExchange + keyChange + keyStrength + keyPassion + keyReach;

    // $("#stock-list-block").append('<div class="listItem" id=' + data[i].symbol + '>' + listItemHTML + '</div>' + addFavBTN);
    // $("#stock-list-block").append('<div class="listItem">' + listItemHTML + '</div>');

    // AddToFav();
    // });
}