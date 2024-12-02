import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/v1/emp/employees',
        { first_name: firstName, last_name: lastName, email, position, department, salary },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Employee added successfully');
      navigate('/employees');
    } catch (error) {
      alert('Failed to add employee');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f7f7f7' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>Add New Employee</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '20px', boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={{ padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', width: '100%' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
