import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const USER_TYPES = ["ADMIN", "BUYER", "SELLER"];

let UserSchema = new Schema ({
    name : {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    occupation:{
        type: String
    },
    contactTelephone: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    gender:{
        type: String,
        default: ''
    },
    typeOfUser:{
        type: String
    },
    profilePicture: {
        type: String, 
        required: true
    }
});

// module.exports = {
//     USER_TYPES: USER_TYPES,
//     User: mongoose.model("User", UserSchema),
//     UserSchema: UserSchema
//   };

const User = module.exports = mongoose.model('User', UserSchema);