const socket = io(); 

let messageCount = 0;

const username = prompt('Enter your username:') || 'Anonymous';

socket.emit('register user', username);

socket.on('chat message', ({ sender, message }) => {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; 

  messageCount++;
  document.getElementById('message-count').textContent = messageCount;
});

socket.on('user count', (count) => {
  document.getElementById('connected-users').textContent = count;
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const receiver = prompt('Enter the recipient username:');

  const message = messageInput.value;

  if (message && receiver) {
  
    socket.emit('chat message', { sender: username, receiver, message });
    messageInput.value = '';
  }
});
