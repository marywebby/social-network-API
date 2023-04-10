// get requests from thoughts controller and place in here 
const router = require('express').Router();

// get all the requests into the routes file
const {
    getAllThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction, 
} = require('../../controllers/thoughtControl.js'); 

// route for getting all thoughts and posting a thought
// /api/thoughts
router.route('/').get(getAllThoughts)
.post(createThought);

// route for getting, updating, and deleting a single thought
// /api/thoughts/:thoughtid
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// route for creating a reaction 
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// route for deleting a reaction 
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
