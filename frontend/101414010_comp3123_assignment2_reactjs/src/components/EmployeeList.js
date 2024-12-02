import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/emp/employees', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees');
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleEdit = async (id, updatedEmployee) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/emp/employees/${id}`,
        updatedEmployee,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setEmployees(
        employees.map((employee) =>
          employee._id === id ? { ...employee, ...updatedEmployee } : employee
        )
      );
      setEditingEmployee(null); // Close the form after editing
      alert('Employee updated successfully');
    } catch (error) {
      alert('Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(employees.filter((employee) => employee._id !== id)); // Remove employee from state
    } catch (error) {
      alert('Failed to delete employee');
    }
  };

  const handleSelectEmployeeForView = (employee) => {
    setSelectedEmployee(employee); // Set employee for viewing
    setEditingEmployee(null); // Clear edit mode
  };

  const handleSelectEmployeeForEdit = (employee) => {
    setEditingEmployee(employee); // Set employee for editing
    setSelectedEmployee(null); // Clear view mode
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        Logout
      </button>
      <h2 style={{ textAlign: 'center', color: '#333', marginTop: '0' }}>Employee List</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search by Department or Position"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            marginBottom: '20px',
            width: '250px',
          }}
        />
      </div>

      <Link to="/add-employee">
        <button
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'block',
            margin: '20px auto',
          }}
        >
          Add New Employee
        </button>
      </Link>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Position</th>
            <th style={{ padding: '10px' }}>Department</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td style={{ padding: '10px' }}>{employee.first_name} {employee.last_name}</td>
              <td style={{ padding: '10px' }}>{employee.email}</td>
              <td style={{ padding: '10px' }}>{employee.position}</td>
              <td style={{ padding: '10px' }}>{employee.department}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleSelectEmployeeForView(employee)}
                  style={{
                    backgroundColor: '#FFD700',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '5px',
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => handleSelectEmployeeForEdit(employee)}
                  style={{
                    backgroundColor: '#FFA500',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '5px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  style={{
                    backgroundColor: '#FF6347',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Employee Details */}
      {selectedEmployee && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ marginTop: '0' }}>Employee Details</h3>
          <p><strong>Name:</strong> {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Position:</strong> {selectedEmployee.position}</p>
          <p><strong>Department:</strong> {selectedEmployee.department}</p>
          <button
            onClick={() => setSelectedEmployee(null)}
            style={{
              backgroundColor: '#FF6347',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Close View
          </button>
        </div>
      )}

      {/* Edit Employee Details */}
      {editingEmployee && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ marginTop: '0' }}>Edit Employee</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedEmployee = {
                first_name: e.target.first_name.value,
                last_name: e.target.last_name.value,
                email: e.target.email.value,
                position: e.target.position.value,
                department: e.target.department.value,
              };
              handleEdit(editingEmployee._id, updatedEmployee);
            }}
          >
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              defaultValue={editingEmployee.first_name}
              style={{ padding: '10px', margin: '10px', borderRadius: '5px', width: '100%' }}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              defaultValue={editingEmployee.last_name}
              style={{ padding: '10px', margin: '10px', borderRadius: '5px', width: '100%' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={editingEmployee.email}
              style={{ padding: '10px', margin: '10px', borderRadius: '5px', width: '100%' }}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              defaultValue={editingEmployee.position}
              style={{ padding: '10px', margin: '10px', borderRadius: '5px', width: '100%' }}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              defaultValue={editingEmployee.department}
              style={{ padding: '10px', margin: '10px', borderRadius: '5px', width: '100%' }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Update Employee
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
