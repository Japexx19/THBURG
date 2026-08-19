// Router simples baseado em hash + delegação de eventos. Sem framework, sem backend.

const routes = {
  home: () => renderHome(),
  produto: (params) => renderProduct(params.id),
  carrinho: () => renderCart(),
  "checkout-entrega": () => renderCheckoutEntrega(),
  "checkout-pagamento": () => renderCheckoutPagamento(),
  "checkout-resumo": () => renderCheckoutResumo(),
  confirmacao: () => renderConfirmation(),
};

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [name, id] = hash.split("/");
  if (!name) return { name: "home", params: {} };
  if (name === "produto") return { name: "produto", params: { id } };
  return { name, params: {} };
}

function navigate(routeName, productId) {
  if (routeName === "produto") {
    location.hash = `#/produto/${productId}`;
  } else if (routeName === "home") {
    location.hash = "#/";
  } else {
    location.hash = `#/${routeName}`;
  }
}

function render() {
  const { name, params } = parseHash();
  state.route = { name, params };
  const fn = routes[name] || routes.home;
  document.getElementById("app").innerHTML = fn(params);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  render();
});

// ---------- Delegação de eventos ----------
document.addEventListener("click", async (e) => {
  const gotoProduct = e.target.closest("[data-goto-product]");
  if (gotoProduct) {
    navigate("produto", gotoProduct.dataset.gotoProduct);
    return;
  }

  const goto = e.target.closest("[data-goto]");
  if (goto) {
    e.preventDefault();
    navigate(goto.dataset.goto);
    return;
  }

  const cat = e.target.closest("[data-cat]");
  if (cat) {
    state.activeCategory = cat.dataset.cat;
    const el = document.getElementById(`cat-${cssId(cat.dataset.cat)}`);
    render();
    requestAnimationFrame(() => {
      const target = document.getElementById(`cat-${cssId(cat.dataset.cat)}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return;
  }

  // ---- Produto ----
  const qtyBtn = e.target.closest("[data-qty]");
  if (qtyBtn) {
    const delta = Number(qtyBtn.dataset.qty);
    state.draft.qty = Math.max(1, state.draft.qty + delta);
    render();
    return;
  }

  const optionRow = e.target.closest("[data-toggle-option]");
  if (optionRow) {
    const { group, option, type, max } = optionRow.dataset;
    if (type === "single") {
      toggleSingleOption(group, option);
    } else {
      toggleMultiOption(group, option, Number(max));
    }
    render();
    return;
  }

  if (e.target.id === "add-to-cart-btn") {
    addDraftToCart();
    state.draft = null;
    renderToast("Item adicionado à sacola!");
    navigate("home");
    return;
  }

  // ---- Carrinho ----
  const removeItem = e.target.closest("[data-remove-item]");
  if (removeItem) {
    removeCartItem(removeItem.dataset.removeItem);
    render();
    return;
  }

  const cartQty = e.target.closest("[data-cart-qty]");
  if (cartQty) {
    const item = state.cart.find((i) => i.cartId === cartQty.dataset.cartQty);
    if (item) setCartQty(item.cartId, item.qty + Number(cartQty.dataset.delta));
    render();
    return;
  }

  if (e.target.id === "clear-cart") {
    clearCart();
    render();
    return;
  }

  // ---- Checkout: entrega ----
  const fulfillBtn = e.target.closest("[data-fulfillment]");
  if (fulfillBtn) {
    state.fulfillment = fulfillBtn.dataset.fulfillment;
    if (state.fulfillment !== "mesa") state.tableName = "";
    render();
    return;
  }

  if (e.target.id === "open-address-modal") {
    state.modal = { step: "form" };
    render();
    return;
  }

  if (e.target.id === "close-modal" || e.target.id === "modal-overlay") {
    state.modal = null;
    render();
    return;
  }

  if (e.target.id === "save-address") {
    const region = document.getElementById("addr-region").value.trim();
    const street = document.getElementById("addr-street").value.trim();
    const number = document.getElementById("addr-number").value.trim();

    if (!region) {
      renderToast("Informe o nome do bairro.");
      return;
    }
    if (!street) {
      renderToast("Informe a rua.");
      return;
    }
    if (!number) {
      renderToast("Informe o número.");
      return;
    }

    const complement = document.getElementById("addr-complement").value.trim();
    const reference = document.getElementById("addr-reference").value.trim();

    state.address = {
      street,
      number,
      complement,
      reference,
      region,
      city: STORE.city,
      eta: "0-15 min",
      fee: 0,
    };
    state.modal = null;
    render();
    return;
  }

  if (e.target.id === "continue-pagamento" && !e.target.disabled) {
    const name = document.getElementById("customer-name")?.value.trim() || "";
    const phone = document.getElementById("customer-phone")?.value.trim() || "";
    if (!name) {
      renderToast("Informe seu nome.");
      return;
    }
    if (state.fulfillment === "mesa") {
      const tableName = document.getElementById("table-name")?.value.trim() || "";
      if (!tableName) {
        renderToast("Informe o nome.");
        return;
      }
      state.tableName = tableName;
    }
    state.customer = { name, phone };
    navigate("checkout-pagamento");
    return;
  }

  // ---- Checkout: pagamento ----
  const pickPayment = e.target.closest("[data-pick-payment]");
  if (pickPayment) {
    state.paymentMethodId = pickPayment.dataset.pickPayment;
    if (state.paymentMethodId !== "dinheiro") {
      state.paymentChange = { needsChange: false, amount: "" };
    }
    render();
    return;
  }

  const changeChoice = e.target.closest("[data-change-needed]");
  if (changeChoice) {
    state.paymentChange.needsChange = changeChoice.dataset.changeNeeded === "yes";
    if (!state.paymentChange.needsChange) state.paymentChange.amount = "";
    render();
    return;
  }

  if (e.target.id === "continue-resumo" && !e.target.disabled) {
    if (state.fulfillment === "entrega" && state.paymentMethodId === "dinheiro" && state.paymentChange.needsChange) {
      const amount = Number(state.paymentChange.amount);
      const total = orderTotal();
      if (!Number.isFinite(amount) || amount <= total) {
        renderToast(`Informe um valor de troco maior que R$ ${total.toFixed(2).replace(".", ",")}.`);
        return;
      }
    }
    navigate("checkout-resumo");
    return;
  }

  // ---- Checkout: resumo ----
  if (e.target.id === "finish-order") {
    const btn = e.target;
    btn.disabled = true;
    btn.textContent = "Enviando pedido...";
    try {
      const result = await TH_API.createOrder({
        customer_name: state.customer.name,
        customer_phone: state.customer.phone,
        fulfillment: state.fulfillment,
        payment_method: state.paymentMethodId,
        payment_change: state.fulfillment === "entrega" && state.paymentMethodId === "dinheiro" && state.paymentChange.needsChange ? Number(state.paymentChange.amount) : null,
        address: state.fulfillment === "entrega" ? state.address : (state.fulfillment === "mesa" ? { table: state.tableName } : null),
        delivery_fee: deliveryFee(),
        items: state.cart.map(item => ({
          product_id: item.productId,
          name: item.name,
          qty: item.qty,
          line_total: item.lineTotal,
          selections: item.selections,
          notes: item.notes || ""
        })),
      });
      state.lastOrderId = result.order_id;
      clearCart();
      state.address = null;
      state.tableName = "";
      state.fulfillment = "entrega";
      state.paymentMethodId = null;
      state.paymentChange = { needsChange: false, amount: "" };
      navigate("confirmacao");
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "Enviar pedido";
      renderToast(err.message || "Não foi possível enviar o pedido.");
    }
    return;
  }
});

document.addEventListener("input", (e) => {
  if (e.target.id === "obs-input" && state.draft) {
    state.draft.notes = e.target.value;
  }
  if (e.target.id === "change-amount") {
    state.paymentChange.amount = e.target.value;
  }
});
