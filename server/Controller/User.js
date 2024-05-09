

import { usersModel } from "../Model/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    const { password, ...details } = req.body;
    console.log(password, details)
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    try {
        const user = await usersModel.create({
            ...details,
            password: hashpassword
        });
        console.log(user)
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating user', error });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await usersModel.findOne({
            email
        });
        if (!user) {
            res.status(400).json({ error: 'User not found' });
        } else {
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({ error: 'Invalid password' });
            } else {
                const token = jwt.sign(
                    { id: user._id, isAdmin: user.isAdmin },
                    process.env.JWT
                );

                const { _doc: { password, isAdmin, ...details }, ...otherDetails } = user;
                console.log(password, isAdmin, details)
                res
                    .status(200)
                    .json({ details: { ...details,isAdmin },  token });
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.find();
        const userDetails = users.map((user) => {

            const { password, ...details } = user._doc;
            return details;
        })
        // console.log(userDetails)
        res.status(200).json(userDetails);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await usersModel.findById(req.params.id);
        const { password, ...details } = user._doc;
        res.json(details);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const UpdateUser = async (req, res) => {
    try {
        const user = await usersModel.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        await usersModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}