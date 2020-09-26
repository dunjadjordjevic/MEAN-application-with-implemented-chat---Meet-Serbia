import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let SentMessage = new Schema({ sender: String, text: String});

let LogSchema = new Schema ({
    buyer : {
        type: String,
        default: ''
    },
    admin: {
        type: String,
        default: ''
    },
    dateAndTimeOfStart: {
        type: Date,
        default: Date.now
    },
    dateAndTimeOfEnd: {
        type: Date,
        default: undefined
    },
    // messages: //array of sent messages in this log conversation
    // {
    //     type: [SentMessage],
    //     default: []
    // }
    messages: 
    {
        type: [String],
        default: []
    }
});

const Log = module.exports = mongoose.model('Log', LogSchema);