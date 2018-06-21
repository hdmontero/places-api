const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

class UserModel extends BaseModel {

    constructor(){

        super();
        
        let Schema = mongoose.Schema;  

        this.dbmodel = mongoose.model('User', new Schema(
            {
                _id: String,
                email: {type: String, unique: true},
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
        let hashedPassword = bcrypt.hashSync(password, 8);
        this.dbmodel.findOne({email: email, password: hashedPassword}).exec(callback);
    }

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
            if(error) handleError(error);
            return callback(error, user);
        });
        
    }
}

module.exports = new UserModel();