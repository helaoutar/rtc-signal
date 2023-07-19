const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('signal-offer', msg => {
    console.log(msg);
    io.emit('offer', msg);
  });

  socket.on('signal-answer', msg => {
    console.log('signal-answer', msg)
    io.emit('answer', msg);
  });

  socket.on('send-ice-candidate1', msg => {
    if (msg) io.emit('ice-candidate1', msg);
  });

  socket.on('send-ice-candidate2', msg => {
    if (msg) io.emit('ice-candidate2', msg);
  });
});


http.listen(port, () => {
  console.log(`Socket.IO server running`);
});
