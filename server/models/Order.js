import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    quantity: Number,
    price: Number,
    size: String
}, { _id: false });  // Onemogućava _id polje

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    message: { type: String },
    items: [itemSchema],  // koristi itemSchema ovdje
    totalPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
