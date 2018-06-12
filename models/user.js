const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {

    constructor(){

        super();
        
        let Schema = mongoose.Schema;  

        this.dbmodel = mongoose.model('User', new Schema(
            {
                _id: String,
                username: String,
                email: String,
                password: String,
                phone: String,
                fname: String,
                lname: String,
                birth_date: Date,
                gender: Number,
                auth: {token: String, expires: Date}
            }
        ));
    }

    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * @param {*} callback 
     */
    findByEmailAndPassword(email, password, callback){
        this.dbmodel.findOne({email:email, password:password}).exec(callback);
    }
}

module.exports = new UserModel();