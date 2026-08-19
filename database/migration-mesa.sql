ALTER TABLE orders MODIFY fulfillment ENUM('entrega','retirada','mesa') NOT NULL DEFAULT 'entrega';
