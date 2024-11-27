import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    due:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        required: true
    },
    userId:{
        type: String,
        require: true,
    }
});

export default mongoose.model("Task", taskSchema);
