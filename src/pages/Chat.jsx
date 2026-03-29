import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiconnector';
import { chatEndpoints } from '../services/apis';

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const chatEndRef = useRef(null);

    async function sendMessage() {
        if (!input.trim()) return;

        const userId = user._id;
        const data = input;
        setInput("");

        const msg = { role: 'user', content: data };
        setMessages((prev) => [...prev, msg]);

        try {
            setLoading(true);

            const response = await apiConnector(
                'POST',
                chatEndpoints.CHAT_API,
                { userId, message: data },
                { Authorization: `Bearer ${token}` }
            );

            const msgResponse = {
                role: 'model',
                content: response.data.reply
            };

            setMessages((prev) => [...prev, msgResponse]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'model', content: "Something went wrong. Try again." }
            ]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="h-full flex flex-col bg-gray-800 text-white rounded-2xl">

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                                msg.role === "user"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-gray-700"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="text-left text-sm text-gray-400">
                        AI is typing...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Input box */}
            <div className="p-2 border-t border-gray-700 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask something..."
                    className="flex-1 px-3 py-2 rounded bg-gray-800 text-white outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:scale-105 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}