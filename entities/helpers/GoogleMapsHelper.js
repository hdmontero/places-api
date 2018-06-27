const googleMaps = require('@google/maps');
const config = require('../../config/config');

class GoogleMapsHelper {

    constructor(){
        this.googleMapsClient = googleMaps.createClient({ 
            key: config.GOOGLE_PLACES_KEY
        }); 
    }

    search(query, perPage, page, callback){
        this.googleMapsClient.places({
            query: query,
            language: 'en',
            location: [18.4640902,-69.9386589],
            radius: 5000
        }, (error, response) => {
            if(error) return callback(error.message, false);
            let places = [];
            if(response.json.results.length > 0){
                response.json.results.forEach((place, index) => {
                    places.push({
                        gid: place.id,
                        icon: place.icon,
                        name: place.name,
                        address: place.formatted_address,
                        location: place.geometry.location,
                        rating: place.rating,
                        categories: place.types,
                        // photos: place.photos
                    });
                });
            }
            callback(false, places);
        });        
    }
}

module.exports = new GoogleMapsHelper();