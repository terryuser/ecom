$(document).ready(function () {
  indexBtn();
  stockSammary();
});

function indexBtn() {
  
}

function stockSammary() {
  var stockSammary = {
    "async": true,
    "crossDomain": true,
    "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=HK&lang=en",
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "aa4a4ca3famsh848267a0a99e223p125cc3jsn3ec1cfd6d129",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
    }
  }
  
  $.ajax(stockSammary).done(function (response) {
    var data = response.marketSummaryResponse.result;

    $.each(data, function(i, item){
      console.log(data[i].longName);
      $("#stock_news_items").append('<div>' + data[i].longName + '</div>');
    });
  });
}

