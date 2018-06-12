const userModel = require('../models/user');
const AuthToken = require('../models/auth_token');

class User {

    findByEmailAndPassword(email, password, callback){

        userModel.findByEmailAndPassword(email, password, (error, user) => {

            if(!error){                
                new AuthToken().generateAuthToken(user, (error, authToken) => {

                    if(!error){
                        user.auth = {
                            token: authToken.token,
                            expires: authToken.expires
                        }
                    }

                    return callback(error, user);

                });
            }

            //return callback(error, user);

        });
    }

    verifyAuthToken(token, callback){
        new AuthToken().verifyAuthToken(token, (error,result) => {
            callback(error,result);
        });
    }
}

module.exports = new User();