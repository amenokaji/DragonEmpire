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

    // Add message to the container
    chatContainer.appendChild(messageElement);

    // Remove message after 15 seconds
    setTimeout(() => messageElement.remove(), 15000);

    // Optional: Limit the number of messages displayed at once
    const maxMessages = 10; // Adjust as needed
    const messages = chatContainer.getElementsByClassName("chat-message");
    if (messages.length > maxMessages) {
        messages[0].remove(); // Remove the first message if the container exceeds the max number of messages
    }
}
