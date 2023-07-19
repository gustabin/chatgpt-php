<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    $model = 'gpt-3.5-turbo-0613';
    $apiKey = 'INGRESA_TU_API_KEY';

    $headers = [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ];

    $chatHistory = $_POST['chatHistory']; // Obtener el historial de chat desde JavaScript

    $messages = array_map(function ($message, $index) {
        return ['role' => 'system', 'content' => $message];
    }, $chatHistory, array_keys($chatHistory));

    $messages[] = ['role' => 'user', 'content' => end($chatHistory)]; // Último mensaje del historial

    $data = [
        'model' => $model,
        'messages' => $messages
    ];

    $options = [
        'http' => [
            'header' => $headers,
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($apiEndpoint, false, $context);

    if ($response !== false) {
        $responseData = json_decode($response, true);

        if (isset($responseData['choices']) && count($responseData['choices']) > 0) {
            $chatbotResponse = $responseData['choices'][0]['message']['content'];

            header('Content-Type: application/json');
            echo json_encode(['exito' => 1, 'response' => $chatbotResponse]);
            exit();
        } else {
            echo json_encode(['error' => 1, 'response' => 'No se pudo obtener una respuesta del chatbot.']);
            exit();
        }
    } else {
        echo json_encode(['error' => 1, 'response' => 'Ha ocurrido un error al realizar la solicitud a la API de OpenAI.']);
        exit();
    }
}
