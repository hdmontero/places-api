const mcache = require('memory-cache');

class CacheHelper {
    
    put(key, value, duration){
        mcache.put(key,value,duration);
    }

    get(key){
        return mcache.get(key);
    }
}
module.exports = CacheHelper;