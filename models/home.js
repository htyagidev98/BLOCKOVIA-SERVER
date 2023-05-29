const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const HomeSchema = new Schema({
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
HomeSchema.set("toObject", { virtuals: true });
HomeSchema.set("toJSON", { virtuals: true });

const Home = mongoose.model("Home", HomeSchema, "Home");
module.exports = Home;