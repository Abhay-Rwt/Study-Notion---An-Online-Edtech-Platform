const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: String,
    messages: [
        {
            role: String, // user or bot
            content: String,
        }
    ]
});

module.exports = mongoose.model("Chat", chatSchema);