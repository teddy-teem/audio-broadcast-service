const io = require('socket.io')(http);
const fs = require('fs');
const http = require('http').createServer(app);

exports.health = (req, res)=>{
    io.on('connection', (socket) => {
        console.log('====A client connected');
      
        // Send audio file to clients
        socket.on('getAudioFile', (fileName="") => {
          const filePath = `./horse.mp3`;
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
      
        // Handle client disconnection
        socket.on('disconnect', () => {
          console.log('A client disconnected');
        });
      });

    res.send({status: "ok", message: "I am healthy"});
}

http.listen(PORT, () => {
    console.log(`listening on (For Real Time) *:${8080}`);
  });