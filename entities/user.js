const userModel = require('../models/user');
const mongoose = require('mongoose');
const AuthToken = require('../models/auth_token');

class User {

    login(email, password, callback){

        userModel.findByEmailAndPassword(email, password, (error, user) => {

            if(!error){               
                AuthToken.generateAuthToken(user, (error, authToken) => {

                    if(!error){
                        user.auth = {
                            token: authToken
                        }
                    }

                    return callback(error, user);

                });
            }

            //return callback(error, user);

        });
    }

    verifyAuthToken(token, callback){
        AuthToken.verifyAuthToken(token, (error,result) => {
            callback(error,result);
        });
    }
}

module.exports = new User();