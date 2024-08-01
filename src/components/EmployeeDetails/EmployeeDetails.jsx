import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EmployeeDetails.css'; 

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchDetail = async () => {
        try {
            const config = {
                headers: {
                    "projectId": "66a9f99239e2fdc09bbba16e",
                    "environmentId": "66a9f99239e2fdc09bbba16f"
                }
            }
            const { data } = await axios.get(`https://free-ap-south-1.cosmocloud.io/development/api/testdb/${id}`, config);
            if (data) {
                setEmployee(data);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log("ERROR", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [id]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">Employee not found.</p>;
    }

    return (
        <div className="container">
            <div className="card">
                <h2 className="heading">Employee Details</h2>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Emp_ID:</strong> {employee._id}</p>
                <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
                <h3 className="contact">Contact Methods:</h3>
                <ul className="list">
                    <li>{employee.contactMethod.contact_method}: {employee.contactMethod.value}</li>
                </ul>
            </div>
        </div>
    );
};

export default EmployeeDetails;
