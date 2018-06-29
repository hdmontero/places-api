const GoogleMapsHelper = require('../entities/helpers/GoogleMapsHelper');
const CacheHelper = require('./helpers/CacheHelper');

class PlacesController {

    constructor(){
        this.cacheHelper = new CacheHelper();
        this.googleMapsHelper = new GoogleMapsHelper();
    }

    search(query, callback){
        if(query.length == 0) return callback('No query search provided.', false);
        let cacheKey = '__google_places_results__' + query;
        let cachedResults = this.cacheHelper.get(cacheKey);
        if(cachedResults){
            return callback(false, cachedResults);
        }

        this.googleMapsHelper.search(query, (error, response) => {
            if(error) return callback(error.message, false);
            this.cacheHelper.put(cacheKey,response,3600*1000); // cache for 1 hour (time in ms)
            return callback(false, response);
        });        
    }

    get(id, callback){
        let cacheKey = '__google_places_detail__' + id;
        let cachedResult = this.cacheHelper.get(cacheKey);
        if(cachedResult){
            return callback(false, cachedResult);
        }

        this.googleMapsHelper.getPlaceDetail(id, (error, response) => {
            if(error) return callback(error.message, false);
            this.cacheHelper.put(cacheKey,response,3600*1000); // cache for 1 hour (time in ms)
            return callback(false, response);
        });
    }
}

module.exports = PlacesController;