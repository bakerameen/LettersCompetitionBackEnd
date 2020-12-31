const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const Item = require('../model/shoppingItem');

// post data
router.post('/teams', (req, res, next) => {
    const team = req.body;
    console.log(team);
    res.status(201).json({
        message: 'team added successfully'
    });
});

// retrive or get data
router.get('/teams', (req, res, next) => {
    const teams = [
        {
            id: "eretert123",
            name: "Proffessional Services",
            description: "We are First"
        },
        {
            id: "eretert456",
            name: "KAM",
            description: "We are Second"
        },
    ];
    res.status(200).json({
        message: 'teams featched successfully!',
        teams: teams
    });

});



module.exports = router;


