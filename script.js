const chatContainer = document.getElementById("chat-container");
const ws = new WebSocket("wss://irc-ws.chat.twitch.tv");

ws.onopen = () => {
    ws.send("PASS oauth:your_oauth_token");  // Replace with your OAuth token
    ws.send("NICK your_twitch_username");   // Replace with your Twitch username
    ws.send("JOIN #your_channel");          // Replace with your channel name
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
