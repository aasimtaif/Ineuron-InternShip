
import e from "express";
import { usersModel } from "../Model/User.model.js";
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
        console.log(user)
        if (!user) {
            res.status(400).json({ error: 'User not found' });
        } else {
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({ error: 'Invalid password' });
            } else {
                user.password = '';
                res.json(user);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
