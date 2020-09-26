import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let AccommodationAdSchema = new Schema ({
    nameOfAd : {
        type: String,
        required: true
    },
    ownerUsername : {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    typeOfAccommodation: {
        type: [String],
        default: [],
        required: true
    },
    typeOfService:{
        type: [String],
        default: [],
        required: true
    },
    equipment: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        default: 0.0,
        required: true
    },
    description:{
        type: String,
        default: ''
    },
    pictureOfAd: {
        type: String,
        default: '',
        required: true
    },
    dateOfPost: {
        type: String,
        default: '',
        required: true
    },
    approvedByAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

const AccommodationAd = module.exports = mongoose.model('AccommodationAd', AccommodationAdSchema);