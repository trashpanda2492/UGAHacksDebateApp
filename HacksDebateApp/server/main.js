import { Meteor } from 'meteor/meteor';
import http from 'http';
import socket_io from 'socket.io';
import { connect } from './Chat/DebateRooms';
import {Topics} from './imports/collections/topics.js'

const PORT = 8080;

function generateUrl() {
  const text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( const i=0; i < 8; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

Meteor.startup(() => {
  Meteor.methods({
    'getDebateRoom'(data) {
      // When successful match, move matched room to chatrooms from queue
      topic = Topics.findOne({"title": data.title});
      if (data.position == 1) {
        if (topic.con.length != 0) {
          matchedRoom = topic.con[0];
          Topics.update({"title": data.title}, {
            $pull:{
              "con": matchedRoom
            }
          });
          return {"url": matchedRoom, isMatched: true};
        }
        const url = generateUrl();
        Topics.update({"title": data.title}, {
          $push:{
            "pro":url
          }
        });
        return {"url": url, isMatched: false};
      }
      if (topic.pro.length != 0) {
        matchedRoom = topic.pro[0];
        Topics.update({"title": data.title}, {
          $pull:{
            "pro": matchedRoom
          }
        });
        return {"url": matchedRoom, isMatched: true};
      }
      const url = generateUrl();
      Topics.update({"title": data.title}, {
        $push:{
          "con":url
        }
      });
      return {"url": url, isMatched: false};
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
