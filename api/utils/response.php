<?php
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function errorResponse($message, $status = 400) {
    jsonResponse(['error' => true, 'message' => $message], $status);
}

function successResponse($data, $message = null) {
    $response = ['success' => true];
    if ($message) {
        $response['message'] = $message;
    }
    $response = array_merge($response, $data);
    jsonResponse($response);
}
