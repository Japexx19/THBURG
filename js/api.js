// Comunicação do cardápio com o backend PHP/MySQL.
// Em produção, o frontend e a API devem ficar no mesmo domínio.
const TH_API = {
  createOrder: async (order) => {
    const response = await fetch("api/create_order.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(order),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Não foi possível enviar o pedido.");
    }
    return data;
  },
};
