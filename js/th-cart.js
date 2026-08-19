
(() => {
  const cart = JSON.parse(localStorage.getItem("th_cart") || "[]");

  function save(){ localStorage.setItem("th_cart", JSON.stringify(cart)); render(); }
  function money(v){ return `R$ ${Number(v).toFixed(2).replace(".", ",")}`; }

  function findIndex(id){ return cart.findIndex(x => x.id === id); }

  function add(product, qty=1, notes="", selections=[]) {
    const unit = Number(product.price || product.preco || 0);
    const id = `${product.id || product.slug || product.name}-${JSON.stringify(selections)}-${notes}`;
    const i = findIndex(id);
    if(i >= 0) cart[i].qty += qty;
    else cart.push({id, productId: product.id || product.slug || product.name, name: product.name || product.title, unit, qty, notes, selections});
    save();
    open();
  }

  function change(id, delta){
    const i=findIndex(id); if(i<0)return;
    cart[i].qty += delta;
    if(cart[i].qty<=0) cart.splice(i,1);
    save();
  }

  function totals(){
    const subtotal=cart.reduce((s,x)=>s+x.unit*x.qty,0);
    const fee = 0;
    return {subtotal,fee,total:subtotal+fee};
  }

  function render(){
    const list=document.querySelector("#th-cart-list");
    const subtotal=document.querySelector("#th-cart-subtotal");
    const fee=document.querySelector("#th-cart-fee");
    const total=document.querySelector("#th-cart-total");
    const count=document.querySelector("#th-cart-count");
    if(!list)return;

    list.innerHTML="";
    if(!cart.length){
      list.innerHTML='<div class="th-cart-empty">Seu carrinho está vazio.<br>Escolha seus favoritos no cardápio 🍔</div>';
    } else {
      for(const x of cart){
        const row=document.createElement("div");
        row.className="th-cart-item";
        row.innerHTML=`
          <div class="th-cart-item-top">
            <div><div class="th-cart-item-name">${x.name}</div>
            <div class="th-cart-item-sub">${x.selections?.length ? x.selections.join(", ") : ""}${x.notes ? ` • ${x.notes}` : ""}</div></div>
            <div class="th-cart-item-price">${money(x.unit*x.qty)}</div>
          </div>
          <div class="th-qty">
            <button data-cart-minus="${x.id}">−</button><span>${x.qty}</span><button data-cart-plus="${x.id}">+</button>
          </div>`;
        list.appendChild(row);
      }
    }
    const t=totals();
    subtotal.textContent=money(t.subtotal); fee.textContent=money(t.fee); total.textContent=money(t.total);
    if(count) count.textContent=cart.reduce((s,x)=>s+x.qty,0);
  }

  function open(){
    document.querySelector(".th-cart-overlay")?.classList.add("is-open");
    document.querySelector(".th-cart-drawer")?.classList.add("is-open");
    render();
  }
  function close(){
    document.querySelector(".th-cart-overlay")?.classList.remove("is-open");
    document.querySelector(".th-cart-drawer")?.classList.remove("is-open");
  }

  function mount(){
    if(document.querySelector(".th-cart-drawer")){render();return;}
    document.body.insertAdjacentHTML("beforeend",`
      <div class="th-cart-overlay" id="th-cart-overlay"></div>
      <aside class="th-cart-drawer" aria-label="Carrinho TH">
        <div class="th-cart-head"><h2>Seu pedido</h2><button class="th-cart-close" aria-label="Fechar">×</button></div>
        <div class="th-cart-body" id="th-cart-list"></div>
        <div class="th-cart-summary">
          <div class="th-line"><span>Subtotal</span><b id="th-cart-subtotal">R$ 0,00</b></div>
          <div class="th-line"><span>Entrega</span><b id="th-cart-fee">R$ 0,00</b></div>
          <div class="th-line total"><span>Total</span><b id="th-cart-total">R$ 0,00</b></div>
          <button class="th-cart-cta" id="th-cart-checkout">Continuar</button>
        </div>
      </aside>`);
    document.querySelector("#th-cart-overlay").onclick=close;
    document.querySelector(".th-cart-close").onclick=close;
    document.addEventListener("click", e=>{
      const minus=e.target.closest("[data-cart-minus]"), plus=e.target.closest("[data-cart-plus]");
      if(minus)change(minus.dataset.cartMinus,-1);
      if(plus)change(plus.dataset.cartPlus,1);
    });
    document.querySelector("#th-cart-checkout").onclick=()=>{
      if(!cart.length)return;
      close();
      if(typeof window.navigate==="function") window.navigate("checkout-endereco");
      else alert("Carrinho pronto. O checkout será conectado na próxima etapa.");
    };
    render();
  }

  window.THCart={add,open,close,render,items:()=>[...cart],totals};
  document.addEventListener("DOMContentLoaded",mount);
})();
