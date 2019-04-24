const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb.js')

// Middleware 
const nameCheck = (req, res, next) => {
    const { name } = req.body;
    if (name[0] !== name[0].toUpperCase() ) {
      res.status(400).send('Please capitalize the first letter of your name')
    } else {
      next();
    }
  };

//Gets all Users
router.get('/', (req, res) => {
    db.get().then(user => {
        res.status(200).json(user)
    }).catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved"})
    })
})

//Create user
router.post('/', nameCheck, (req,res) => {
    const { name } = req.body
    if(!name){
        res.status(400).json({ message: "Please provide a name for this user"})
    }
    db.insert({ name }).then(user =>{
        res.status(201).json({user})
    }).catch( error => {
        res.status(500).json({ error: "There was an error creating the user"})
    })
})

// Gets user by ID
router.get('/:id', (req,res) => {
    const { id }= req.params;
    db.getById(id).then(user => {
        if(user.length === 0){
            res.status(400).json({ message: "The User with the specified ID does not exist"})
        }
        res.status(200).json({user})
    }).catch(error => {
        res.status(500).json({ error: 'The user information could not be retrieved'})
    })
})


//Update User 
router.put('/:id', nameCheck, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.update(id, { name }).then(user =>{
        if(user === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
        if(!name){
            res.status(400).json({ message: "Please provide a name for the user"})
        }
        res.status(200).json({user})
    }).catch(error => {
        res.status(500).json({ error: "The user information could not be modified"})
    })
})

//Remove User
router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.remove(id).then(user => {
        if(user === 0){
            res.status(404).json({ message: "The user you are trying to delete does not exist"})
        }
        res.status(204).end();
    }).catch(error => {
        res.status(500).json({error: "There was an error deleting the user"})
    })
})

// Get all posts by user
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.getUserPosts(id).then(userPosts => {
        if(userPosts === 0){
            res.status(404).json({message: "There are no posts by this user"})
        }
        res.status(200).json(userPosts)
    }).catch(error => {
        res.status(500).json({error: "Error getting users posts"})
    })
})


module.exports = router;