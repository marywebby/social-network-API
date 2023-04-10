// Where CRUD requests for thoughts and reactions will go, unsure whether to include reactions here 
const { User, Thought, Reactions } = require('../models');

module.exports = {

// get request to get all thoughts
    getAllThought(req,res) {
        Thought.find
    }, 

// get request to get just a single thought just by its _id
    getSingleThought(req,res) {
        Thought.findOne
    },

// post request to post a new thought to the thoughts 
    createThought(req,res) {
        Thought.create
    },

// put request to update a single thought 
    updateThought(req,res) {
        Thought.findOneAndUpdate 
    }, 

// delete request to delete a single thought 
    deleteThought(req,res) {
        Thought.findOneAndDelete
    }, 

// post request to create a reaction for a single thought going through thoughts to get reactions
    createReaction(req,res) {
        Thought.findOneAndUpdate
    },

// delete request to delete a reaction on a thought 
    deleteReaction(req,res) {
        Thought.findOneAndDelete
    }
}