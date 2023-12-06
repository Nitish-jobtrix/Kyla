//these routes are for recruiter authentications

const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// /api/signup-----signup route for the recruiter
router.post('/signup', signup); 

// /api/signin-----login route for the recruiter
router.post('/signin', signin);

// /api/logout----logout route
router.get('/logout', logout);

// /api/me--------route to get recruiter profile 
router.get('/me', isAuthenticated, userProfile);

module.exports = router;