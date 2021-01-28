
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const checkAuth = require('../middleware/check-auth');


const router = express.Router();


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10,)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name                
            });
            user.save()
                .then(result => {                   
                    res.status(201).json({
                        message: 'user created!!',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'invalid authentication credentials!'
                    })
                });
            ;
        });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth Failed!'
                });
            }
            fetchedUser = user;
            // console.log('fetchedUser' + fetchedUser._id);
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            console.log('result' + result);
            if (!result) {
                return res.status(401).json({
                    message: 'Auth Failed!'
                });
            }
            // create new token
            const token = jwt.sign(
                { email: fetchedUser.email, userID: fetchedUser._id }, 'secret_this_should_be_longer', { expiresIn: "1h" }
            );

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userID: fetchedUser._id,
                name: fetchedUser.name
            });

        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: 'invalid authentication credentials!'
            });
        });
});

router.get('/users', checkAuth, (req, res, next) => {
    User.find().then(users => {        
        res.status(200).json({
          message: 'teams fetched Successfully',
          users: users
        });    
      })
} )

module.exports = router;