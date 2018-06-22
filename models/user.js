const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

class UserModel extends BaseModel {

    constructor(){
        super(); 

        let Schema = mongoose.Schema;  
        this.dbmodel = mongoose.model('User', new Schema({
            _id: String,
            email: {type: String, unique: true, dropDups: true, required: true},
            password: {type: String, required: true},
            phone: String,
            fname: {type: String, required: true},
            lname: {type: String, required: true},
            birth_date: {type: Date, required: true},
            gender: {type: Number, required: true},
            auth: {token: String, expires: Date}
        }));
    }

    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * @param {*} callback 
     */
    findByEmailAndPassword(email, password, callback){
        let hashedPassword = bcrypt.hashSync(password, 8);
        this.dbmodel.findOne({email: email, password: hashedPassword}).exec(callback);
    }

    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     */
    create(data, callback){
        let id = new mongoose.Types.ObjectId;
        let token = jwt.sign({ id: id}, config.secretKey, {
            expiresIn: 86400 // expires in 24 hours
        });

        let userData = {
            _id: id,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: bcrypt.hashSync(data.password, 8),
            phone: data.phone,
            gender: data.gender,
            birth_date: new Date(data.birth_date)
        };

        this.dbmodel.create(userData, (error, user) => {
            console.log(error);
            if(error){
                if(error.code){
                    let customError = this.getErrorDescriptionByCode(error.code);
                    if(customError){
                        error = customError; 
                    }
                } else {
                    error = error.message;
                }
            }
            return callback(error, user);
        });       
    }
}

module.exports = new UserModel();