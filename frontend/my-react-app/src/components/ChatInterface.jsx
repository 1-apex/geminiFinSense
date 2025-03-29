import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/chatbot/' 
});

const ChatInterface = () => {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      console.log('Sending message:', input);
      const response = await api.post('chat/', { message: input });
      console.log('Received response:', response.data);
      setMessages([...messages, 
        { text: input, isBot: false }, 
        { text: response.data.response, isBot: true } 
      ]);
      setInput('');
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

export default ChatInterface;
