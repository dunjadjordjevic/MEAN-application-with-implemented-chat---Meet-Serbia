import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ProductAdSchema = new Schema ({
    nameOfAd : {
        type: String,
        required: true
    },
    ownerUsername : {
        type: String,
        required: true
    },
    typeOfProduct: {
        type: [String],
        default: [],
        required: true
    },
    price: {
        type: Number,
        default: 0.0,
        required: true
    },
    structureOfProduct: {
        type: String,
        default:""
    },
    weight: {
        type: Number,
        default: 0.0
    },
    description: {
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

const ProductAd = module.exports = mongoose.model('ProductAd', ProductAdSchema);