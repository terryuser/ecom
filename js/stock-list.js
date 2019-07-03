$(document).ready(function() {
    mostActive();
    mostGainer();
    majorIndex();
});

function Add_watchlist() {
    $(".addFav").click(function() {
        var stock = $(this).attr('data');
        var member;
        console.log(stock);
    });
}

function mostActive() {

    var timeStamp = getTimeStamp();

    $(".updateStamp.most-active").append(timeStamp);

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

            $("#mostActive").append('<div class="listItem" id=' + item.ticker + '>' + listItemHTML + addFavBTN + '</div>');

            Add_watchlist();
        });
    });
}

function mostGainer() {

    var timeStamp = getTimeStamp();

    $(".updateStamp.most-active").append(timeStamp);

    var apiURL = "https://financialmodelingprep.com/api/v3/stock/gainers";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {

        var data = response.mostGainerStock;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.companyName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges = '<div class="key changes">' + item.changes + '</div>';
            var keyPercent = '<div class="key changesPercentage">' + item.changesPercentage + '</div>';

            var listItemHTML = keySymbol + keyName + keyPrice + keyChanges + keyPercent;

            var addFavBTN = '<button class="addFav" data="' + item.ticker + '">add</button>';

            $("#mostGainer").append('<div class="listItem" id=' + item.ticker + '>' + listItemHTML + addFavBTN + '</div>');

            Add_watchlist();
        });
    });
}


function majorIndex() {

    var timeStamp = getTimeStamp();

    $(".updateStamp.most-active").append(timeStamp);

    var apiURL = "https://financialmodelingprep.com/api/v3/majors-indexes";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {

        var data = response.majorIndexesList;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.indexName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges = '<div class="key changes">' + item.changes + '</div>';

            var listItemHTML = keySymbol + keyName + keyPrice + keyChanges;

            var addFavBTN = '<button class="addFav" data="' + item.ticker + '">add</button>';

            $("#majorIndex").append('<div class="listItem" id=' + item.ticker + '>' + listItemHTML + addFavBTN + '</div>');

            Add_watchlist();
        });
    });
}


function getTimeStamp() {
    var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);
    var yesterdayString = "Updated on " + yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();

    return yesterdayString;
}