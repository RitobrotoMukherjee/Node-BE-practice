console.log("Chat App Started...");
const { ChatApp } = require('./consoleChatUsingEventEmitter.js');

const userName = process.argv[2];
const message = process.argv[3];

const runChat = () => { 
    return new ChatApp();
};

const chat = runChat();

// Listeners
chat.emitter.on('error', (err) => {
    console.error('Error:', err.message);
});

chat.emitter.on('join', (msg) => {
    console.log(msg);
});

chat.emitter.on('chat', (message) => {
    console.log(message);
});

chat.emitter.on('leave', (msg) => {
    console.log(msg);
});

// Initiate Chat Actions
chat.join("Queen");
chat.chat("Queen", "Hello everyone!");

chat.join(userName);
chat.chat(userName, message);
chat.leave(userName);
module.exports = runChat;
