
const express = require('express');
const router = express.Router();


const Team = require('../models/teams');

// post data

router.post('/teams', (req, res, next) => {
    const team = new Team({
        name: req.body.name,
        description: req.body.description
    }); 
    console.log(team);
        team.save();   
        res.status(201).json({
        message: 'team added successfully'
    });
});

// retrive or get data
router.get('/teams', (req, res, next) => {
    Team.find().then(documents => {        
        res.status(200).json({
            message: 'teams featched successfully!',
            teams: documents       
        });
    });
    // const teams = [
    //     {
            
    //         name: "Proffessional Services",
    //         description: "We are First"
    //     },
    //     {
            
    //         name: "KAM",
    //         description: "We are Second"
    //     },
    // ];
   

});



module.exports = router;


