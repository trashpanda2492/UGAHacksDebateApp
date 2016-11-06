import { Topics } from '../../imports/collections/topics.js';

function generateUrl() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( let i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Pushes data to a chatroom of topic with title
function pushToChatrooms(title, room) {
    Topics.update({"title": data.title}, {
        $push:{
            "chatrooms": room
        }
    });
}

// Pull room from con queue of topic with title
function pullFromCon(title, room) {
    Topics.update({"title": title}, {
        $pull:{
            "con": room
        }
    });
}

// Pull room from pros queue of topic with title
function pullFromPro(title, room) {
    Topics.update({"title": title}, {
        $pull:{
            "pro": room
        }
    });
}

// Push room to pro queue of topic with title
function pushToPro(title, room) {
    Topics.update({"title": data.title}, {
        $push:{
            "pro":url
        }
    });
}

// Push room to con queue of topic with title
function pushToCon(title, room) {
    Topics.update({"title": data.title}, {
        $push:{
            "con":url
        }
    });
}

function getDebateRoom(data) {
    // When successful match, move matched room to chatrooms from queue
    // If no successful match, add to queue.
    topic = Topics.findOne({"title": data.title});
    if (data.position == 1) {
        if (topic.con.length != 0) {
            matchedRoom = topic.con[0];
            pullFromCon(data.title, matchedRoom);
            pushToChatrooms(data.title, matchedRoom);
            return {"url": matchedRoom, isMatched: true};
        }
        const url = generateUrl();
        pushToPro(data.title, url);
        return {"url": url, isMatched: false};
    }
    if (topic.pro.length != 0) {
        matchedRoom = topic.pro[0];
        pullFromPro(data.title, matchedRoom);
        pushToChatrooms(data.title, matchedRoom);
        return {"url": matchedRoom, isMatched: true};
    }
    const url2 = generateUrl();
    pushToCon(data.title, url);
    return {"url": url2, isMatched: false};
}

// Removes a url from chatrooms
function endDebate(data) {
    const title = data.title;
    const url = data.url;
    Topics.update({"title": title}, {
        $pull: {
            "chatrooms": url
        }
    });
}

export { getDebateRoom };