<?php
require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok'=>false,'error'=>'Método não permitido.']);
    exit;
}

$data = json_input();

$customer = trim((string)($data['customer_name'] ?? ''));
$phone = trim((string)($data['customer_phone'] ?? ''));
$fulfillment = ($data['fulfillment'] ?? 'entrega') === 'retirada' ? 'retirada' : 'entrega';
$payment = trim((string)($data['payment_method'] ?? ''));
$notes = trim((string)($data['notes'] ?? ''));
$items = $data['items'] ?? [];
$address = $data['address'] ?? null;

if ($customer === '' || !$items || $payment === '') {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'Nome, itens e forma de pagamento são obrigatórios.']);
    exit;
}

if ($fulfillment === 'entrega' && (!is_array($address) || trim((string)($address['street'] ?? '')) === '')) {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'Endereço de entrega é obrigatório.']);
    exit;
}

$subtotal = 0.0;
foreach ($items as $item) {
    $qty = max(1, (int)($item['qty'] ?? 1));
    $line = (float)($item['line_total'] ?? 0);
    $subtotal += $qty * $line;
}
$deliveryFee = $fulfillment === 'retirada' ? 0.0 : (float)($data['delivery_fee'] ?? 0);
$total = $subtotal + $deliveryFee;

$pdo = db();
$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        "INSERT INTO orders
        (customer_name, customer_phone, fulfillment, payment_method, address_json, notes, subtotal, delivery_fee, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'novo')"
    );
    $stmt->execute([
        $customer, $phone, $fulfillment, $payment,
        $address ? json_encode($address, JSON_UNESCAPED_UNICODE) : null,
        $notes, $subtotal, $deliveryFee, $total
    ]);

    $orderId = (int)$pdo->lastInsertId();

    $itemStmt = $pdo->prepare(
        "INSERT INTO order_items
        (order_id, product_id, product_name, qty, unit_price, line_total, selections_json, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );

    foreach ($items as $item) {
        $qty = max(1, (int)($item['qty'] ?? 1));
        $unit = (float)($item['line_total'] ?? 0);
        $itemStmt->execute([
            $orderId,
            (string)($item['product_id'] ?? ''),
            (string)($item['name'] ?? 'Produto'),
            $qty,
            $unit,
            $unit * $qty,
            json_encode($item['selections'] ?? [], JSON_UNESCAPED_UNICODE),
            (string)($item['notes'] ?? '')
        ]);
    }

    $pdo->commit();

    echo json_encode([
        'ok' => true,
        'order_id' => $orderId,
        'status' => 'novo',
        'total' => $total
    ]);
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['ok'=>false,'error'=>'Erro ao registrar pedido.']);
}
