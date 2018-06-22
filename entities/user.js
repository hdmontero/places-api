const userModel = require('../models/user');
const mongoose = require('mongoose');
const AuthToken = require('../models/auth_token');

class User {

    /**
     * 
     * @param {*} email 
     * @param {*} password 
     * @param {*} callback 
     */
    login(email, password, callback){
        userModel.findByEmailAndPassword(email, password, (error, user) => {
            if(!error){               
                AuthToken.generateAuthToken(user, (error, authToken) => {
                    if(!error) {
                        user.auth = {token: authToken};  
                    }
                    return callback(error, user);
                });
            }
        });
    }

    /**
     * 
     * @param {*} token 
     * @param {*} callback 
     */
    verifyAuthToken(token, callback){
        AuthToken.verifyAuthToken(token, (error,result) => {
            callback(error,result);
        });
    }

    create(data, callback){
        userModel.create(data, (error, user) => {
            if(error) return callback(error, false);

            AuthToken.generateAuthToken(user, (error, authToken) => {
                if(error) return callback(error, false);
                
                user.auth = {token: authToken};  
                return callback(error, user);
            });
        });
    }
}

module.exports = new User();