

document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
  

    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    let userName = "" ;   
   
    do {
        userName = prompt("Enter your name:")
    } while (!userName);

    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            if (message.startsWith("/")) {
                handleSlashCommand(message); // Handle slash command
            } else {
                sendMessage(message);
            }
            messageInput.value = "";
        }
    });

    function handleSlashCommand(message) {
        const commandParts = message.split(" ");
        const command = commandParts[0];
        switch (command) {
            case "/help":
                appendMessage(userName+": " + message);
                appendMessage("Bot: Available commands:\n- /help: Shows help alert\n- /random: Generates random number\n- /clear: Clears all messages");
                break;
            case "/random":
                function getRandomNumber(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                  }
                
                const min = parseInt(commandParts[1]) || 1;
                const max = parseInt(commandParts[2]) || 100;
                const randomNum = getRandomNumber(min, max);
                appendMessage(userName+": " + message);
                appendMessage(`Bot: Generated random a number between ${min} and ${max}: ${randomNum}`);
                break;
            case "/clear":
                chatMessages.innerHTML = "";
                appendMessage(userName+": " + message);
                appendMessage("Bot: All messages are cleared.");
                break;
            default:
                appendMessage(userName+": " + message);
                appendMessage("Bot: Unknown command. Type /help for available commands.");
        }
    }


    messageInput.addEventListener("input", () => {
        const userInput = messageInput.value.toLowerCase();
        if (userInput.includes("hey") || userInput.includes("hello") || userInput.includes("hi")) {
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
        appendMessage(userName+":" + message);
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
