// Funções puras que retornam HTML (string) para cada tela.

function money(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function productMinPrice(p) {
  return p.price;
}

// ---------- HOME ----------
function renderHome() {
  const mostOrdered = PRODUCTS.filter((p) => p.category === "Combos");
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: PRODUCTS.filter((p) => p.category === cat),
  })).filter((g) => g.items.length);

  return `
    <img class="banner" src="${STORE.banner}" alt="Banner ${STORE.name}" />

    <div class="store-card">
      <img class="logo" src="${STORE.logo}" alt="Logo ${STORE.name}" />
      <div class="info">
        <div class="open">Aberto até ${STORE.openUntil}</div>
        <h1>${STORE.name}</h1>
        <div class="sub">${STORE.address} — ${STORE.city}</div>
      </div>
    </div>

    <div class="store-meta">
      <div>
        <div class="status-open">🟢 Loja aberta</div>
      </div>
      <div>
        <div class="label">🚴 Entrega</div>
        <div class="value">${STORE.deliveryEta}</div>
      </div>
      <div>
        <div class="points-label">⭐ Ganhe pontos</div>
      </div>
    </div>

    <div class="actions-row">
      <a href="#" class="login-link">Fazer login &rsaquo;</a>
    </div>

    <nav class="category-nav" id="category-nav">
      <button data-cat="Mais Pedidos" class="${state.activeCategory === "Mais Pedidos" ? "active" : ""}">Mais Pedidos</button>
      ${CATEGORIES.map(
        (c) => `<button data-cat="${c}" class="${c === state.activeCategory ? "active" : ""}">${c}</button>`
      ).join("")}
    </nav>

    <h2 class="section-title" id="cat-mais-pedidos">Mais Pedidos</h2>
    <div class="highlight-scroll">
      ${mostOrdered
        .map(
          (p, i) => `
        <div class="highlight-card" data-goto-product="${p.id}">
          <div class="thumb-wrap">
            <img class="thumb" src="${p.image}" alt="${p.name}" />
            ${p.tag ? `<span class="badge ${p.tag === "Novidade" ? "new" : ""}">${p.tag === "Novidade" ? "" : "🔥 "}${p.tag}</span>` : ""}
          </div>
          <div class="name">${p.name}</div>
          <div class="from">A partir de</div>
          <div class="price">${money(productMinPrice(p))}</div>
        </div>`
        )
        .join("")}
    </div>

    ${grouped
      .map(
        (g) => `
      <h2 class="section-title" id="cat-${cssId(g.cat)}">${g.cat}</h2>
      ${g.items.length ? g.items
        .map(
          (p) => `
        <div class="product-row" data-goto-product="${p.id}">
          <div class="info">
            ${p.tag ? `<span class="badge ${p.tag === "Novidade" ? "new" : ""}" style="position:static;display:inline-block;margin-bottom:6px;">${p.tag === "Novidade" ? "" : "🔥 "}${p.tag}</span>` : ""}
            <div class="name">${p.name}</div>
            <div class="desc">${p.shortDesc}</div>
            <div class="price">${money(p.price)}</div>
          </div>
          <img class="thumb" src="${p.image}" alt="${p.name}" />
        </div>`
        )
        .join("") : `<div class="empty-state">Nenhum produto cadastrado nesta categoria.</div>`}
    `
      )
      .join("")}

    ${renderCartBar()}
  `;
}

function cssId(str) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
}

function renderCartBar() {
  if (state.cart.length === 0) return "";
  return `
    <div class="sticky-bar" id="cart-bar" style="position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:var(--max-width);background:var(--green);border:none;cursor:pointer;" data-goto="carrinho">
      <span style="color:#fff;font-weight:700;display:flex;align-items:center;gap:8px;">🛍️ Ver sacola <span style="background:#fff;color:var(--green);border-radius:10px;padding:1px 7px;font-size:0.75rem;">${cartCount()}</span></span>
      <span style="color:#fff;font-weight:700;margin-left:auto;">${money(cartTotal())}</span>
    </div>
  `;
}

