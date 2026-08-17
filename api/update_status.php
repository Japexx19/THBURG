<?php
require __DIR__ . '/_bootstrap.php';
require_api_key();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok'=>false,'error'=>'Método não permitido.']);
    exit;
}
$data = json_input();
$id = (int)($data['order_id'] ?? 0);
$status = (string)($data['status'] ?? '');

$allowed = ['novo','aceito','preparo','pronto','saiu_entrega','finalizado','cancelado'];
if ($id < 1 || !in_array($status, $allowed, true)) {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'Pedido ou status inválido.']);
    exit;
}

$stmt = db()->prepare("UPDATE orders SET status = ? WHERE id = ?");
$stmt->execute([$status, $id]);

echo json_encode(['ok'=>true]);
