// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Sirva os arquivos estáticos
app.use(express.static('public'));

// Comunicação em tempo real com Socket.IO
io.on('connection', (socket) => {
  console.log('Novo usuário conectado!');

  // Recebe mensagens e distribui aos outros usuários
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  // Desconectar
  socket.on('disconnect', () => {
    console.log('Usuário desconectou.');
  });
});

// Inicia o servidor
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));