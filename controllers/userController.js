
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({ email });
    if (user) {
        res.status(400)
        throw new Error("Email already registered.")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        _id: newUser.id,
        email: newUser.email
    })

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("email or password are mandatory")
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            "MYSECRETID",
            { expiresIn: "100m" }
        )

        res.status(200).json({ accessToken })
    }
    else {
        res.status(401);
        throw new Error("Mismatch email and password")
    }

})

const currentUser = asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(401);
        throw new Error("Unauthorized")
    }
 res.status(200).json(req.user)
})

module.exports = { registerUser, loginUser, currentUser };