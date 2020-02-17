const request = require("request");
const key = require("./../../config.js");

const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/" + key.forecastKey + "/" + lat + "," + long + "?units=si";

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Some error occured", undefined);
        } else if(body.error){
            callback("Forecast not available", undefined);
        } else{
            callback(undefined, body.hourly.summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");
        }
    })
}

module.exports = forecast;