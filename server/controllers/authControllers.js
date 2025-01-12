const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}


//register endpoint
const registerUser = async (req, res) => {
    try {
        const {username,email,password} = req.body;
        // Check if name was entered
        if(!username) {
            return res.json({
                error: 'Username is required'
            })
        };
        //check if password is good
        if(!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be atleast 6 characters long'
            })
        };
        //check email
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }
        
        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.json(user)
     } catch (error) {
        console.log(error)       
    }
}

//login endpoint
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }

        //check if passwords match
        const match = await comparePassword(password, user.password)
        if (match) {
                jwt.sign({email: user.email, id: user._id, username: user.username},process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: 'Passwords do not match'
            })
        }
    } catch(error){
        console.log(error)

    }
}

const getProfile = (req, res) => {
const {token} = req.cookies
if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else {
    res.json(null)
}
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}