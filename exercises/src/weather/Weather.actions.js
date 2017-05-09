import $ from 'jquery';
// const WEATHER_APP_ID = 'd572e3897b56c1638fada0388125c161';
// const WEATHER_APP_ID = 'fbfa66d3a88c6eeb8de2e82f7844aacf';
const WEATHER_APP_ID =  'a6f3b4b65e089f4964be0db3adcfba84';


export function changeName(name) {
  return { type: 'changeName', value: name };
}

export function startGetWeather() {
  return { type: 'start_get_weather' };
}

function weatherInfo(data) {
  return { type: 'weather_info', payload: data };
}

function weatherError(resp) {
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Something went wrong!';
  return { type: 'weather_error', error: error };
}

export function direct(cityName){
  let asyncAction = function(dispatch) {
    dispatch(changeName(cityName));
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        q: cityName,
        units: 'imperial',
        APPID: WEATHER_APP_ID
      }
    })
    .then(data => dispatch(weatherInfo(data)))
    .catch(resp => dispatch(weatherError(resp)))
  };
  return asyncAction;

}

// redux-thunk with error handling
export function getWeather(query) {
  let asyncAction = function(dispatch) {
    dispatch(changeName(query));
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        q: query,
        units: 'imperial',
        APPID: WEATHER_APP_ID
      }
    })
    .then(data => dispatch(weatherInfo(data)))
    .catch(resp => dispatch(weatherError(resp)))
  };
  return asyncAction;
}
