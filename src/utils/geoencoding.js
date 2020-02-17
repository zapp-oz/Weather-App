const request = require("request");
const key = require("./../../config.js");

const geoEncoding = (place, callback) => {
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(place) + ".json?access_token=" + key.geocodingKey;

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback("Some error occured", undefined);
        } else if(body.features.length === 0){
            callback("Place not found! Try again.", undefined);
        } else{
            data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geoEncoding;