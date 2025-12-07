const express = require('express');
const { 
    createUser, 
    loginUser, 
    getUserProfile, 
    updateUser, 
    deleteUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById 
} = require('../controller/UserController');
const authMiddleware = require('../middleware/AuthMiddleware');
const router = express.Router();

// Routes
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUserProfile);
router.put('/update', authMiddleware, updateUser);
router.delete('/delete', authMiddleware, deleteUser);
router.get('/all', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUserById);
router.delete('/:id', authMiddleware, deleteUserById);

// Export the router
module.exports = router;


