import React, { useState } from 'react';
import io from 'socket.io-client';
import { Offline, Online } from 'react-detect-offline';
import './Chat.css';
import UsernamePrompt from './components/UsernamePrompt';
import MessagesList from './components/MessagesList';
import ChatUI from './components/ChatUI';

const socket = io();

export default function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [firstStep, setFirstStep] = useState(true);
  const [messages, setMessages] = useState([]);
  const [btnStatus, setbtnStatus] = useState(false);

  socket.on('RECEIVE_MESSAGES', function(data) {
    setMessages(data);
    // console.log(messages);
  });

  socket.on('SEND_MESSAGE_TO_CLIENT', data => {
    // console.log(data);
    setMessages([...messages, { author: data.author, message: data.message }]);
    // console.log(messages);
  });

  const sendMessage = e => {
    e.preventDefault();

    // console.log(username, message);
    setbtnStatus(true);

    setTimeout(() => setbtnStatus(false), 500);

    const messageToSend = {
      author: username,
      message: message
    };

    socket.emit('SEND_MESSAGE', messageToSend);
    setMessages([...messages, messageToSend]);
    setMessage('');
  };

  const changeStep = e => {
    e.preventDefault();
    setFirstStep(false);
    socket.emit('USER_JOINED', username);
  };

  return (
    <div className="window">
      <div className="window__bar">React Chat App</div>
      <Online>
        <div className="window__content">
          {firstStep ? (
            <UsernamePrompt
              onSubmit={changeStep}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          ) : (
            <MessagesList messages={messages} />
          )}
        </div>
        {!firstStep ? (
          <ChatUI
            onSubmit={sendMessage}
            value={message}
            onChange={e => setMessage(e.target.value)}
            btnStatus={btnStatus}
          />
        ) : null}
      </Online>
      <Offline>
        <h1 style={{ textAlign: 'center', padding: '50px' }}>
          You don't seem to be connected to the Internet.
        </h1>
      </Offline>
    </div>
  );
}
