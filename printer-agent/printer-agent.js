import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { print } from "pdf-to-printer";

const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "config.json"), "utf8"));
let lastId = Number(cfg.lastOrderId || 0);

function money(v){ return Number(v).toFixed(2).replace(".",","); }

function makeReceipt(order){
  return new Promise((resolve,reject)=>{
    const file = path.join(dir, `pedido-${order.id}.pdf`);
    const doc = new PDFDocument({size:[226,900], margin:12});
    const stream = fs.createWriteStream(file);
    doc.pipe(stream);
    doc.fontSize(16).text("TH LANCHES",{align:"center"});
    doc.moveDown(0.4);
    doc.fontSize(11).text(`PEDIDO #${order.id}`,{align:"center"});
    doc.moveDown();
    for(const item of order.items){
      doc.fontSize(10).text(`${item.qty}x ${item.product_name}`);
      if(item.notes) doc.fontSize(8).text(`Obs.: ${item.notes}`);
      if(item.selections_json) doc.fontSize(8).text(item.selections_json);
    }
    doc.moveDown();
    doc.fontSize(11).text(`Subtotal: R$ ${money(order.subtotal)}`);
    doc.text(`Entrega: R$ ${money(order.delivery_fee)}`);
    doc.fontSize(13).text(`TOTAL: R$ ${money(order.total)}`);
    doc.moveDown();
    doc.fontSize(10).text(`Cliente: ${order.customer_name}`);
    doc.text(`Pagamento: ${order.payment_method}`);
    if(order.payment_change){
      doc.text(`Troco para: R$ ${money(order.payment_change)}`);
    }
    doc.text(order.fulfillment === "entrega" ? "ENTREGA" : (order.fulfillment === "mesa" ? "MESA" : "RETIRADA"));
    if(order.fulfillment === "mesa" && order.address?.table){
      doc.text(`Mesa: ${order.address.table}`);
    } else if(order.address){
      doc.text(`End.: ${order.address.street||""}, ${order.address.number||"s/n"}`);
      if(order.address.region) doc.text(`Bairro: ${order.address.region}`);
      if(order.address.reference) doc.text(`Ref.: ${order.address.reference}`);
    }
    if(order.notes) doc.text(`Obs. pedido: ${order.notes}`);
    doc.end();
    stream.on("finish",()=>resolve(file));
    stream.on("error",reject);
  });
}

async function poll(){
  const url = new URL(cfg.apiUrl);
  url.searchParams.set("since", String(lastId));
  url.searchParams.set("limit", "20");
  const r = await fetch(url, {headers:{"X-API-Key":cfg.apiKey}});
  const data = await r.json();
  if(!data.ok) throw new Error(data.error||"API error");

  for(const order of data.orders){
    lastId = Math.max(lastId, Number(order.id));
    if(order.status !== "novo") continue;
    const pdf = await makeReceipt(order);
    await print(pdf, {printer: cfg.printerName});
    console.log(`Impresso pedido #${order.id}`);
  }
  cfg.lastOrderId = lastId;
  fs.writeFileSync(path.join(dir,"config.json"), JSON.stringify(cfg,null,2));
}

console.log("TH Lanches Printer Agent iniciado.");
setInterval(()=>poll().catch(err=>console.error(err.message)), Math.max(2, Number(cfg.pollSeconds||3))*1000);
poll().catch(err=>console.error(err.message));
