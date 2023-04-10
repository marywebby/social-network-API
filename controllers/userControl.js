// where CRUD requests for users will go 
const { User, Thought } = require("../models");

module.exports = { 

// get request for getting users
    getAllUsers(req,res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    }, 

// get request for getting one user
    getOneUser(req,res) {
        User.findOne({_id: req.params.userId})
        // version key, tracks the revisions on the documents
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: "No user found with this ID!" })
                : res.json(user)
        )
        // catch the error is an error has occured
        .catch((err) => res.status(500).json(err));
    }, 

// post request for posting a new user
    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    }, 

// put request to update a user 
    updateUser(req,res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    }, 

// delete request to delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: "No User found with this ID!" })
            // deleting the thoughts associated with the user
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: "User and user's thoughts deleted!" }))
        .catch((err) => res.status(500).json(err));
    }, 

// adding a friend to the user
    addFriend(req,res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
        )
      .catch((err) => res.status(500).json(err));
    }, 

// deleting a friend from the user
    deleteFriend(req,res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true } 
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
        )
      .catch((err) => res.status(500).json(err));
    },
}