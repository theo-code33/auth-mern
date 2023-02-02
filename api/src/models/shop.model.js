const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true
    },
    imgUrl: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Shop', shopSchema);