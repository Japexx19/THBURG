// Estado global da aplicação (tudo em memória + localStorage, sem backend).

const state = {
  route: { name: "home", params: {} },
  cart: [],
  address: null,
  customer: { name: "", phone: "" },
  fulfillment: "entrega", // "entrega" | "retirada"
  paymentMethodId: null,
  draft: null, // seleção em progresso na tela de produto
  modal: null, // { step: "form" }
  activeCategory: "Mais Pedidos",
};

const CART_KEY = "burger-na-brasa:cart";

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    state.cart = raw ? JSON.parse(raw) : [];
  } catch (e) {
    state.cart = [];
  }
}

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.lineTotal * item.qty, 0);
}

function cartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function deliveryFee() {
  return state.fulfillment === "retirada" ? 0 : state.address ? state.address.fee : 0;
}

function orderTotal() {
  return cartTotal() + deliveryFee();
}

function startDraft(product) {
  state.draft = {
    product,
    qty: 1,
    notes: "",
    selections: {}, // groupId -> [optionId,...]
  };
}

function draftBasePrice() {
  if (!state.draft) return 0;
  let total = state.draft.product.price;
  const { selections, product } = state.draft;
  product.modifierGroups.forEach((group) => {
    (selections[group.id] || []).forEach((optId) => {
      const opt = group.options.find((o) => o.id === optId);
      if (opt) total += opt.price;
    });
  });
  return total;
}

function toggleSingleOption(groupId, optionId) {
  const current = state.draft.selections[groupId] || [];
  state.draft.selections[groupId] = current[0] === optionId ? [] : [optionId];
}

function toggleMultiOption(groupId, optionId, max) {
  const current = state.draft.selections[groupId] || [];
  let next;
  if (current.includes(optionId)) {
    next = current.filter((id) => id !== optionId);
  } else {
    if (current.length >= max) return; // limite atingido
    next = [...current, optionId];
  }
  state.draft.selections[groupId] = next;
}

function addDraftToCart() {
  const { product, qty, notes, selections } = state.draft;
  const selectionList = [];
  product.modifierGroups.forEach((group) => {
    (selections[group.id] || []).forEach((optId) => {
      const opt = group.options.find((o) => o.id === optId);
      if (opt) {
        selectionList.push({
          groupTitle: group.title,
          optionId: opt.id,
          optionName: opt.name,
          price: opt.price,
        });
      }
    });
  });
  const lineTotal = draftBasePrice();
  state.cart.push({
    cartId: `${product.id}-${Date.now()}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    notes,
    selections: selectionList,
    lineTotal,
    qty,
  });
  saveCart();
}

function removeCartItem(cartId) {
  state.cart = state.cart.filter((i) => i.cartId !== cartId);
  saveCart();
}

function setCartQty(cartId, qty) {
  const item = state.cart.find((i) => i.cartId === cartId);
  if (!item) return;
  if (qty <= 0) {
    removeCartItem(cartId);
    return;
  }
  item.qty = qty;
  saveCart();
}

function clearCart() {
  state.cart = [];
  saveCart();
}
