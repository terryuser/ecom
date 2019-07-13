$(document).ready(function() {
    var timeStamp = getTimeStamp();
    $(".updateStamp").append(timeStamp);

    mostActive();
    mostGainer();
    majorIndex();
    getAllStock()
});

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
        console.log("Most active: " + response);

        var data = response.mostActiveStock;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.companyName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges;
            var keyPercent;

            if (item.changes > 0) {
                keyChanges = '<div class="key changes positive">' + item.changes + '</div>';
                keyPercent = '<div class="key changesPercentage positive">' + item.changesPercentage + '</div>';
            } else {
                keyChanges = '<div class="key changes negative">' + item.changes + '</div>';
                keyPercent = '<div class="key changesPercentage negative">' + item.changesPercentage + '</div>';
            }

            var listItemHTML = '<div class="listItem" id=' + item.ticker + '>' + keySymbol + keyName + keyPrice + keyChanges + keyPercent + '</div>';
            var addFavBTN = '<div class="addFav" data="' + item.ticker + '">add</div>';

            $("#mostActive").append('<a href="../stock?symbol=' + item.ticker + '">' + listItemHTML + '</a>');

        });
    });
}

function mostGainer() {

    var apiURL = "https://financialmodelingprep.com/api/v3/stock/gainers";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {
        console.log("Most gainer: " + response);

        var data = response.mostGainerStock;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.companyName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges;
            var keyPercent;

            if (item.changes > 0) {
                keyChanges = '<div class="key changes positive">' + item.changes + '</div>';
                keyPercent = '<div class="key changesPercentage positive">' + item.changesPercentage + '</div>';
            } else {
                keyChanges = '<div class="key changes negative">' + item.changes + '</div>';
                keyPercent = '<div class="key changesPercentage negative">' + item.changesPercentage + '</div>';
            }

            var listItemHTML = '<div class="listItem" id=' + item.ticker + '>' + keySymbol + keyName + keyPrice + keyChanges + keyPercent + '</div>';

            var addFavBTN = '<div class="addFav" data="' + item.ticker + '">add</div>';

            $("#mostGainer").append('<a href="../stock?symbol=' + item.ticker + '">' + listItemHTML + '</a>');

        });
    });
}


function majorIndex() {

    var apiURL = "https://financialmodelingprep.com/api/v3/majors-indexes";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {
        console.log("Major index: " + response);

        var data = response.majorIndexesList;

        $.each(data, function(i, item) {

            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.ticker + '</div>';
            var keyName = '<div class="key name">' + item.indexName + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';
            var keyChanges;

            if (item.changes > 0) {
                keyChanges = '<div class="key changes positive">' + item.changes + '</div>';
            } else {
                keyChanges = '<div class="key changes negative">' + item.changes + '</div>';
            }

            var listItemHTML = '<div class="listItem" id=' + item.ticker + '>' + keySymbol + keyName + keyPrice + keyChanges + '</div>';

            var addFavBTN = '<div class="addFav" data="' + item.ticker + '">add</div>';

            $("#majorIndex").append('<a href="../stock?symbol=' + item.ticker + '">' + listItemHTML + '</a>');
        });
    });
}

function getAllStock() {

    var apiURL = "https://financialmodelingprep.com/api/v3/company/stock/list";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {
        console.log("All stocklist: " + response);

        var data = response.symbolsList;

        $.each(data, function(i, item) {
            //Define stock item format
            var keySymbol = '<div class="key symbol">' + item.symbol + '</div>';
            var keyName = '<div class="key name">' + item.name + '</div>';
            var keyPrice = '<div class="key price">' + item.price + '</div>';

            var listItemHTML = '<div class="listItem" id=' + item.symbol + '>' + keySymbol + keyName + keyPrice + '</div>';

            $("#allStock").append('<a href="../stock?symbol=' + item.symbol + '">' + listItemHTML + '</a>');
        });
    });
}


function getTimeStamp() {
    var today = new Date;
    var todayMonth = today.getMonth() + 1;
    var todayMin = today.getMinutes();
    if (todayMin < 10) {
        todayMin = "0" + todayMin;
    }

    var todayString = "Updated on " + today.getFullYear() + "/" + todayMonth + "/" + today.getDate() + "  " + today.getHours() + ":" + todayMin;
    var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);
    var yesterdayString = "Updated on " + yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();

    return todayString;
    // return yesterdayString;
}

let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        console.log("loaded");
        $('.spinner').hide();
        $('#allStock').addClass('complete_load');
    }
}, 6000);