// chat.js
document.addEventListener('DOMContentLoaded', function () {
    // Obteniendo elementos del DOM
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatLog = document.getElementById('chat-log');

    // Agregando evento de envío de formulario
    chatForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const message = chatInput.value.trim();

        if (message !== '') {
            chatHistory.push(message);
            appendMessage('Tu', message);
            chatInput.value = '';

            $("#barra").show();

            getChatbotResponse()
                .then((response) => {
                    $("#descripcion").hide();
                    $("#chat-log").show();
                    $("#barra").hide();
                    appendMessage('Bot', response);
                })
                .catch((error) => {
                    console.error(error);
                    const errorMessage = document.getElementById('error-message');
                    errorMessage.innerHTML = error;
                });
        }
    });

    // Función para agregar un mensaje al registro de chat
    function appendMessage(sender, content) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');
        messageContainer.classList.add(sender === 'Bot' ? 'bot-message' : 'user-message');

        const senderElement = document.createElement('strong');
        if (sender === 'Tu') {
            senderElement.innerHTML = 'Tu😎: ';
        } else if (sender === 'Bot') {
            senderElement.innerHTML = 'Bot🤖: ';
        }

        messageContainer.appendChild(senderElement);

        const contentElement = document.createElement('span');
        contentElement.innerText = content;
        messageContainer.appendChild(contentElement);

        chatLog.appendChild(messageContainer);
        // Desplazarse al final del contenedor de chat
        chatLog.scrollTop = chatLog.scrollHeight;
    }
});
