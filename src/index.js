const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const cors = require('cors')
app.use(cors())
const useRoutes = require("./routes");

app.use(useRoutes);

io.on('connection', (socket) => {
  console.log('====A client connected', socket.id);
  // Send audio file to clients
  socket.on('getAudioFile', (fileName="") => {
    const filePath = `./chinebadam.mp3`;
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.error('Error reading audio file:', error);
        return;
      }
      socket.broadcast.emit('playAudio', {
        fileName,
        data: data.toString('base64'),
      });
    });
  });

  socket.on('pause', () => {
    socket.broadcast.emit('pause');
  });

  socket.on('play', () => {
    socket.broadcast.emit('play');
  });

  app.use(useRoutes);

  // socket.on('playAudio', () => {
  //   socket.broadcast.emit('pause');
  // });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
const port = 4001;
http.listen(port, () => {
  console.log(`Socket server is running on http://localhost:${port}`);
});

app.listen(4000, ()=>{
  console.log(`HTTP Server is running on http://localhost:4000`);

});
