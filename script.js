const chatLog = document.getElementById('chat-log'),
  userInput = document.getElementById('user-input'),
  sendButton = document.getElementById('send-button'),
  buttonIcon = document.getElementById('button-icon'),
  info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') {
    return;
  }
  else if (message === 'developer') {
    userInput.value = '';
    appendMessage('user', message);
    setTimeout(() => {
      appendMessage('bot', 'This Source Coded By Thor \nYoutube : @');
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }, 2000);
    return;
  }

  appendMessage('user', message);
  userInput.value = '';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'Your Key',
      'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
    },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`
  };
  fetch('https://chatgpt53.p.rapidapi.com/', options).then((response) => response.json()).then((response) => {
    appendMessage('bot', response.choices[0].message.content);

    buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
  }).catch((err) => {
    if (err.name === 'TypeError') {
      appendMessage('bot', 'Error : Check Your Api Key!');
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }
  });
}