import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    make: { type: String },
    model: {type: String },
    year: { type: Number }
});

const exp = mongoose.model('Car', carSchema);

export default exp;