import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export async function fetchUserHandler(req, res) {
    // Verify JWT token
    // Doing this as a middleware is a better practice, but doing here for simplicity
    try {
        const token = req.cookies.jwt;

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user_id = decoded.user_id;

        const user = await UserModel.findById(user_id);

        console.log(user)
        res.json(user)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error : 'Internal Server Error'});
    }
}