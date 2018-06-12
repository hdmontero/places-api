const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth');

router.use(function beforeFilter(req, res, next){
    if(req.url != '/api/auth/login'){
        if(!req.headers.token){
            res.status(403).send('Plase authenticate before performing this action');
            return;
        } else {
            authController.verifyAuthToken(req.header.token, (error, result) => {
                console.log(result, 'here');
            });
        }
    }
    next(); // for later testing...
});

router.post('/auth/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    authController.login(email, password, (error, result) => {
        if(error){
            res.status(404).send({
                error: true,
                message: 'The requested user was not found in this server.'
            });
            return;
        }
        res.send(result);
    });
});
 
module.exports = router;