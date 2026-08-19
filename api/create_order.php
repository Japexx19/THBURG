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
$fulfillment = in_array(($data['fulfillment'] ?? 'entrega'), ['entrega','retirada','mesa'], true) ? $data['fulfillment'] : 'entrega';
$payment = trim((string)($data['payment_method'] ?? ''));
$paymentChange = isset($data['payment_change']) && $data['payment_change'] !== null ? (float)$data['payment_change'] : null;
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


if ($fulfillment === 'entrega' && $payment === 'dinheiro' && $paymentChange !== null && $paymentChange <= 0) {
    $paymentChange = null;
}

if ($fulfillment === 'entrega' && $payment === 'dinheiro' && $paymentChange !== null && $paymentChange <= (float)($data['delivery_fee'] ?? 0)) {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'Valor de troco inválido.']);
    exit;
}

if ($fulfillment === 'mesa' && (!is_array($address) || trim((string)($address['table'] ?? '')) === '')) {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'Nome é obrigatório.']);
    exit;
}

$subtotal = 0.0;
foreach ($items as $item) {
    $qty = max(1, (int)($item['qty'] ?? 1));
    $line = (float)($item['line_total'] ?? 0);
    $subtotal += $qty * $line;
}
$deliveryFee = in_array($fulfillment, ['retirada','mesa'], true) ? 0.0 : (float)($data['delivery_fee'] ?? 0);
$total = $subtotal + $deliveryFee;

if ($fulfillment === 'entrega' && $payment === 'dinheiro' && $paymentChange !== null && $paymentChange <= $total) {
    http_response_code(422);
    echo json_encode(['ok'=>false,'error'=>'O valor para troco deve ser maior que o total do pedido.']);
    exit;
}

$pdo = db();
$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        "INSERT INTO orders
        (customer_name, customer_phone, fulfillment, payment_method, payment_change, address_json, notes, subtotal, delivery_fee, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'novo')"
    );
    $stmt->execute([
        $customer, $phone, $fulfillment, $payment, $paymentChange,
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
