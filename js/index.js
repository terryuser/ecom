$(document).ready(function () {
  indexBtn();
  // stockSammary();
});

function indexBtn() {
  
}

// function stockSammary() {
//   var stockSammary = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://stock.p.rapidapi.com/v1/funds",
//     "method": "GET",
//     "headers": {
//       "X-RapidAPI-Host": "stock.p.rapidapi.com",
//       "X-RapidAPI-Key": "aa4a4ca3famsh848267a0a99e223p125cc3jsn3ec1cfd6d129"
//     }
//   }
  
//   $.ajax(stockSammary).done(function (response) {
//     var data = response.result.funds;

//     $.each(data, function(i, item){
//       console.log(data[i].name);
//       $("#stock_news_items").append('<div>' + data[i].name + '</div>');
//     });
//   });
// }

