// creating the thought model
// require mongoose 
const { Schema, model } = require('mongoose');

// creating a new schema for thoughts 
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        // reations are created as arrays 
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// creating a virtual for reactionCount that will retrieve the length of the thought reactions as a array field upon query 
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// creating a new schema for reactions 
const reactionSchema = new Schema(
    {
        reactionId : {
            type: Schema.Type.ObjectId,
            default: () => new Types.ObjectId(),
          },
        responseBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);


const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema);
module.exports =  Thought, Reaction ;