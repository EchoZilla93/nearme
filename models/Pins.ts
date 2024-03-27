import mongoose from 'mongoose';

const { Schema } = mongoose;

const pinSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type:String,
        required: true,
    },
    coords: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
}, { timestamps: true });

export default mongoose.models.Pin || mongoose.model('Pin', pinSchema);
