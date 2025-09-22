import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true,
    },
    status:{
       type:String,
       enum:["booked", "cancel"],
       default:"booked"
    },
});
