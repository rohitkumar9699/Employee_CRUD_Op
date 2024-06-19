import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    salary: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the existing employee data by ID
    axios.get(`http://localhost:9000/employees/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:9000/updateEmployee/${id}`, formData)
      .then(response => {
        console.log('Success:', response.data);
        navigate('/'); // Redirect to root on successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <div className="bg-secondary d-flex vh-100 justify-content-center align-items-center">
      <div className="p-4 bg-light rounded">
        <h1 className="mb-4 text-center">Update Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="Male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput2"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter Your Salary..."
            />
          </div>

          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
