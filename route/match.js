
const express = require('express');
const router = express.Router();


const Match = require('../models/match');
const checkAuth = require('../middleware/check-auth');

// Get matches

router.get('', checkAuth, (req, res, next) => {
    Match.find().sort({"_id": -1})
        .then(documents => {
            res.status(200).json({
                message: 'matches fetched successfully!',
                matches: documents
            })
           
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

// update match score  teamId: teamId, description:description, fPlayer: fPlayer, sPlayer: sPlayer, teamName: teamName
router.put('/:id', checkAuth,  (req, res, next) => {
    const match = new Match({
        _id: req.body.id,        
        score: req.body.score,
        teamId: req.body.teamId,
        description: req.body.description,
        fPlayer: req.body.fPlayer,
        sPlayer: req.body.sPlayer,
        teamName: req.body.teamName 
    });

    console.log(match);

    Match.updateOne({_id: req.params.id}, match).then( result => {
   console.log(match);
        res.status(200).json({
            message: 'score updated successfully!',
            match: match
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't update a score!"          
        })
    })
     ;

})


// Add Answer
router.post('/answered', checkAuth,  (req, res, next) => {  
    const answer = new Answer({
        userName: req.body.userName,
        userCliceked: req.body.userCliceked        
    });
  
    // answer.save().then(createdAnswer=> {
        res.status(200).json({
            message: 'answer clicked!',
            userCliceked: createdMatch.userCliceked,
            userName: createdAnswer.userName
        })
    // })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Can't create answer!",
            })
        })
})


module.exports = router;


