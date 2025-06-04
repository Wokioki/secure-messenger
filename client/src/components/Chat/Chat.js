import React, { useEffect, useState, useRef, useCallback } from 'react';
import API from '../../api/api';
import './ChatBoxStyle.css';

const ChatBox = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/auth/users');
      const filtered = res.data.filter(u => u !== user);
      setUsers(filtered);
      if (!selectedUser && filtered.length > 0) {
        setSelectedUser(filtered[0]);
      }
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const fetchMessages = useCallback(async () => {
    if (selectedUser) {
      try {
        const res = await API.get('/messages/chat', {
          params: { user1: user, user2: selectedUser },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    }
  }, [selectedUser, user]);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || selectedUser === user) return;
    try {
      await API.post('/messages/send', null, {
        params: {
          sender: user,
          receiver: selectedUser,
          content: newMessage,
        },
      });
      setNewMessage('');
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="welcome">Welcome, <b>{user.split('@')[0]}</b></div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="chat-body">
        <div className="user-panel">
          <h3>Users:</h3>
          <div className="user-list">
            {users.map((u, i) => (
              <div
                key={i}
                className={`user-item ${selectedUser === u ? 'active' : ''}`}
                onClick={() => setSelectedUser(u)}
              >
                {u}
              </div>
            ))}
          </div>
        </div>

        {selectedUser && (
          <div className="chat-panel">
            <h3>Chat with {selectedUser}</h3>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.sender === 'You' ? 'outgoing' : 'incoming'}`}
                >
                  <div><b>{msg.sender}</b>: {msg.content}</div>
                  <div className="timestamp">{msg.timestamp}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;