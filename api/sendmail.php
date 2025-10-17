<?php
// =========================
// CORS-Einstellungen
// =========================
header("Access-Control-Allow-Origin: https://www.frank-meckel.de");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS Preflight-Anfrage abfangen
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Nur POST-Anfragen zulassen
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'method not allowed']);
    exit;
}

// JSON-Daten aus POST auslesen
$json = file_get_contents('php://input');
$params = json_decode($json, true);

$name = htmlspecialchars(trim($params['name'] ?? ''));
$email = htmlspecialchars(trim($params['email'] ?? ''));
$message = htmlspecialchars(trim($params['message'] ?? ''));

// Validierung
if (!$name || !$email || !$message) {
    echo json_encode(['status' => 'error', 'message' => 'Ungültige Eingaben']);
    exit;
}

// Empfänger & Mail-Inhalt
$recipient = 'kontakt@frank-meckel.de'; // interne All-inkl-Adresse
$subject = "Kontaktformular von $name";
$body = "
    <h3>Neue Nachricht über das Kontaktformular</h3>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Nachricht:</strong><br>$message</p>
";

// Mail-Header
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: kontakt@frank-meckel.de',
    "Reply-To: $email"
];

// Mail senden
if (mail($recipient, $subject, $body, implode("\r\n", $headers))) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Mail konnte nicht gesendet werden']);
}
?>
