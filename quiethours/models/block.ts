import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    title:{
        type:String,
        required:true
    },
    startTime:{ 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    reminderSent: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.models.Block || mongoose.model("Block", BlockSchema);
