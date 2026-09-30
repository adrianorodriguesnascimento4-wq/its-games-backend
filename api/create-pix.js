const PRODUCTS = {
  "ff-100": { name: "100 Diamantes Free Fire", price: 3.00 },
  "ff-310": { name: "310 Diamantes Free Fire", price: 11.49 },
  "ff-520": { name: "520 Diamantes Free Fire", price: 17.49 },
  "rbx-40": { name: "40 Robux", price: 2.49 },
  "rbx-80": { name: "80 Robux", price: 4.00 },
  "rbx-400": { name: "400 Robux", price: 14.49 }
};
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://adrianorodriguesnascimento4-wq.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
module.exports = async (req, res) => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  } 
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { items } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" });
  }

  let total = 0;

  for (const item of items) {
    const product = PRODUCTS[item.id];

    if (!product) {
      return res.status(400).json({ error: "Produto inválido" });
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return res.status(400).json({ error: "Quantidade inválida" });
    }

    total += product.price * quantity;
  }

  const orderId =
    "TEST-" + Date.now().toString(36).toUpperCase();

  return res.status(200).json({
    test: true,
    order_id: orderId,
    status: "pending",
    total: Number(total.toFixed(2)),
    pix_copia_e_cola: "TESTE-PIX-" + orderId,
    message: "Pagamento de teste criado. Nenhum dinheiro foi cobrado."
  });
};
