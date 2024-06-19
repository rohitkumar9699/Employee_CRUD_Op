import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]); // State to store the list of employees

    useEffect(() => {
        // Fetch the list of employees from the backend
        axios.get("http://localhost:9000")
            .then(result => {
                console.log(result.data);
                setEmployees(result.data); // Update the state with fetched data
            })
            .catch(err => console.log(err)); // Log any errors to the console
    }, []);

    const handleDelete = (id) => {
        axios
            .delete("http://localhost:9000/deleteEmployee/" + id)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(err => {console.log(err)});
    };
    
    return (
        <div className='d-flex vh-100 justify-content-center bg-secondary'>
            <div className="w-30 bg-white rounded p-3">
                <Link to='/create' className='btn btn-success mb-3'>Add</Link>
                <table className='table '>
                    <thead>
                        <tr className='me-5'>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}> 
                                <td>{employee.name}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <Link to={`/update/${employee._id}`} className='btn btn-success me-2'>Update</Link>
                                    
                                    <button className='btn btn-danger' onClick={() => handleDelete(employee._id)}>Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
