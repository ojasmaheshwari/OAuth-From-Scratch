const express = require('express')
const dotenv = require('dotenv')
const { connectDatabase } = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { googleOAuthHandler } = require('./controllers/session.controller')
const { fetchUserHandler } = require('./controllers/user.controller')

const app = express()
dotenv.config()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

connectDatabase()

app.get('/', (req, res) => {
    res.send("Application running")
})

app.get('/sessions/oauth/google', googleOAuthHandler);
app.get('/user', fetchUserHandler);

app.listen(7000, () => {
    console.log(`Server running at localhost:7000`)
})