const User = require('./userModel');
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.status(201).send({message: "a user has been created"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});    
    }
};

exports.readUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({users: users});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});    
    }
};

exports.updateUser = async (req, res) => {
    try {
        const users = await User.updateOne(
            {username: req.body.username}, 
            {[req.body.key]:req.body.value}
        );
        res.status(201).send({message: "user has been updated"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});    
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({username: req.body.username});
        res.status(200).send({message: "user has been deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});    
    }
};

exports.loginUser = async (req, res) => {
    console.log("middleware passed");
    console.log("controller has been called");
    try {
        const user = await User.findOne({username: req.body.username});
        const token = await jwt.sign({_id: user._id }, process.env.SECRET);
        //secret password added in .env file/additional security to user password
        console.log(token);
        console.log(user);
        console.log("username found in database");
        res.status(200).send({username: user.username, token});
    } catch (error) {
        console.log(error);
        console.log("username not found");
        res.status(500).send({error: error.message});    
    }
};

