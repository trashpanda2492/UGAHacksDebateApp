import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
import { connect } from './Chat/DebateRooms';
import { Topics } from './imports/collections/topics.js'
import { getDebateRoom } from 'topic_management/debate_room.js';

const PORT = 8080;

Meteor.startup(() => {
  Meteor.methods({
    'getDebateRoom'(data) {
      return getDebateRoom(data);
    },
  });


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

  Meteor.publish('getRoomForSpectator', function(data) {
    const title = data.title;
    const room_id = data.room;
    if (room_id) {
      const ret_room = Topics.findOne({"title":title}, {
        "chatrooms": room_id
      });
      return ret_room;
    }
    const topic = Topics.findOne({"title":title});
    const chatRooms = topic.chatrooms;
    return chatRooms[Math.floor(Math.random() * chatRooms.length)];
  });
});
