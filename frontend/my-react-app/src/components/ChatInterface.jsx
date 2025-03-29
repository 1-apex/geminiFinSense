import React, { useState } from 'react';
import api from '../api/axios'; // Import Axios instance
import '../assets/css/ChatInterface.css';
import backgroundImage from '../assets/images/background.jpg'; // Import local image

const ChatInterface = () => {
    const [messages, setMessages] = useState([]); // Store chat messages
    const [input, setInput] = useState(''); // Store user input

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/chat/', { message: input });
            setMessages([
                ...messages,
                { text: input, isBot: false },
                { text: response.data.response, isBot: true },
            ]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                        <div className="bubble">
                            <span>{msg.text}</span>
                            <small className="timestamp">{msg.timestamp}</small>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about finances..."
                    aria-label="Chat input"
                    className="input-field"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default ChatInterface;
