
const express = require('express');
const router = express.Router();


const Match = require('../models/match');
const checkAuth = require('../middleware/check-auth');

// Get matches

router.get('', (req, res, next) => {
    Match.find().sort({"_id": -1})
        .then(documents => {
            res.status(200).json({
                message: 'matches fetched successfully!',
                matches: documents
            })
            console.log(documents)
        })
        
        .catch(error => {
            res.status(500).json({
                message: "Couldn't get matches!"
            })
        })
})

// Create Match
router.post('', checkAuth, (req, res, next) => {
  
    const match = new Match({
        teamId: req.body.teamId,
        teamName: req.body.teamName,
        description: req.body.description,
        fPlayer: req.body.fPlayer,
        sPlayer: req.body.sPlayer,
        score: req.body.score
    });
  
    match.save().then(createdMatch => {
        res.status(200).json({
            message: 'match craeted successfully!',
            matchId: createdMatch._id
        })
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Can't craete match!",
            })
        })
})


module.exports = router;


