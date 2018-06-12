const mongoose = require('mongoose');

class BaseModel {

    constructor(){
        if(!this.connection){
            this.connection = mongoose.connect('mongodb://localhost/vacation_planner', {}, (error) =>{
                if(error) console.log(error);
            });
        } 
    }

    
}

module.exports = BaseModel;
