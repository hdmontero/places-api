const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');
const crypto = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AuthTokenModel extends BaseModel {

    constructor(){

        super();         

        let Schema = mongoose.Schema;

        this.dbmodel = mongoose.model('AuthToken', new Schema(
            {
                _id: String,
                user_id: String,
                token: String,
                expires: Date
            }
        ));
    }

    generateAuthToken(user, callback){
        if(!user) return callback(true);

        // create a token
        var token = jwt.sign({ id: user._id }, config.secretKey, {
            expiresIn: 86400 // expires in 24 hours
        });

        return callback(false, token);
    }

    verifyAuthToken(token, callback){
        jwt.verify(token, config.secretKey, (error, decoded) => {
            if (error) return callback(error, false);
            return callback(error, decoded.id);
        });
    }
}

module.exports = new AuthTokenModel();