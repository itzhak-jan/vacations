const http = require("http");
const express = require("express");

const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000']
    },
});
const jwt_decode = require('jwt-decode');

const socketServer = socketIO.listen(httpServer);

let idToSocketsMap = new Map();

socketServer.sockets.on("connection", socket => {
    let userId = getUserIdFromSocket(socket);

    console.log("User id: " + userId);

    console.log("One client has been connected... Total clients: " + idToSocketsMap.size);

    if (idToSocketsMap.has(userId)) {
        idToSocketsMap.get(userId).push(socket);
    }
    else {
        idToSocketsMap.set(userId, [socket]);
    }

    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        let userId = getUserIdFromSocket(socket);

        let socketArray = idToSocketsMap.get(userId);
        if (socketArray.length > 1) {
            socketArray = socketArray.filter((userSocket) => userSocket != socket);
            idToSocketsMap.set(userId, socketArray);
        }
        else {
            idToSocketsMap.delete(userId);
        }

        console.log(userId + " client has been disconnected. Total clients: " +
            idToSocketsMap.size);
    });

});

function getUserIdFromSocket(socket) {
    var handshakeData = socket.request;
    let token = handshakeData._query['token'];
    let decodedToken = jwt_decode(token);
    let userId = decodedToken.userId;
    return userId;
}

async function broadcast(actionName, data) {
    for (let [id, socketArray] of idToSocketsMap) {
        for (let socket of socketArray) {
            console.log("Action: " + actionName, id)
            socket.emit(actionName, data);
        }
    };
};

httpServer.listen(3002, () => console.log("Push server listening on http://localhost:3002"));

module.exports = {
    broadcast,
}