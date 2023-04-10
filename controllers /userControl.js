// where CRUD requests for users will go 
const { User, Thought } = require("../models");

module.export = { 

// get request for getting users
    getAllUsers(req,res) {
        User.find
    }, 

// get request for getting one user
    getOneUser(req,res) {
        User.findOne
    }, 

// post request for posting a new user
    createUser(req,res) {
        User.create
    }, 

// put request to update a user 
    updateUser(req,res) {
        User.findOneAndUpdate
    }, 

// delete request to delete a user
    deleteUser(req, res) {
        User.findOneAndDelete
    }
}