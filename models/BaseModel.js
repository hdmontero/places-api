const mongoose = require('mongoose');
const errorCodes = require('../config/error_codes');

class BaseModel {

    constructor(){
        if(!this.connection){
            this.connection = mongoose.connect('mongodb://localhost/vacation_planner', {}, (error) =>{
                if(error) console.log(error);
            });
        } 
    }
    
    getErrorDescriptionByCode(errorCode){
        let error = null;
        if(errorCodes[errorCode]){
            error = errorCodes[errorCode];
        }
        return error;
    }    
}

module.exports = BaseModel;
