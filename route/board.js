const express = require('express');
const router = express.Router();


const Board = require('../models/board');
const checkAuth = require('../middleware/check-auth');

router.get('', (req, res, next) => {
    Board.find().then(documents =>{
        res.status(200).json({
            message: 'Board Fetched successfully!',
            board: documents
        })
        
    }).catch(err => {
        res.status(500).json({
            message: "Couldn't get board!"
        })
    })
})


router.post('', (req, res, next) => {
    
})

module.exports = router;