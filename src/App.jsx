import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList/EmployeeList.jsx';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails.jsx';
import AddEmployee from './components/AddEmployee/AddEmployee.jsx';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<EmployeeList/>} />
          <Route path="/employees/:id" element={<EmployeeDetails/>} />
          <Route path="/add" element={<AddEmployee/>} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
