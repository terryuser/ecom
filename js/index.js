$(document).ready(function () {
  indexBtn();
  mostActive();
  mostGainer();
});

function indexBtn() {
  
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
