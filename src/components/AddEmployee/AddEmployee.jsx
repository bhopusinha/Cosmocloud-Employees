import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        address: {
            line1: '',
            city: '',
            country: '',
            zip: '',
        },
        contactMethod: { contact_method: 'EMAIL', value: '' },
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            address: {
                ...employee.address,
                [name]: value,
            },
        });
    };

    const handleContactMethodChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            contactMethod: {
                ...employee.contactMethod,
                [name]: value,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "projectId": "66a9f99239e2fdc09bbba16e",
                    "environmentId": "66a9f99239e2fdc09bbba16f"
                }
            }
            const response = await axios.post(`https://free-ap-south-1.cosmocloud.io/development/api/testdb`, employee, config);
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2 className="heading">Add Employee</h2>
            <label className="label">
                Name:
                <input type="text" name="name" value={employee.name} onChange={handleChange} required className="input" />
            </label>
            <h3 className="address">Address:</h3>
            <div className="address-div">
                <label className="label">
                    Line 1:
                    <input type="text" name="line1" value={employee.address.line1} onChange={handleAddressChange} required className="input" />
                </label>
                <label className="label">
                    City:
                    <input type="text" name="city" value={employee.address.city} onChange={handleAddressChange} required className="input" />
                </label>
                <label className="label">
                    Country:
                    <input type="text" name="country" value={employee.address.country} onChange={handleAddressChange} required className="input" />
                </label>
                <label className="label">
                    Zip Code:
                    <input type="text" name="zip" value={employee.address.zip} onChange={handleAddressChange} required className="input" />
                </label>
            </div>
            <h3 className="address">Contact Methods:</h3>
            <div className="contact-method">
                <label className="label">
                    Method:
                    <select name="contact_method" value={employee.contactMethod.contact_method} onChange={handleContactMethodChange} className="input">
                        <option value="EMAIL">Email</option>
                        <option value="PHONE">Phone</option>
                    </select>
                </label>
                <label className="label">
                    Value:
                    <input type="text" name="value" value={employee.contactMethod.value} onChange={handleContactMethodChange} required className="input" />
                </label>
            </div>
            <button type="submit" className="form-button">Add Employee</button>
        </form>
    );
};

export default AddEmployee;
