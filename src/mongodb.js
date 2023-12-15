const mongoose = require('mongoose')

//database name AdminLogin
mongoose.connect("mongodb://localhost:27017/AdminLogin")

    .then(() => {
        console.log("MongoDB Connected Successfully");
    })

    .catch(() => {
        console.log("MongoDB Connection Failed");
    })

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const SlotBooking = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    selectedSlot: {
        type: String,
        required: true,
    },
    upiTransactionId: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBooking: {
        type: String,
        required: true
    },
    selectedTurfGround: {
        type: String,
        required: true
    }

})
SlotBooking.index({ selectedTurfGround: 1, selectedSlot: 1 }, { unique: true });
const slotbooking1 = new mongoose.model("SlotBookings", SlotBooking);
const login1 = new mongoose.model("AdminLogin1", AdminSchema);
module.exports = {
    login1,
    slotbooking1
}