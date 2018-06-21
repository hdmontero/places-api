const userEntity = require('../../entities/user');

class AuthController {

    login(email, password, callback) {
        userEntity.login(email, password, (error,result) => {
            callback(error,result);
        });
    }

    verifyAuthToken(token, callback){
        userEntity.verifyAuthToken(token, (error,result) => {
            callback(error,result);
        });
    }
}

module.exports = new AuthController();