import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: validator.isStrongPassword,
            message: 'Password is weak (try including atleast one uppercase,lowercase ,special character,number in your password)'
        }
    }
});

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Email does not exist please signup');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
}

// Static signup method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email format');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is weak (try including atleast one uppercase,lowercase ,special character,number in your password)908');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}

export const User = mongoose.model('User', userSchema);