// ---------- PRODUTO ----------
function renderProduct(productId) {
  const product = findProduct(productId);
  if (!product) return `<div class="empty-state">Produto não encontrado.</div>`;
  if (!state.draft || state.draft.product.id !== productId) startDraft(product);

  const total = draftBasePrice() * state.draft.qty;

  return `
    <div class="product-page">
      <div class="hero">
        <img src="${product.image}" alt="${product.name}" />
        <button class="round-btn back" data-goto="home">&larr;</button>
        <button class="round-btn share" title="Compartilhar">&#8635;</button>
      </div>
      <div class="product-body">
        <h1>${product.name}</h1>
        <div class="desc">${product.description}</div>
        <div class="from-price">A partir de <strong>${money(product.price)}</strong></div>

        ${product.modifierGroups
          .map((group) => {
            const picked = state.draft.selections[group.id] || [];
            return `
          <div class="modifier-group" data-group="${group.id}">
            <div class="head">
              <h2>${group.title}</h2>
              <span class="hint">${group.type === "single" ? "Escolha 1 opção" : `Escolha até ${group.max} opções`}</span>
            </div>
            <div class="counter">${picked.length} / ${group.max}</div>
            ${group.options
              .map((opt) => {
                const isPicked = picked.includes(opt.id);
                return `
              <div class="option-row ${isPicked ? "picked" : ""}" data-toggle-option data-group="${group.id}" data-option="${opt.id}" data-type="${group.type}" data-max="${group.max}">
                <div class="left">
                  <span class="opt-name">${opt.name}</span>
                </div>
                <div>
                  ${opt.price > 0 ? `<span class="opt-price">+${money(opt.price)}</span>` : ""}
                </div>
                <div class="${group.type === "single" ? "radio-dot" : "plus-btn"} ${isPicked ? "checked" : ""}">${group.type === "single" ? "" : isPicked ? "✓" : "+"}</div>
              </div>`;
              })
              .join("")}
          </div>`;
          })
          .join("")}

        <span class="obs-label">Observações?</span>
        <textarea class="obs-input" id="obs-input" placeholder="Observações sobre o produto">${state.draft.notes}</textarea>
      </div>

      <div class="sticky-bar">
        <div class="qty-stepper">
          <button data-qty="-1">&minus;</button>
          <span>${state.draft.qty}</span>
          <button data-qty="1">&plus;</button>
        </div>
        <button class="btn-primary" id="add-to-cart-btn">Adicionar ${money(total)}</button>
      </div>
    </div>
  `;
}

