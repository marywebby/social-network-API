// requring mongoose for schema and model
const { Schema, model } = require('mongoose');

// creating new shcema for users
const userSchema = new Schema(
{
    username: {
       type: String,
       unique: true,
       required: true,
       trim: true,
    },
    email: {
       type: String,
       unique: true,
       required: true,
    //    validating matching email using mongoose matching validation 
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
   ],
    friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
   ],
},
{
   toJSON: {
     virtuals: true,
   },
   id: false,
 }
);

// creating a virtual get method on users to retrieve data as an array
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });


const User = model('User', userSchema);
module.exports = User;