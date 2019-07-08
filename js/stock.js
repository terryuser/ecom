$(document).ready(function() {
    getStock();
    addWatchList();
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var InWatchList = false;
var user = $.cookie('user');
var symbol = getUrlParameter('symbol');
var checkData = { name: user, stock: symbol };

function getStock() {
    var timeStamp = getTimeStamp();
    $(".updateStamp.most-active").append(timeStamp);

    var symbol = getUrlParameter('symbol');
    var apiURL = "https://financialmodelingprep.com/api/v3/company/profile/" + symbol;

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": apiURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {
        var data = response.profile;

        var Name = data.companyName;
        var Price = data.price;
        var Change = data.changes;
        var ChangesPercentage = data.changesPercentage;

        var Range = data.range;
        var LastDiv = data.lastDiv;
        var Description = data.description;
        var Exchange = data.exchange;
        var Sector = data.sector;
        var Industry = data.industry;
        var CEO = data.ceo;
        var Website = data.website;

        if (Change > 0) {
            $('.stockChange').addClass("positive");
        } else {
            $('.stockChange').addClass("negative");
        }

        $('.IMG').html('<img src="https://financialmodelingprep.com/stocks/' + symbol.toLowerCase() + '.png" alt="' + Name + '">');

        $('.stockName').html(Name + "(" + symbol + ")<div>" + "</div>");
        $('.stockPrice').html('Price: ' + Price);
        $('.stockChange').html(Change + '<span>' + ChangesPercentage + '</span>');

        $('.des').append('<div class="title">Description</div><div>' + Description + '</div>');

        $('#info').append('<tr><th>Website</th><td>' + Website + '</td></tr>');
        $('#info').append('<tr><th>CEO</th><td>' + CEO + '</td></tr>');
        $('#info').append('<tr><th>Sector</th><td>' + Sector + '</td></tr>');
        $('#info').append('<tr><th>Industry</th><td>' + Industry + '</td></tr>');
        $('#info').append('<tr><th>Exchange</th><td>' + Exchange + '</td></tr>');
        $('#info').append('<tr><th>Range</th><td>' + Range + '</td></tr>');
        $('#info').append('<tr><th>Last Div</th><td>' + LastDiv + '</td></tr>');
    });

    //Display chart
    var chartDataURL = "https://financialmodelingprep.com/api/v3/historical-price-full/" + symbol + "?serietype=line";

    var stockapi = {
        "async": true,
        "crossDomain": true,
        "url": chartDataURL,
        "method": "GET"
    }

    $.ajax(stockapi).done(function(response) {

        var ctx = $('#chart');
        var chartData = [];

        var date = new Array;
        var closeVal = new Array;
        var showDays = 15;

        for (i = 0; i < showDays; i++) {
            date.push(response.historical[i].date);
            closeVal.push(response.historical[i].close)
        }

        console.log(date);
        console.log(closeVal);

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: date,
                datasets: [{
                    label: 'Historical Price',
                    backgroundColor: 'rgba(241, 157, 30, 0)',
                    borderColor: 'rgb(241, 157, 30)',
                    pointRadius: 4,
                    pointHitRadius: 4,
                    pointHoverBackgroundColor: 'rgb(241, 157, 30)',
                    lineTension: 0,
                    data: closeVal
                }]
            },

            // Configuration options go here
            options: {}
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

function checkWatchlist() {

    $.ajax({
        type: 'POST',
        url: '/api/watchlist/check',
        dataType: "JSON",
        data: checkData,
        success: function(data) {
            if (data = "exist") {
                InWatchList = true;
            } else {
                InWatchList = false;
            }
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}


function addWatchList() {

    checkWatchlist();

    if (InWatchList == false) {
        $('#WatchList').addClass("add").html("Add");
    } else {
        $('#WatchList').addClass("remove").html("Remove");
    }

    var addBtn = $('#WatchList');

    addBtn.click(function() {
        if (InWatchList == false) {
            $.ajax({
                type: 'PUT',
                url: '/api/watchlist/update',
                dataType: "JSON",
                data: sendData,
                success: function(data) {
                    InWatchList = true;
                    addBtn.addClass("remove").removeClass("add").html("Remove");
                },
                error: function(xhr, status, error) {
                    console.log('Error: ' + error.message);
                }
            });
        } else {
            InWatchList = false;
            $(this).removeClass("remove").addClass("add").html("Add");
        }
    });
}