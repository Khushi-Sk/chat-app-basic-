const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

// List of predefined bot replies
const botReplies = [
    "Hello! How can I assist you today?",
    "I'm here to help.",
    "What can I do for you?",
    "I'm just a chatbot, but I'm listening.",
    "Feel free to ask me anything.",
    "Let me know how I can be on your service.",
];

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("message", (userMessage) => {
        const botReply = getRandomBotReply();
        io.emit("message", userMessage);
        io.emit("message", botReply);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected.");
    });
});

// ... (your existing server-side code)

function getRandomBotReply() {
    const randomIndex = Math.floor(Math.random() * botReplies.length);
    return botReplies[randomIndex];
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
