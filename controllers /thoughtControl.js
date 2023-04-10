// Where CRUD requests for thoughts and reactions will go, unsure whether to include reactions here 
const { User, Thought } = require('../models');

module.exports = {

// get request to get all thoughts
    getAllThoughts(req,res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }, 

// get request to get just a single thought just by its _id
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        // version key, tracks the revisions on the documents
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No Thought found with this ID!" })
                : res.json(thought)
        )
        // catch the error is an error has occured
        .catch((err) => res.status(500).json(err));
    },

// post request to post a new thought to the thoughts 
    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

// put request to update a single thought 
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
          )
        .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(user)
        )
          .catch((err) => res.status(500).json(err));
    }, 

// delete request to delete a single thought 
    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Thought deleted, but no user found'})
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => res.status(500).json(err));
    }, 

// post request to create a reaction for a single thought going through thoughts to get reactions
    createReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },

// delete request to delete a reaction on a thought 
    deleteReaction(req,res) {
        Thought.findOneAndDelete(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
};