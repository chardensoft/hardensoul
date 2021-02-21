function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   // Directly return the joined string
   return splitStr.join(' ');
}

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  var today = "natta";
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=df3b14c29ee53466bdccef67ce69f8ab";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = '<div class="today_info">';
      results += '<h2 class = "today">Current Weather Report for ' + json.name + ', ' + json.sys.country + '</h2>';
      results += '<h3 class = "title">' + moment().format('[Today @] LT') + "</h3>"
      today = moment(json.dt_txt).format("MMM Do YY");
      results += '<div class="today_stuff">'
      results += '<h4 class = "today_temp">' + Math.round(json.main.temp) + "&deg; F (Feels like " +
        Math.round(json.main.feels_like) + "&deg;)" + "</h4>"
      results += '<h5 class = "today_min">' + "Min - Max: " + Math.round(json.main.temp_min) + "&deg; - " +
        Math.round(json.main.temp_max) + "&deg;</h5>"


      results += '<h5 class = "today_desc">'
      for (let i=0; i < json.weather.length; i++) {
     	  results += '<img class = "today_icon" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      for (let i=0; i < json.weather.length; i++) {
     	  results += titleCase(json.weather[i].description)
     	  if (i !== json.weather.length - 1)
     	    results += ", "
      }
      results += "</h5>";
      results += '<h5 class = "today_winds">' + 'Wind speed: ' + json.wind.speed  + ' mph</h5>'
      results += '</div>'
      results += '<hr/>'
      results += '</div>'


      document.getElementById("weatherResults").innerHTML = results;
    });
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=df3b14c29ee53466bdccef67ce69f8ab";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let forecast = '<h2 class="fore"> Future Forecast Report </h2>'
      forecast += '<div class="future_full">';
      console.log(today);
      for (let i=0; i < json.list.length; i++) {
        forecast += '<div class="fut_info">'
        if (moment(json.list[i].dt_txt).format('MMM Do YY') == today) {
	         forecast += '<h3 class = "fut_title">' + moment(json.list[i].dt_txt).format('[Today @] h a') + "</h3>"
        } else {
           forecast += '<h3 class = "fut_title">' + moment(json.list[i].dt_txt).format('dddd [@] h a') + "</h3>";
        }
	      forecast += '<h4 class = "fut_temp">' + Math.round(json.list[i].main.temp) + "&deg; F (" + Math.round(json.list[i].main.temp_min) + "&deg; - " + Math.round(json.list[i].main.temp_max) + "&deg;)</h4>";
        forecast += '<h5 class = "fut_desc">' + '<img class = "fut_icon" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>' + titleCase(json.list[i].weather[0].description) + "</h5>"
        forecast += '<h5 class = "fut_winds">Wind Speed: ' + json.list[i].wind.speed + " mph</h5>"
        forecast += '</div>'
      }
      forecast += '</div>'
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
