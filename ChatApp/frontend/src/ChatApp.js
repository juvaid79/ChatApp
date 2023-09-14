import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

import './App.css';

const ChatApp = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  const socket = io('http://localhost:3500');

  useEffect(() => {
    fetchChats();

    socket.on('message', (newChat) => {
      setChats([...chats, newChat]);
    });
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://localhost:3500/getchat');
      setChats(response.data.allChats);
      console.log('Message sent:', response.data.allChats);

    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/sendchat', {
        Sender: sender,
        Receiver: receiver,
        Messages: message,
      });
      setMessage('');
      fetchChats();

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };




  return (
    <Container className="chat-container">
      <Row>
        <Col xs={8}>
          <h1>Chat App</h1>
          <ListGroup className="chat-list">
            {chats.map((chat) => (
              <ListGroup.Item key={chat._id} className="message">
                <>From : {chat.Sender}</>
                <br />
                <>To : {chat.Receiver}</>
                <br />
                Msg : {chat.Messages}
                <br />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={4}>
          <h2>Send a Message</h2>
          <Form onSubmit={handleSubmit} className="chat-form">
            <Form.Group controlId="sender">
              <Form.Label>Sender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="receiver">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Receiver Name"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Your Messages"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="send-button">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
