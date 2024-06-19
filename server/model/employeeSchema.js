const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    gender: String,
    salary: Number
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
