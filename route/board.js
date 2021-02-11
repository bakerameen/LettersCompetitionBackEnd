const express = require('express');
const router = express.Router();


const Board = require('../models/board');
const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, (req, res, next) => {
    console.log(req.body);
     const board = new Board({
         letter: req.body.letter,
         color: req.body.color,
         fontcolor: req.body.fontcolor 
     });
    board.save().then(createdBoard => {
      res.status(201).json({
          message: 'Letter Created Successfully!',
          boardId: createdBoard._id          
      })
    })

    .catch( error => {
        res.status(500).json({
            message: 'Creating a Letter failed!'
        })
    })

})

router.get('', checkAuth, (req, res, next) => {
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




// update data
router.put('/:id', checkAuth, (req, res, next) => {
    const board = new Board({
        _id: req.body.id,
        letter: req.body.letter,
        color: req.body.color,
        fontcolor: req.body.fontcolor
    });
    Board.updateOne({_id: req.params.id}, board).then( result => {
   
        res.status(200).json({message: 'board Item updatated successfully!'})
    })
    .catch(error => {
        res.status(500).json({
            message: "Couldn't update a board item!"
        })
    })
    ;
})

// update data
router.put('', checkAuth, (req, res, next) => {
    console.log(req.body.color)
    Board.updateMany({color: ['green', 'red']},  
        {color:"#bebebe"}, function (err, docs) { 
            console.log(docs);
        if (err){ 
            res.status(500).json({
                message: "Couldn't update a board item!",
            
            })
        } 
        else{ 
            res.status(200).json({message: 'board Item updatated successfully!'})
            console.log("Updated Docs : ", docs); 
        } 
    }); 

    

})

module.exports = router;