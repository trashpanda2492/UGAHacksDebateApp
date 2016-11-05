import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
import { connect } from './Chat/DebateRooms';
import {Topics} from './imports/collections/topics.js'

const PORT = 8080;

Meteor.startup(() => {
  Meteor.methods({
    'getDebateRoom'(data) {
      topic = Topics.findOne({"debate.title": data.title});
      if (data.position == 1 && topic.con.length != 0) {
        matchedRoom = topic.con[0];
        Topics.update({"debate.title": data.title}, {
          $pull:{
            "debate.$":{
              {"con":matchedRoom}
            }
          }
        });
        return {"url": matchedRoom, isMatched: true};
      } 
    }
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
});
