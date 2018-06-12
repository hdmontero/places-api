const mongoose = require('mongoose');
const BaseModel = require('./BaseModel');
const crypto = require('crypto');

class AuthToken extends BaseModel {

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
        let string = user._id + '|' + Math.random();
        let hash = crypto.createHash('md5').update(user._id).digest('hex');

        this.dbmodel.create({
            _id: new (mongoose.Types.ObjectId),
            token: hash,
            expires: new Date(Date.now() + (1000*30)),
            user_id: user._id
        }, callback)
    }

    verifyAuthToken(token, callback){
        this.dbmodel.findOne({token: token, expires: {"$gt": new Date()}}, (error,result) => {
            console.log(result);
            callback(error,result);
        });
    }
}

module.exports = AuthToken;