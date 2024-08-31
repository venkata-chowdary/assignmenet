const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const generateToken = require('../config/generatetoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');

const { bucket } = require('../config/firebaseConfig');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();


router.post('/login', 
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            return res.status(200).json({
                message: 'User logged in successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        } else {
            return res.status(401).json({ message: 'Incorrect credentials' });
        }
    }
);


router.post('/signup', 
    upload.single('resume'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('dateOfBirth').isDate().withMessage('Please enter a valid date of birth'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('linkedIn').optional().isURL().withMessage('LinkedIn URL is invalid'),
    body('github').optional().isURL().withMessage('GitHub URL is invalid'),
    body('skills').notEmpty().withMessage('Skills are required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            email,
            password,
            address,
            phone,
            dateOfBirth,
            gender,
            linkedIn,
            github,
            skills,
        } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            let resumeUrl = '';
            if (req.file) {
                const file = req.file;
                const fileName = `${Date.now()}_${file.originalname}`;
                const fileRef = bucket.file(`resumes/${fileName}`);

                await fileRef.save(file.buffer, {
                    metadata: {
                        contentType: file.mimetype,
                        cacheControl: 'public, max-age=31536000', // Make the file cacheable
                    },
                });
                await fileRef.makePublic();

                resumeUrl = `https://storage.googleapis.com/${bucket.name}/resumes/${fileName}`;
            } else {
                return res.status(400).json({ error: 'Resume file is required' });
            }

            const newUser = await User.create({
                name,
                email,
                password, 
                resume: resumeUrl,
                address,
                phone,
                dateOfBirth,
                gender,
                linkedIn,
                github,
                skills: JSON.parse(skills),
            });

            return res.status(201).json({
                message: "User created successfully",
                data: {
                    name: newUser.name,
                    _id: newUser._id,
                    email: newUser.email,
                    token: generateToken(newUser._id),
                },
            });
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ error: 'Signup failed' });
        }
    }
);

router.get('/getdetails', authMiddleware, (req, res) => {
    const userId = req.user._id;
    User.findById(userId).select('-password')
        .then((userDetails) => {
            if (!userDetails) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(userDetails);
        })
        .catch((error) => {
            console.log('Error fetching user details:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;
