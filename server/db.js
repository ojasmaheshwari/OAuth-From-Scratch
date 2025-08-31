const mongoose = require('mongoose')

async function connectDatabase() {
    try {
        return await mongoose.connect(process.env.MONGODB_CONNECT_STR);
    } catch (err) {
        console.error(`Failed to connect to database: ${err}`)
    }
}

module.exports = {
    connectDatabase
}