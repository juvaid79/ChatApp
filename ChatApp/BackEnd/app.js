const express = require("express");
const app = express();
const PORT = 3500;
require('./Config/Db')
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const ChatApp = require("./models/ChatModel");

app.use(cors());
const io = socketIO(server, {
  cors : {
    origin : "http://localhost:3000"
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sendchat', async (req, res) => {
  const { Sender, Receiver, Messages } = req.body;
  try {
    const newChat = await ChatApp.create({ Sender, Receiver, Messages });
    io.emit('message', newChat);
    return res.status(200).json({ success: true, msg: "Your msg has been sent", newChat: newChat });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

app.get('/getchat', async (req, res) => {
  try {
    const allChats = await ChatApp.find();
    return res.status(200).json({ success: true, msg: "Your all chat is here", allChats: allChats });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => console.log("Server running on port " + PORT));
