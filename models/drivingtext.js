const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const DrivingTextSchema = new Schema({
    title: {
        type: String,
        required: false,
        default: ""
    },
    paragraph: {
        type: String,
        required: false,
        default: ""
    },

}, { timestamps: true, toJSON: true }
);
DrivingTextSchema.set("toObject", { virtuals: true });
DrivingTextSchema.set("toJSON", { virtuals: true });

const DrivingText = mongoose.model("Drivingtext", DrivingTextSchema, "Drivingtext");
module.exports = DrivingText;