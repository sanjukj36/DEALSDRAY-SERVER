const mongoose = require("mongoose");
const validator = require("validator");

const t_EmployeeSchema = new mongoose.Schema({
    f_Id: {
        type: String,
        required: true
    },
    f_Image: {
        type: String,
        required: false,
    },
    f_Name: {
        type: String,
        required: true,

    },
    f_Email: {
        type: String,
        required: true,
        unique: true,
    },
    f_Mobile: {
        type: Number,  // Changed to String
        required: true,
    },
    f_Designation: {
        type: String,
        required: true
    },
    f_Gender: {
        type: String,
        required: true
    },
    f_Course: {
        type: [String],  // Changed to array of strings
        required: true
    },
    f_Createdate: {
        type: String,
        required: true
    }
});




const t_Employee = mongoose.model("t_Employee", t_EmployeeSchema);

module.exports = t_Employee;
