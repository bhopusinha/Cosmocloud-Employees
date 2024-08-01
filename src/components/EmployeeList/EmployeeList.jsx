import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "projectId": "66a9f99239e2fdc09bbba16e",
          "environmentId": "66a9f99239e2fdc09bbba16f"
        }
      }
      const { data } = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/testdb?limit=10&offset=0', config);
      setEmployees(data.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const config = {
        headers: {
          "projectId": "66a9f99239e2fdc09bbba16e",
          "environmentId": "66a9f99239e2fdc09bbba16f"
        },
        data: {}
      }
      await axios.delete(`https://free-ap-south-1.cosmocloud.io/development/api/testdb/${id}`, config);
      fetchData();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  if (employees.length === 0) {
    return (
      <div className="emp-cotainer">
        <button className="add-button" onClick={() => navigate('/add')}>Add Employee</button>
        <p className="no-employees">No Employees in the system.</p>
      </div>
    );
  }

  return (
    <div className="emp-cotainer">
      <button className="add-button" onClick={() => navigate('/add')}>Add Employee</button>
      <h2 className="heading">Employees List</h2>
      <ul className="emp-list">
        {employees.map(employee => (
          <li key={employee._id} className="emp-item">
            <span className="emp-name">{employee.name}</span> (Emp_ID: {employee._id})
            <button className="delete-button" onClick={() => deleteEmployee(employee._id)}>Delete</button>
            <Link className="details-link" to={`/employees/${employee._id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
