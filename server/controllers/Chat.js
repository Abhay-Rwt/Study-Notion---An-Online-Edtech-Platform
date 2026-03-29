const Chat = require('../models/Chat');
const { GoogleGenAI } = require("@google/genai");
const dotenv = require('dotenv');

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

exports.chatController = async (req, res) => {
    try {
        // fetching userId and the question(message) from req body
        const { userId, message } = req.body;

        // finding previous chats of the user
        let chatHistory = await Chat.findOne({ userId });

        // if nothing found, then create a Chat with empty messages(empty previous chat)
        if (!chatHistory) {
            chatHistory = new Chat({
                userId: userId,
                messages: []
            });
        }

        // push the latest question/message to the chatHistory
        chatHistory.messages.push({
            role: "user",
            content: message
        });

        // make the context ready of the previous 6 chats b/w user and model
        const context = chatHistory.messages.slice(-6).map((chat) => ({
            role: chat.role,
            parts: [{ text: chat.content }]
        }));

        // console.log("CONTEXT........", context)

        // call ai model api with context and systemInstruction given
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: context,
            config: {
                systemInstruction: `
                    You are StudyNotion AI assistant.

                    Platform Routes:

                    Public:
                    - Home: /
                    - Signup: /signup
                    - Login: /login
                    - Forgot Password: /forgot-password
                    - Verify Email: /verify-email
                    - About: /about
                    - Contact: /contact

                    Courses:
                    - Catalog: /catalog/:catalogName
                    - Course Details: /courses/:courseId

                    Dashboard:
                    - Profile: /dashboard/my-profile
                    - Settings: /dashboard/settings

                    Student:
                    - Enrolled Courses: /dashboard/enrolled-courses
                    - Cart: /dashboard/cart

                    Instructor:
                    - Instructor Dashboard: /dashboard/instructor
                    - Add Course: /dashboard/add-course
                    - My Courses: /dashboard/my-courses
                    - Edit Course: /dashboard/edit-course/:courseId


                    Rules:
                    - Always guide users using these routes
                    - If user asks navigation → return path
                    - Keep answers short and helpful
`
            }
        });

        const reply = response.text;

        // console.log("RESPONSE.......", reply);

        // push the lastest response of model to the chatHistory
        chatHistory.messages.push({
            role: "model",
            content: reply
        });

        // save it in db
        await chatHistory.save();

        // send the response to  frontend through response
        res.status(200).json({
            success: true,
            reply: reply,
        })

    }
    catch (error) {
        console.log("ERROR..........................", error);
        res.status(500).json({
            success: false,
            reply: error.message,
        })
    }
}




