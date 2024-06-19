const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./model/employeeSchema'); // Ensure this path is correct

const connectionString = "mongodb://localhost:27017/srmap";
const PORT = process.env.PORT || 9000;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    Employee.find({})
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
});

app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    Employee.findById(id)
        .then(employee => {
            if (!employee) {
                return res.json({ error: "Employee not found" });
            }
            res.json(employee);
        })
        .catch(err => res.json({ error: err.message }));
});

app.post('/createEmployee', (req, res) => {
    Employee.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json({ error: err.message }));
});

app.put('/updateEmployee/:id', (req, res) => {
    const { id } = req.params;
    Employee.findByIdAndUpdate(id, req.body)
        .then(employee => {
            if (!employee) {
                return res.json({ error: "Employee not found" });
            }
            res.json(employee);
        })
        .catch(err => res.json({ error: err.message }));
});


app.delete('/deleteEmployee/:id', (req, res) => {
    const id = req.params.id; // Extract the id from request parameters
    Employee.findByIdAndDelete(id) // Use findByIdAndDelete to delete the employee
        .then(result => {
            if (result) {
                res.json({ message: 'Employee deleted successfully', result });
            } else {
                res.json({ message: 'Employee not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
