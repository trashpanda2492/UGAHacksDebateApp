import { socket_io } from 'socket.io';

function connect(io) {
    // New client
    io.on('connection', function(socket) {
        io.on('roomConnection', function(data) {
            if (data.isDebater) {
                var groupNSP = io.of('/'+data.room_id);
            } else {
                var groupNSP = io.of('/'+data.room_id+'_spectator');
            }
        });

        io.on('message', function(data){
            io.of(data.nsp).emit('message', data);
        });

        io.on('rating', function(data) {
            io.of(data.nsp).emit('rating', data.msgId);
        });
    });
}

export { connect };