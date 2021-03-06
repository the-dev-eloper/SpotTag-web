
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const userRouter = express.Router();
const myCodeSecret = process.env.JWT_SECRET;

userRouter.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash -password');
    res.send(userList);
});

userRouter.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash -password');

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ success: false, message: 'User not Found!'});
    }
});

userRouter.post(`/`, async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    newUser = await newUser.save();

    if(!newUser)
        return res.status(400).send('the user cannot be created!');

    res.send(newUser);
});

userRouter.put(`/:id`, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: req.body.passwordHash,
    });

    if(updatedUser) {
        res.status(200).send(updatedUser);
    } else {
        res.status(404).json({ success: false, message: 'User not Found!' });
    }
});

userRouter.delete(`/:id`, async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).send('Invalid User');

    User.findByIdAndDelete(req.params.id)
        .then((deletedUser) => {
            if(deletedUser) {
                return res.status(201).json({ success: true, message: 'Deleted Successfully' });
            } else {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        })
});

userRouter.post(`/login`, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return res.status(404).send('User not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            myCodeSecret,
            { expiresIn: '30d' }
        );

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        });
    } else {
        res.status(400).send('Incorrect Password');
    }
});

userRouter.post('/register', async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    });

    newUser = await newUser.save();

    if(!newUser)
        return res.status(400).send('the user cannot be created!');

    res.send(newUser);
});

userRouter.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments({})

    if(!userCount) {
        res.status(500).json({success: false})
    }

    res.send({ userCount: userCount });
});

module.exports = userRouter;
