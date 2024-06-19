import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/createEmployee", { name, gender, salary })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">       
        <form onSubmit={handleSubmit}>
          <h1>New Employee</h1>
          <div className="mb-3">
            <label htmlFor="employeeName" className="form-label">Employee Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="employeeName" 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="gender"
                onClick={() => setGender("Male")}
                id="male"
              />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="radio" 
                name="gender" 
                onClick={() => setGender("Female")}
                id="female"
              />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">Salary</label>
            <input 
              type="text" 
              className="form-control" 
              id="salary" 
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter your salary"
            />
          </div>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
