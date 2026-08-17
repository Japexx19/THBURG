// Dados mockados do cardápio — troque as imagens em assets/products e assets/banner
// pelas fotos reais do estabelecimento. Nenhuma chamada de rede é feita: tudo roda
// no navegador, sem backend.

const STORE = {
  name: "TH Lanches",
  address: "Rua da Revoada, 88 — Centro",
  city: "Campos do Jordão, SP",
  logo: "assets/banner/logo-placeholder.svg",
  banner: "assets/banner/banner.jpg",
  openUntil: "01:00",
  cashbackPct: 5,
  deliveryEta: "40min - 1h10",
  minOrder: 15,
};

const CATEGORIES = ["Kits TH", "Lanches", "Cachorro-Quente", "Porções", "Bebidas"];

const PRODUCTS = [
  // ---------- Kits TH (do mais simples ao mais caro) ----------
  {
    id: "kit-trio-sliders",
    category: "Kits TH",
    mostOrdered: true,
    name: "Kit Trio Sliders",
    shortDesc: "3 mini cheeseburgers + fritas.",
    description: "Três mini cheeseburgers no pão macio, queijo derretido, acompanhados de batata frita crocante.",
    price: 40,
    image: "assets/products/kit-trio-sliders.jpg",
    modifierGroups: [],
  },
  {
    id: "kit-casal",
    category: "Kits TH",
    name: "Kit Casal",
    shortDesc: "2 lanches + porção grande + 2 refrigerantes.",
    description: "Dois lanches à sua escolha, uma porção grande de batata frita para dividir e dois refrigerantes gelados.",
    price: 50,
    image: "assets/products/kit-casal.jpg",
    modifierGroups: [],
  },
  {
    id: "kit-revoada-mania",
    category: "Kits TH",
    mostOrdered: true,
    tag: "O favorito!",
    name: "Kit TH Mania",
    shortDesc: "4 lanches, fritas grandes, anéis de cebola e molhos. Serve até 4.",
    description:
      "O kit mais pedido da Revoada: 4 lanches artesanais, uma porção grande de batata frita, anéis de cebola empanados e molhos da casa. Serve bem até 4 pessoas.",
    price: 120,
    image: "assets/products/kit-revoada-mania.jpg",
    modifierGroups: [
      {
        id: "molho-kit",
        title: "Escolha o molho",
        type: "single",
        max: 1,
        options: [
          { id: "molho-barbecue", name: "Barbecue Defumado", price: 0 },
          { id: "molho-especial", name: "Especial da Casa", price: 0 },
          { id: "molho-picante", name: "Picante", price: 0 },
        ],
      },
    ],
  },
  {
    id: "kit-revoada-supreme",
    category: "Kits TH",
    tag: "Novidade",
    name: "Kit TH Supreme",
    shortDesc: "20 mini burgers + porções variadas + baldes de fritas + 6 bebidas. Serve até 10.",
    description:
      "O kit definitivo pra galera: 20 mini burgers artesanais, porções variadas de fritas e anéis de cebola, baldes de fritas e 6 refrigerantes gelados. Serve até 10 pessoas — ideal pra churrasco, reunião ou happy hour.",
    price: 200,
    image: "assets/products/kit-revoada-supreme.jpg",
    modifierGroups: [],
  },

  // ---------- Lanches (do mais simples ao mais completo) ----------
  {
    id: "misto-quente",
    category: "Lanches",
    name: "Misto Quente",
    shortDesc: "Pão, presunto e queijo na chapa.",
    description: "O clássico de boteco: pão de forma, presunto e queijo prensados na chapa até derreter.",
    price: 10,
    image: "assets/products/misto-quente.jpg",
    modifierGroups: [],
  },
  {
    id: "x-burger",
    category: "Lanches",
    mostOrdered: true,
    name: "X-Burger",
    shortDesc: "Pão, hambúrguer na chapa e queijo derretido.",
    description: "O clássico de carrinho: pão macio, hambúrguer grelhado na chapa e queijo derretido.",
    price: 12,
    image: "assets/products/x-burger.jpg",
    modifierGroups: [
      {
        id: "ponto",
        title: "Escolha o ponto",
        type: "single",
        max: 1,
        options: [
          { id: "mal-passado", name: "Mal passado", price: 0 },
          { id: "ao-ponto", name: "Ao ponto", price: 0 },
          { id: "bem-passado", name: "Bem passado", price: 0 },
        ],
      },
    ],
  },
  {
    id: "bauru",
    category: "Lanches",
    name: "Bauru",
    shortDesc: "Pão francês, presunto, queijo, tomate e pepino.",
    description: "Pão francês crocante, presunto, queijo derretido, tomate e pepino em conserva.",
    price: 15,
    image: "assets/products/bauru.jpg",
    modifierGroups: [],
  },
  {
    id: "x-salada",
    category: "Lanches",
    name: "X-Salada",
    shortDesc: "Hambúrguer, queijo, alface, tomate e maionese da casa.",
    description: "Hambúrguer na chapa, queijo derretido, alface crocante, tomate fresco e maionese temperada da casa.",
    price: 15,
    image: "assets/products/x-salada.jpg",
    modifierGroups: [
      {
        id: "turbine-salada",
        title: "Turbine com:",
        type: "single",
        max: 1,
        options: [
          { id: "ovo-frito", name: "Ovo Frito", price: 4 },
          { id: "bacon", name: "Bacon Crocante", price: 6 },
        ],
      },
    ],
  },
  {
    id: "x-egg",
    category: "Lanches",
    name: "X-Egg",
    shortDesc: "Hambúrguer, queijo e ovo.",
    description: "Hambúrguer na chapa, queijo derretido e ovo frito com gema mole no pão macio.",
    price: 16,
    image: "assets/products/x-egg.jpg",
    modifierGroups: [],
  },
  {
    id: "x-bacon",
    category: "Lanches",
    name: "X-Bacon",
    shortDesc: "Hambúrguer, queijo e fatias generosas de bacon.",
    description: "Hambúrguer na chapa, queijo derretido e fatias generosas de bacon crocante no pão macio.",
    price: 18,
    image: "assets/products/x-bacon.jpg",
    modifierGroups: [],
  },
  {
    id: "x-tudo",
    category: "Lanches",
    mostOrdered: true,
    name: "X-Tudo TH",
    shortDesc: "Hambúrguer duplo, queijo, bacon, ovo, presunto e salada.",
    description:
      "O lanche completo da casa: dois hambúrgueres, queijo derretido, bacon crocante, ovo, presunto, alface, tomate e milho, tudo no pão.",
    price: 25,
    image: "assets/products/x-tudo.jpg",
    modifierGroups: [
      {
        id: "extras-tudo",
        title: "Adicionais",
        type: "multi",
        max: 3,
        options: [
          { id: "extra-bacon", name: "Bacon extra", price: 6 },
          { id: "extra-queijo", name: "Queijo extra", price: 5 },
          { id: "extra-ovo", name: "Ovo extra", price: 4 },
        ],
      },
    ],
  },

  // ---------- Cachorro-Quente ----------
  {
    id: "dog-simples",
    category: "Cachorro-Quente",
    name: "Cachorro-Quente Simples",
    shortDesc: "Pão, salsicha, ketchup e mostarda.",
    description: "Pão macio, salsicha suculenta, ketchup e mostarda — do jeito clássico de carrinho.",
    price: 10,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [],
  },
  {
    id: "dog-completo",
    category: "Cachorro-Quente",
    mostOrdered: true,
    name: "Cachorro-Quente Completo",
    shortDesc: "Salsicha, molhos, batata palha, milho e queijo.",
    description:
      "O clássico dog de boteco: salsicha, purê de batata, milho, ervilha, batata palha, queijo ralado e os molhos da casa.",
    price: 18,
    image: "assets/products/dog-completo.jpg",
    modifierGroups: [
      {
        id: "molho-dog",
        title: "Escolha uma Maionese",
        type: "multi",
        max: 5,
        options: [
          { id: "sem-maionese", name: "Não quero Maionese!", price: 0 },
          { id: "maionese-alho", name: "Maionese de Alho", price: 3 },
          { id: "maionese-picante", name: "Maionese Picante", price: 3 },
        ],
      },
    ],
  },

  // ---------- Porções ----------
  {
    id: "batata-frita",
    category: "Porções",
    name: "Batata Frita Crocante",
    shortDesc: "Porção individual de batata frita.",
    description: "Porção de batata frita crocante, temperada na hora.",
    price: 15,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
  {
    id: "aneis-cebola",
    category: "Porções",
    name: "Anéis de Cebola",
    shortDesc: "Anéis de cebola empanados e crocantes.",
    description: "Anéis de cebola empanados, fritos na hora, servidos com molho especial.",
    price: 18,
    image: "assets/products/aneis-cebola.jpg",
    modifierGroups: [],
  },

  // ---------- Bebidas ----------
  {
    id: "refrigerante-lata",
    category: "Bebidas",
    name: "Refrigerante Lata 350ml",
    shortDesc: "Lata gelada — Coca-Cola, Guaraná ou Fanta.",
    description: "Refrigerante gelado em lata de 350ml.",
    price: 6,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [
      {
        id: "sabor-refri",
        title: "Escolha o sabor",
        type: "single",
        max: 1,
        options: [
          { id: "coca", name: "Coca-Cola", price: 0 },
          { id: "guarana", name: "Guaraná Antarctica", price: 0 },
          { id: "fanta", name: "Fanta Laranja", price: 0 },
        ],
      },
    ],
  },
  {
    id: "suco-natural",
    category: "Bebidas",
    name: "Suco Natural",
    shortDesc: "Suco de laranja natural, feito na hora.",
    description: "Suco de laranja natural, espremido na hora.",
    price: 8,
    image: "assets/products/suco-natural.jpg",
    modifierGroups: [],
  },
];

const PAYMENT_METHODS = {
  online: [
    { id: "pix", name: "PIX", icon: "📱" },
    { id: "credito-online", name: "Cartão de Crédito", icon: "💳" },
    { id: "apple-pay", name: "Apple Pay", icon: "🍎" },
    { id: "google-pay", name: "Google Pay", icon: "🔺" },
  ],
  delivery: [
    { id: "dinheiro", name: "Dinheiro", icon: "💵" },
    { id: "credito-entrega", name: "Cartão de Crédito", icon: "💳" },
    { id: "debito-entrega", name: "Cartão de Débito", icon: "💳" },
    { id: "vale-refeicao", name: "Vale Refeição", icon: "🎫", fee: "Taxa adicional de 3%" },
    { id: "vale-alimentacao", name: "Vale Alimentação", icon: "🎫", fee: "Taxa adicional de 3%" },
  ],
};
