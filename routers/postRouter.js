const express = require('express');
const router = express.Router();
const db = require('../data/helpers/postDb.js')

//Gets all Posts
router.get('/', (req, res) => {
    db.get().then(post => {
        res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved"})
    })
})

//Get a post by ID
router.get('/:id', (req,res) => {
    const { id } = req.params;
    db.getById(id).then(post =>{
        if(post === 0){
            res.status(404).json({ message: "The post with this ID does not exist"})
        }
        res.status(200).json({post})
    }).catch(error => {
        res.status(500).json({ error: "There was an error getting the post with that specified ID"})
    })
})

//Update a post
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { text, user_id } = req.body;
    db.update(id, { text, user_id }).then(post => {
        if(post === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
        if(!text){
            res.status(400).json({ errorMessage: "Please provide text for this post"})
        }
        res.status(200).json(post)
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be modified."})
    })
})

// //Create a post
// router.post('/', (req, res) => {
//     const { text, user_id} = req.body;
//     if(!text || !user_id){
//         res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
//     }
//     db.insert({text, user_id}).then(post => {
//         res.status(201).json({post})
//     }).catch(error => {
//         res.status(500).json({error: "There was an error while saving the post to the database"})
//     })
// })

//Delete a post
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(post => {
        if(post === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        res.status(204).end();
    }).catch(error => {
        res.status(500).json({ error: "The post could not be removed" })
    })
})


module.exports = router;