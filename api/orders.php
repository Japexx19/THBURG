<?php
require __DIR__ . '/_bootstrap.php';
require_api_key();

$since = isset($_GET['since']) ? max(0, (int)$_GET['since']) : 0;
$limit = min(100, max(1, (int)($_GET['limit'] ?? 30)));

$sql = "SELECT * FROM orders WHERE id > ? ORDER BY id ASC LIMIT {$limit}";
$stmt = db()->prepare($sql);
$stmt->execute([$since]);
$orders = $stmt->fetchAll();

foreach ($orders as &$order) {
    $itemStmt = db()->prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC");
    $itemStmt->execute([(int)$order['id']]);
    $order['items'] = $itemStmt->fetchAll();
    $order['address'] = $order['address_json'] ? json_decode($order['address_json'], true) : null;
    unset($order['address_json']);
}
unset($order);

echo json_encode(['ok'=>true,'orders'=>$orders], JSON_UNESCAPED_UNICODE);
