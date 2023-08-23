
document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
  

    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    
   

    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            sendMessage(message);
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("input", () => {
        const userInput = messageInput.value.toLowerCase();
        if (userInput.includes("hey") || userInput.includes("hello") || userInput.includes("hello")) {
            messageInput.value = " 👋";
        }
        else if (userInput.includes("yo")) {
            messageInput.value = " 🤘";
        }
        else if (userInput.includes("react")) {
            messageInput.value = " ⚛️";
        }
        else if (userInput.includes("woah")) {
            messageInput.value = " 😲";
        }
        else if (userInput.includes("lol")) {
            messageInput.value = " 😂";
        }
        else if (userInput.includes("like")) {
            messageInput.value = " 💙";
        }
        else if (userInput.includes("congratulations")) {
            messageInput.value = " 🎉👏";
        }
        else if (userInput.includes("peace")) {
            messageInput.value = " 🕊️☮️";
        }
        else if (userInput.includes("excited")) {
            messageInput.value = " 🤩";
        }
        else if (userInput.includes("rofl")) {
            messageInput.value = " 🤣";
        }
        
    });

    function sendMessage(message) {
        socket.emit("message",message);
        appendMessage("You: " + message);
    }

    socket.on("message", (getRandomBotReply) => {
        appendMessage("Bot: " + getRandomBotReply);
    });

    function appendMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.className = "alert alert-primary mt-2";
        messageElement.innerText = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
