// get requests from user controllers and place in here 
const router = require('express').Router();

// get all the requests into the routes file
const {
    getAllUsers, 
    getOneUser,
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend,
    deleteFriend
} = require ('../../controllers/userControl'); 

// route for getting all users and creating a new user
// /api/users
router.route('/').get(getAllUsers)
.post(createUser);

// route for getting, updating, and deleting a single user
// /api/users/:userid
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

// route for adding and delteing friends to the user
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router