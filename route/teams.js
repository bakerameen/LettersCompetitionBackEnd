
const express = require('express');
const router = express.Router();


const Team = require('../models/teams');
const checkAuth = require('../middleware/check-auth');

// post data
router.post('', checkAuth,  (req, res, next) => {
    console.log('enter');
    const team = new Team({
        name: req.body.name,
        description: req.body.description
    });     
        team.save().then(createdTeam => {
            res.status(201).json({
                message: 'team added successfully',
                teamId: createdTeam._id
            });
        }
        )
         .catch( error => {
             res.status(500).json({
                 message: 'Creating a team failed!'
             })
         })
        ;   
        
});

// retrive or get data
router.get('', checkAuth,  (req, res, next) => {
    Team.find().then(documents => {        
        res.status(200).json({
            message: 'teams featched successfully!',
            teams: documents       
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't get teams!"
        })
    })
    ;
});

// delete data
router.delete('/:id', checkAuth, (req, res, next) => {
   Team.deleteOne({_id: req.params.id}).then((result) => {   
       console.log(result);
    res.status(200).json({
        message: 'item wad deleted'
    });
   })
   .catch(error => {
    res.status(500).json({
        message: "Couldn't delete a team!"
    })
})
   ; 
    
 
});

// update data
router.put('/:id', checkAuth, (req, res, next) => {
    const team = new Team({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    Team.updateOne({_id: req.params.id}, team).then( result => {
        console.log(result);
        res.status(200).json({message: 'team updatated successfully!'})
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't update a team!"
        })
    })
    ;
})

// update single team

router.get('/:id', checkAuth,  (req, res, next) => {
    Team.findById(req.params.id).then(team => {
        if (team) {
            res.status(200).json(team);
            console.log(team);

        } else {
            res.status(400).json({message: 'Team not found'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't get a team!"
        })
    })
    ;
});

module.exports = router;


