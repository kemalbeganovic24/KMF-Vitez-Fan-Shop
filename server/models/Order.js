import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number,
    size:String
},{ _id:false });

const orderSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    city:String,
    message:String,
    items:[itemSchema],
    totalPrice:Number,
    createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("Order", orderSchema);
