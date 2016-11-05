import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
import { connect } from './Chat/DebateRooms';

const PORT = 8080;

Meteor.startup(() => {
  // Server
  const server = http.createServer();
  const io = socket_io(server);

  let counter = 0;

  connect(io);

  // Start server
  try {
    server.listen(PORT);
  } catch (e) {
    console.error(e);
  }
});
