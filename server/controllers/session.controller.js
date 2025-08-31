import axios from "axios";
import { getGoogleOAuthTokens } from "../services/user.service.js";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/user.model.js";

export async function googleOAuthHandler(req, res) {
    try {
        // Get the code from query string
        const code = req.query.code;

        // Get the id and access token with the code
        const {id_token, access_token} = await getGoogleOAuthTokens(code);

        // Get user with access token
        const googleUser = jwt.decode(id_token) 

        // Check if email is verified
        if (!googleUser.email_verified) {
            console.log(googleUser)
            return res.status(403).send({ error : "Google account is not verified"})
        }

        // Upsert the user
        const user = await findAndUpdateUser({
            email: googleUser.email
        },{
            email: googleUser.email,
            full_name: googleUser.name,
            profile_picture: googleUser.picture
        }, {
            upsert: true,
            new: true
        })

        console.log(user)

        // Create JWT token
        const token = jwt.sign({
            user_id: user._id
        }, process.env.JWT_SECRET);

        // Set cookies
        res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: process.env.ENVIRONMENT === "PROD" ? true : false,
            sameSite: 'strict'
        })

        // Redirect back to client
        return res.redirect(`${process.env.FRONTEND_URL}`)
    } catch (err) {
        console.error(err);
        return res.json({error : 'Internal Server Error'})
    }
}

export async function getGoogleUser(id_token, access_token) {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?
            alt=json&access_token=${access_token}`, {
                headers: {
                    'Authorization': `Bearer ${id_token}`
                }
            })
        
        return res.data;
    } catch (err) {
        console.error(`Error fetching Google user: ${err}`);
    }
}

export async function findAndUpdateUser(filterQuery, updateQuery, options) {
    return UserModel.findOneAndUpdate(filterQuery, updateQuery, options);
}