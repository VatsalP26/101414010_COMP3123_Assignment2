const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth'); // Importing authentication middleware
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

// Employee routes with JWT authentication
router.get('/employees', authenticate, getAllEmployees); // Only authenticated users can access
router.post('/employees', authenticate, createEmployee); // Only authenticated users can create
router.get('/employees/:eid', authenticate, getEmployeeById); // Only authenticated users can access
router.put('/employees/:eid', authenticate, updateEmployee); // Only authenticated users can update
router.delete('/employees/:eid', authenticate, deleteEmployee); // Only authenticated users can delete

module.exports = router;
