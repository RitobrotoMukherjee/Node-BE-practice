const EventEmitter = require('node:events');

function ChatApp() {
    this.chats = new Map();
    this.emitter = new EventEmitter();
}

ChatApp.prototype.join = function(userName) {
    if(this.chats.has(userName)) {
       this.emitter.emit("error", new Error(`${userName} : is already in the chat room, use another user name please`));
    } else {
        this.chats.set(userName, "");
        this.emitter.emit('join', `${userName}: Joined chat room!`)
    }
}

ChatApp.prototype.chat = function(userName, message) {
    if(this.chats.has(userName)) {
        this.chats.set(userName, message);
        this.emitter.emit('chat', `${userName}: ${message}`);
    } else {
        this.emitter.emit("error", new Error(`${userName} : You are not in the chat room, please join first`));
    }
}

ChatApp.prototype.leave = function(userName) {
    if(this.chats.has(userName)) {
        this.chats.delete(userName);
        this.emitter.emit('leave', `${userName}: Left the chat room!`);
    } else {
        this.emitter.emit("error", new Error(`${userName} : You are not in the chat room`));
    }
}

module.exports = { ChatApp };