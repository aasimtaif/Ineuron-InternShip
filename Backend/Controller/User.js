
import { prisma } from "../config/prisma.config.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
    const { password, ...details } = req.body;
    console.log(password, details)
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    try {
        const user = await prisma.user.create({
            data: {
                ...details,
                password: hashpassword
            }
        });

        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error creating user', error });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
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