// ---------- CARRINHO ----------
function renderCart() {
  if (state.cart.length === 0) {
    return `
      ${renderPageHeader("Sua sacola", { back: "home" })}
      <div class="empty-state">
        <p>Sua sacola está vazia.</p>
        <a href="#" data-goto="home" class="add-more">Ver cardápio</a>
      </div>
    `;
  }

  const suggestions = PRODUCTS.slice(4, 9);

  return `
    ${renderPageHeader("Sua sacola", { back: "home", action: { label: "Limpar", id: "clear-cart" } })}

    ${state.cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="info">
          <div class="name">${item.name}</div>
          ${
            item.selections.length
              ? `<div class="mods">${item.selections.map((s) => `${s.groupTitle} (1) ${s.optionName}`).join(" · ")}</div>`
              : ""
          }
          <div class="price">${money(item.lineTotal)}</div>
        </div>
        <div class="qty-controls">
          <button data-remove-item="${item.cartId}" title="Remover">🗑️</button>
          <div class="row">
            <button data-cart-qty="${item.cartId}" data-delta="-1">&minus;</button>
            <span>${item.qty}</span>
            <button data-cart-qty="${item.cartId}" data-delta="1">&plus;</button>
          </div>
        </div>
      </div>`
      )
      .join("")}

    <a href="#" data-goto="home" class="add-more">Adicionar mais itens</a>

    <div class="suggest-title">Peça também</div>
    <div class="suggest-scroll">
      ${suggestions
        .map(
          (p) => `
        <div class="suggest-card" data-goto-product="${p.id}">
          <img class="thumb" src="${p.image}" alt="${p.name}" />
          <div class="name">${p.name}</div>
          <div class="price">${money(p.price)}</div>
        </div>`
        )
        .join("")}
    </div>

    ${renderStepDots(0)}
    <div class="sticky-bar">
      <button class="btn-primary" data-goto="checkout-entrega">Continuar para Endereço</button>
    </div>
  `;
}

function renderPageHeader(title, { back, action } = {}) {
  return `
    <div class="page-header">
      ${back ? `<button class="back-circle" data-goto="${back}">&larr;</button>` : "<span></span>"}
      <h1>${title}</h1>
      ${action ? `<button class="link-action" id="${action.id}">${action.label}</button>` : "<span style='width:36px'></span>"}
    </div>
  `;
}

function renderStepDots(activeIdx) {
  const steps = ["Sacola", "Endereço", "Pagamento", "Resumo"];
  return `
    <div class="step-dots">
      ${steps
        .map((s, i) => {
          const dot = `<span class="dot ${i <= activeIdx ? "done" : ""}"></span>`;
          const line = i < steps.length - 1 ? `<span class="line ${i < activeIdx ? "done" : ""}"></span>` : "";
          return dot + line;
        })
        .join("")}
    </div>
  `;
}

// ---------- CHECKOUT: ENTREGA ----------
function renderCheckoutEntrega() {
  return `
    ${renderPageHeader("Entrega e agendamento", { back: "carrinho" })}
    <div class="checkout-section">
      <div class="q">Seus dados</div>
      <label class="field-label">Nome *</label>
      <input class="field-input" id="customer-name" value="${state.customer.name || ""}" placeholder="Seu nome" />
      <label class="field-label">WhatsApp</label>
      <input class="field-input" id="customer-phone" value="${state.customer.phone || ""}" placeholder="(88) 99999-9999" inputmode="tel" />

      <div class="q">Como deseja receber seu pedido?</div>
      <div class="fulfillment-toggle">
        <button class="${state.fulfillment === "entrega" ? "active" : ""}" data-fulfillment="entrega">🚚<br/>Entrega</button>
        <button class="${state.fulfillment === "retirada" ? "active" : ""}" data-fulfillment="retirada">🛍️<br/>Retirada</button>
        <button class="${state.fulfillment === "mesa" ? "active" : ""}" data-fulfillment="mesa">🍽️<br/>Mesa</button>
      </div>

      ${
        state.fulfillment === "entrega"
          ? `
        <div class="q">Selecione o endereço de entrega</div>
        <button class="add-address-btn ${state.address ? "selected" : ""}" id="open-address-modal">📍 Adicionar novo endereço</button>
        ${
          state.address
            ? `
          <div class="address-card">
            <span class="check">✔️</span>
            <div class="street">${state.address.street}, ${state.address.number}</div>
            <div class="sub">Bairro: ${state.address.region}</div>
            <div class="eta">🕒 ${state.address.eta}</div>
            <div class="fee">🚚 ${money(state.address.fee)}</div>
          </div>`
            : ""
        }
      `
          : state.fulfillment === "mesa"
            ? `
        <div class="q">Você está no local? Informe o seu nome.</div>
        <label class="field-label">Mesa *</label>
        <input class="field-input" id="table-number" value="${state.tableName || ""}" placeholder="Ex.: 5" inputmode="numeric" />
        <div class="q">Seu pedido será preparado para a mesa informada.</div>
      `
            : `<div class="q">Retire seu pedido diretamente em ${STORE.address}, ${STORE.city}.</div>`
      }
    </div>

    ${renderStepDots(1)}
    <div class="sticky-bar">
      <button class="btn-primary" id="continue-pagamento" ${
        state.fulfillment === "entrega" && !state.address ? "disabled" : ""
      }>Continuar para Pagamento</button>
    </div>

    ${state.modal ? renderAddressModal() : ""}
  `;
}

function renderAddressModal() {
  return modalShell(
    "Informe seu endereço",
    `
    <div class="modal-body">
      <label class="field-label">Bairro *</label>
      <input class="field-input" id="addr-region" placeholder="Digite o nome do seu bairro" autocomplete="address-level2" />

      <label class="field-label">Rua *</label>
      <input class="field-input" id="addr-street" placeholder="Nome da rua" autocomplete="street-address" />

      <div class="field-row">
        <div>
          <label class="field-label">Número *</label>
          <input class="field-input" id="addr-number" placeholder="Nº" inputmode="numeric" />
        </div>
        <div>
          <label class="field-label">Complemento</label>
          <input class="field-input" id="addr-complement" placeholder="Apto, casa..." />
        </div>
      </div>

      <label class="field-label">Ponto de referência</label>
      <input class="field-input" id="addr-reference" placeholder="Ex.: próximo à praça" />

      <div style="margin-top:18px;">
        <button class="btn-primary" style="width:100%;" id="save-address">Salvar endereço</button>
      </div>
    </div>
    `
  );
}

function modalShell(title, body) {
  return `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-sheet">
        <div class="modal-head">
          <h2>${title}</h2>
          <button class="close" id="close-modal">&times;</button>
        </div>
        ${body}
      </div>
    </div>
  `;
}

// ---------- CHECKOUT: PAGAMENTO ----------
function renderCheckoutPagamento() {
  const renderGroup = (title, icon, items) => `
    <div class="payment-group-title">${icon} ${title}</div>
    ${items
      .map(
        (m) => `
      <div class="payment-option ${state.paymentMethodId === m.id ? "picked" : ""}" data-pick-payment="${m.id}">
        <div class="left">
          <span>${m.icon}</span>
          <div>
            <div>${m.name}</div>
            ${m.fee ? `<div class="fee-tag">${m.fee}</div>` : ""}
          </div>
        </div>
        <div class="radio-dot ${state.paymentMethodId === m.id ? "checked" : ""}"></div>
      </div>`
      )
      .join("")}
  `;

  return `
    ${renderPageHeader("Forma de pagamento", { back: "checkout-entrega" })}
    <div class="checkout-section">
      ${state.fulfillment === "entrega"
        ? renderGroup("Pagar na entrega", "🏠", PAYMENT_METHODS.delivery)
        : renderGroup(state.fulfillment === "mesa" ? "Pagar no local" : "Pagar na retirada", state.fulfillment === "mesa" ? "🍽️" : "🛍️", PAYMENT_METHODS.online.concat(PAYMENT_METHODS.delivery))}

      ${state.fulfillment === "entrega" && state.paymentMethodId === "dinheiro" ? `
        <div class="change-box">
          <div class="change-title">Precisa de troco?</div>
          <div class="change-actions">
            <button type="button" class="change-choice ${!state.paymentChange.needsChange ? "picked" : ""}" data-change-needed="no">Não preciso</button>
            <button type="button" class="change-choice ${state.paymentChange.needsChange ? "picked" : ""}" data-change-needed="yes">Sim, preciso</button>
          </div>
          ${state.paymentChange.needsChange ? `
            <label class="change-input-label" for="change-amount">Troco para quanto?</label>
            <div class="change-input-wrap"><span>R$</span><input id="change-amount" type="number" min="0.01" step="0.01" inputmode="decimal" value="${state.paymentChange.amount || ""}" placeholder="Ex.: 50,00"></div>
          ` : ""}
        </div>
      ` : ""}
    </div>

    ${renderStepDots(2)}
    <div class="sticky-bar">
      <button class="btn-primary" id="continue-resumo" ${!state.paymentMethodId ? "disabled" : ""}>Revisar Pedido</button>
    </div>
  `;
}

// ---------- CHECKOUT: RESUMO ----------
function renderCheckoutResumo() {
  const allMethods = [...PAYMENT_METHODS.online, ...PAYMENT_METHODS.delivery];
  const method = allMethods.find((m) => m.id === state.paymentMethodId);

  return `
    ${renderPageHeader("Resumo do pedido", { back: "checkout-pagamento" })}
    <div class="checkout-section">
      <div class="payment-option picked">
        <div class="left">
          <span>${method ? method.icon : ""}</span>
          <div>
            <div>${method ? method.name : "Selecione uma forma de pagamento"}</div>
            ${state.fulfillment === "entrega" && state.paymentMethodId === "dinheiro" && state.paymentChange.needsChange && state.paymentChange.amount ? `<small class="muted">Troco para R$ ${Number(state.paymentChange.amount).toFixed(2).replace(".", ",")}</small>` : ""}
          </div>
        </div>
        <div class="radio-dot checked"></div>
      </div>
    </div>

    <div class="summary-box">
      <div class="row"><span>Subtotal</span><span>${money(cartTotal())}</span></div>
      <div class="row"><span>${state.fulfillment === "mesa" ? "Mesa" : "Taxa de entrega"}</span><span>${state.fulfillment === "mesa" ? state.tableName : money(deliveryFee())}</span></div>
      <div class="row total"><span>Total</span><span>${money(orderTotal())}</span></div>
    </div>

    ${renderStepDots(3)}
    <div class="sticky-bar">
      <button class="btn-primary" id="finish-order">Enviar pedido</button>
    </div>
  `;
}

// ---------- CONFIRMAÇÃO ----------
function renderConfirmation() {
  const orderId = state.lastOrderId || "000000";
  return `
    <div class="confirm-page">
      <div class="icon">✅</div>
      <h1>Pedido recebido com sucesso!</h1>
      <p>Seu pedido foi enviado para a TH. A cozinha já pode recebê-lo e imprimir a comanda.</p>
      <div class="order-id">Pedido #${orderId}</div>
      <div>
        <button class="btn-primary" data-goto="home" style="max-width:260px;">Voltar ao cardápio</button>
      </div>
    </div>
  `;
}

function renderToast(message) {
  const root = document.getElementById("toast-root");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}
