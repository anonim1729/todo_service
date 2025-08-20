import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '10m' })
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const signupUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(201).json({ email, token });
    } catch (err) {
        // console.log(err);
        res.status(400).json({ error: err.message });
    }
}