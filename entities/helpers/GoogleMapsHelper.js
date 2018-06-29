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
            radius: 20000
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
                        place_id: place.place_id
                        // photos: place.photos
                    });
                });
            }
            callback(false, places);
        });        
    }

    getPlaceDetail(placeId, callback){
        this.googleMapsClient.place({
            placeid: placeId,
            language: 'en'
        }, (error, response) => {
            if(error) return callback(error.message, false);
            
            let result = response.json.result;
            let place = {
                gid: result.id,
                place_id: result.place_id,
                icon: result.icon,
                name: result.name,
                address: result.formatted_address,
                phone: result.formatted_phone_number,
                location: result.geometry.location,
                categories: result.types,
                website: result.website,
                map_url: result.url,
                opening_hours: result.opening_hours.weekday_text,
                photos: result.photos,
                reviews: result.reviews,
                rating: result.rating
            };

            return callback(false, place);
        });        
    }
}

module.exports = GoogleMapsHelper;