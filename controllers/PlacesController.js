const googleMapsHelper = require('../entities/helpers/GoogleMapsHelper');
const cacheHelper = require('./helpers/CacheHelper');

class PlacesController {

    search(query, perPage, page, callback){
        let cacheKey = '__google_places_results__' + query;
        let cachedResults = cacheHelper.get(cacheKey);
        if(cachedResults){
            console.log('cachedResults');
            callback(false, cachedResults);
            return;
        }

        googleMapsHelper.search(query, perPage, page, (error, response) => {
            if(error) return callback(error.message, false);
            cacheHelper.put(cacheKey,response,3600*1000); // cache for 1 hour
            callback(false, response);
        });        
    }
}

module.exports = new PlacesController();