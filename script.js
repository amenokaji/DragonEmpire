const chatContainer = document.getElementById("chat-container");
const ws = new WebSocket("wss://irc-ws.chat.twitch.tv");

ws.onopen = () => {
    ws.send("PASS oauth:sj7k27nw4sk3oifvdyvfddtffqtv77");  // Replace with your OAuth token
    ws.send("NICK AmeJouten");   // Replace with your Twitch username
    ws.send("JOIN #AmeJouten");          // Replace with your channel name
};

ws.onmessage = (event) => {
    const messageData = event.data.split("PRIVMSG")[1];
    if (messageData) {
        const chatMessage = messageData.split(":")[1];
        displayChatMessage(chatMessage);
    }
};

function displayChatMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.innerText = message;
    chatContainer.appendChild(messageElement);

    setTimeout(() => messageElement.remove(), 15000);  // Remove messages after 15 seconds
}
