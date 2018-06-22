const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth');

// before filter
router.use(function beforeFilter(req, res, next){

    if(req.url == '/auth/login' || req.url == '/auth/register' || req.url == '/auth/logout') return next();
    
    // check token
    let token = req.headers['x-access-token'];
    if(!token){
        res.status(401).send('No token was provided.');
        return;
    } 
    
    // verify token
    authController.verifyAuthToken(token, (error, result) => {
        if(error) handleError(error);
        res.send({user: result});
        return;
    });
});

// login
router.post('/auth/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    authController.login(email, password, (error, result) => {
        if(error){
            res.status(404).send({
                error: true,
                message: 'The provided login data does not match any registered user.'
            });
            return;
        }
        res.send(result);
    });
});

// register
router.post('/auth/register', (req, res) => {

    authController.registerUser(req.body, (error, result) => {
        if(error){
            res.status(400).send({error: true, message: error});
            return;
        }
        res.send(result);
    });
});
 
module.exports = router;