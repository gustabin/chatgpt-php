function getChatbotResponse() {
    return new Promise(function (resolve, reject) {
        // Obteniendo el último mensaje del historial de chat
        const message = chatHistory[chatHistory.length - 1];

        // Realizando la solicitud a la API de OpenAI
        $.ajax({
            type: "POST",
            url: "./../src/chat.php",
            dataType: "json",
            data: { chatHistory },
            success: function (data) {
                if (data.error == 1) {
                    console.error('Error al obtener la respuesta del chatbot:', data.response);
                    reject('Ha ocurrido un error. Por favor, intenta de nuevo más tarde.');
                } else if (data.exito == 1) {
                    if (data.response) {
                        resolve(data.response);
                    } else {
                        reject('No se pudo obtener una respuesta del chatbot.');
                    }
                }
            },
            error: function () {
                reject('Ha ocurrido un error al realizar la solicitud a la API de OpenAI.');
            }
        });
    });
}
