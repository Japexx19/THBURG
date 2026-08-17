<?php
// Painel inicial da TH. Na próxima etapa adicionaremos login de administrador.
?>
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TH Lanches — Pedidos</title>
<style>
body{font-family:Arial,sans-serif;margin:0;background:#f5f5f5;color:#222}
header{background:#111;color:#fff;padding:16px 20px;position:sticky;top:0}
main{max-width:1100px;margin:20px auto;padding:0 14px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px}
.card{background:#fff;border-radius:12px;padding:16px;box-shadow:0 2px 12px #0001}
h1,h2{margin:0 0 8px}.muted{color:#666}.item{padding:8px 0;border-bottom:1px solid #eee}
.actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}
button{border:0;border-radius:8px;padding:9px 11px;cursor:pointer}
</style>
</head>
<body>
<header><strong>TH Lanches — Painel de Pedidos</strong></header>
<main>
  <p class="muted">Pedidos novos aparecem aqui. A impressão automática será ligada pelo agente da impressora.</p>
  <div id="orders" class="grid"></div>
</main>
<script>
const API_KEY = prompt("Chave da API do painel:");
let lastId = 0;
const labels = {novo:"Novo",aceito:"Aceito",preparo:"Em preparo",pronto:"Pronto",saiu_entrega:"Saiu para entrega",finalizado:"Finalizado",cancelado:"Cancelado"};

async function load(){
  const r=await fetch("../api/orders.php?since="+lastId,{headers:{"X-API-Key":API_KEY}});
  const d=await r.json();
  if(!d.ok) throw new Error(d.error||"Erro");
  for(const o of d.orders){ lastId=Math.max(lastId,Number(o.id)); add(o); }
}
function add(o){
  const el=document.createElement("div"); el.className="card"; el.id="order-"+o.id;
  const addr=o.address?`${o.address.street||""}, ${o.address.number||"s/n"} — ${o.address.region||""}`:"Retirada";
  el.innerHTML=`<h2>Pedido #${o.id}</h2>
  <div><b>${o.customer_name}</b> ${o.customer_phone||""}</div>
  <div class="muted">${o.fulfillment==="entrega"?"Entrega":"Retirada"} · ${o.payment_method}</div>
  <div class="item">${addr}</div>
  ${o.items.map(i=>`<div class="item"><b>${i.qty}x</b> ${i.product_name}<br><small>${i.selections_json||""} ${i.notes||""}</small></div>`).join("")}
  <p><b>Total: R$ ${Number(o.total).toFixed(2).replace(".",",")}</b></p>
  <div class="actions">${["aceito","preparo","pronto","saiu_entrega","finalizado","cancelado"].map(s=>`<button onclick="status(${o.id},'${s}')">${labels[s]}</button>`).join("")}</div>`;
  document.getElementById("orders").prepend(el);
}
async function status(id,s){
  await fetch("../api/update_status.php",{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":API_KEY},body:JSON.stringify({order_id:id,status:s})});
  const el=document.getElementById("order-"+id); if(el) el.querySelector("h2").insertAdjacentHTML("afterend",`<div class="muted">Status: ${labels[s]}</div>`);
}
load().catch(e=>alert(e.message));
setInterval(()=>load().catch(()=>{}),5000);
</script>
</body>
</html>
