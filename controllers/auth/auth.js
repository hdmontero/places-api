const userEntity = require('../../entities/user');

class AuthController {

    // login
    login(email, password, callback) {
        userEntity.login(email, password, (error,result) => {
            callback(error,result);
        });
    }

    // verify token
    verifyAuthToken(token, callback){
        userEntity.verifyAuthToken(token, (error,result) => {
            callback(error,result);
        });
    }

    // verify token
    registerUser(data, callback){
        userEntity.create(data, (error,result) => {
            callback(error,result);
        });
    }
}

module.exports = new AuthController();