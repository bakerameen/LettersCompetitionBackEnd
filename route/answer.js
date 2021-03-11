

const express = require('express');
const router = express.Router();


const Answer = require('../models/answer');
const checkAuth = require('../middleware/check-auth');


// Add Answer clicked info
router.post('', checkAuth, (req, res, next) => {
    const answer = new Answer({
        userName: req.body.userName,
        userCliceked: req.body.userCliceked
    });

    answer.save().then(createdAnswer => {

        res.status(200).json({
            message: 'answer clicked!',
            answeredId: createdAnswer._id
        })
    })
        .catch(error => {

            res.status(500).json({
                message: "Can't create answer!",
            })
        })
})


// get answer clicked info

router.get('', (req, res, next) => {
    Answer.find().then(documents => {

        res.status(200).json({
            message: 'Answers featched successfully!',
            answer: documents
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't get Answer!"
            })
        })
        ;
})

// update answer clicked info

router.put('/admin/:id', (req, res, next) => {
    const answer = new Answer({
        _id: req.body._id,
        userName: req.body.userName,
        userCliceked: req.body.userCliceked
    })

    Answer.updateOne({ _id: req.params.id }, answer).then(result => {
        res.status(200).json({
            message: 'answer Released successfully!',
            userName: answer.userName

        })
    })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't release the answer!"
            })
        })
        ;

})


router.put('/:id', (req, res, next) => {  

    const answer = new Answer({
        _id: req.body._id,
        userName: req.body.userName,
        userCliceked: req.body.userCliceked
    });
    
    Answer.find({}, ['userCliceked', 'userName'], function (err, docs) {
        docs.map(doc => {
         
            const clicked = doc.userCliceked;
            const answerName = doc.userName;
            if (clicked === false) {
                Answer.updateOne({ _id: req.params.id }, answer).then(result => {
                   
                    res.status(200).json({
                        message: 'answer clicked successfully!'                       
                    })
                })
                    .catch(error => {
                        res.status(500).json({
                            message: "Couldn't click the answer!"
                        })
                    })
                    ;               

            } else if (clicked === true) {
             
                res.status(200).json({
                    message: "answer already clicked!",
                    usename: answerName
                })

            } else {
                console.log('No clicke return')
            }

        }

        )


       
    })





})


module.exports = router;