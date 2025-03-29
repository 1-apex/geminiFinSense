import React, { useState, useEffect } from 'react';
import api from '../api/axios'; // Import Axios instance
import '../assets/css/ChatInterface.css';


const ChatInterface = () => {
    const [messages, setMessages] = useState([]); // Store chat messages
    const [input, setInput] = useState(''); // Store user input

    // Handle form submission to send message to backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const response = await api.post('/chat/', { message: input }); // Send POST request
            setMessages([...messages, 
                { text: input, isBot: false }, // Add user message
                { text: response.data.response, isBot: true } // Add bot response
            ]);
            setInput(''); // Clear input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about finances..."
                    aria-label="Chat input"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatInterface; // Export component for use in other files
