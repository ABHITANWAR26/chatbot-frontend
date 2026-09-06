import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  // Runs once when the app first loads — fetch the list of available models
  useEffect(() => {
    fetch('http://localhost:5000/models')
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        if (data.length > 0) setSelectedModel(data[0].id); // default to the first one
      })
      .catch(() => {
        console.error('Could not load model list');
      });
  }, []); // empty array = run only once, not on every re-render

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newUserMessage = { role: 'user', content: trimmedInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          model: selectedModel,
          history: messages
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages([...updatedMessages, { role: 'assistant', content: `⚠️ ${data.error}` }]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '⚠️ Could not reach the server. Please check your connection.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Chat</h1>
        <select
          className="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </header>

      <div className="messages">
        {messages.length === 0 && (
          <p className="empty-state">Ask something to get started.</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="message assistant">Thinking...</div>}
      </div>

      <div className="input-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;