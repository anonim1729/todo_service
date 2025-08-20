import { Task } from "../models/Task.js";
import mongoose from "mongoose";

export const getAllTasks = async (req, res) => {
    const user_id = req.user;
    try {
        const response = await Task.find({ userId: user_id });
        // console.log(response);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const getSingleTask = async (req, res) => {
    const user_id = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Task' });
    }

    try {
        const task = await Task.findOne({ _id: id, userId: user_id });

        if (!task) {
            return res.status(404).json({ error: 'No such Task' });
        }

        res.status(200).json({ data: task });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const addTask = async (req, res) => {
    const user_id = req.user;
    try {
        const response = await Task.create({ ...req.body, userId: user_id });
        res.status(201).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json('No such Task');
        }
        const response = await Task.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true })
        if (!response) {
            return res.status(404).json('No such Task');
        }
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json('No such Task');
        }
        const response = await Task.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json('No such Task');
        }
        res.status(204).json({ data: {} })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}