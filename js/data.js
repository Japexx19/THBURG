// Dados mockados do cardápio — troque as imagens em assets/products e assets/banner
// pelas fotos reais do estabelecimento. Nenhuma chamada de rede é feita: tudo roda
// no navegador, sem backend.

const STORE = {
  name: "TH BURG",
  address: "Rodoviaria, box10, sn - centro",
  city: "Massapê, CE",
  logo: "assets/banner/logo.jpg",
  banner: "assets/banner/banner.jpg",
  openUntil: "23:00",
  cashbackPct: 0,
  deliveryEta: "0min - 15min",
  minOrder: 15,
};

const CATEGORIES = ["Combos", "Hambúrgueres", "Hambúrgueres Artesanal", "Pastéis", "Bebidas"];

const PRODUCTS = [
  // ---------- Kits TH (do mais simples ao mais caro) ----------
{
    id: "kit-casal",
    category: "Combos",
    name: "TH Casal",
    shortDesc: "2 lanches + porção grande + 2 refrigerantes.",
    description: "Dois lanches à sua escolha, uma porção grande de batata frita para dividir e dois refrigerantes gelados.",
    price: 50,
    image: "assets/products/kit-casal.jpg",
    modifierGroups: [],
  },
  {
    id: "kit-revoada-mania",
    category: "Combos",
    mostOrdered: true,
    tag: "O favorito!",
    name: "TH Trio",
    shortDesc: "4 lanches, fritas grandes, anéis de cebola e molhos. Serve até 4.",
    description:
      "O kit mais pedido da Revoada: 4 lanches artesanais, uma porção grande de batata frita, anéis de cebola empanados e molhos da casa. Serve bem até 4 pessoas.",
    price: 120,
    image: "assets/products/kit-revoada-mania.jpg",
    modifierGroups: [],
  },
  {
    id: "kit-revoada-supreme",
    category: "Combos",
    tag: "Novidade",
    name: "TH Squad",
    shortDesc: "20 mini burgers + porções variadas + baldes de fritas + 6 bebidas. Serve até 10.",
    description:
      "O kit definitivo pra galera: 20 mini burgers artesanais, porções variadas de fritas e anéis de cebola, baldes de fritas e 6 refrigerantes gelados. Serve até 10 pessoas — ideal pra churrasco, reunião ou happy hour.",
    price: 200,
    image: "assets/products/kit-revoada-supreme.jpg",
    modifierGroups: [],
  },

  // ---------- Lanches (do mais simples ao mais completo) ----------
      {
    id: "tapera",
    category: "Hambúrgueres",
    name: "Tapera",
    shortDesc: "Pão brioche, carne, queijo, presunto, batata palha, alface, molho especial e maionese temperada.",
    description: "Pão brioche, carne, queijo, presunto, batata palha, alface, molho especial e maionese temperada.",
    price: 11,
    image: "assets/products/x-bacon.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },

    {
    id: "salgadinho",
    category: "Hambúrgueres",
    name: "Salgadinho",
    shortDesc: "Pão brioche, blend 150g, batata crispy, queijo cheddar, bacon duplo, alface, tomate e molho especial + 100g de batata.",
    description: "Pão brioche, blend 150g, batata crispy, queijo cheddar, bacon duplo, alface, tomate e molho especial + 100g de batata.",
    price: 14,
    image: "assets/products/x-bacon.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
   {
    id: "tuina",
    category: "Hambúrgueres",
    name: "Tuina",
    shortDesc: "Pão brioche, carne, ovo, calabresa, presunto, queijo, alface, cebola, molho especial e maionese temperada.",
    description: "Pão brioche, carne, ovo, calabresa, presunto, queijo, alface, cebola, molho especial e maionese temperada.",
    price: 16,
    image: "assets/products/x-bacon.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
   {
    id: "Tangente",
    category: "Hambúrgueres",
    mostOrdered: true,
    name: "Tangente",
    shortDesc: "Pão brioche, carne, ovo, queijo coalho, queijo cheddar, bacon, cebola, molho especial e maionese temperada.",
    description:
      "Pão brioche, carne, ovo, queijo coalho, queijo cheddar, bacon, cebola, molho especial e maionese temperada.",
    price: 17,
    image: "assets/products/x-tudo.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
    {
    id: "Mirim",
    category: "Hambúrgueres",
    mostOrdered: true,
    name: "Mirim",
    shortDesc: "Pão brioche, frango desfiado, calabresa, presunto, queijo cheddar, cebola, alface, molho especial e maionese temperada.",
    description: "Pão brioche, frango desfiado, calabresa, presunto, queijo cheddar, cebola, alface, molho especial e maionese temperada.",
    price: 18,
    image: "assets/products/x-burger.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
    {
    id: "Pé da serra",
    category: "Hambúrgueres",
    name: "Pé da serra",
    shortDesc: "Pão brioche, 2 carnes, ovo, 2 presuntos, 2 queijos, alface, cebola, molho especial e maionese temperada.",
    description: "Pão brioche, 2 carnes, ovo, 2 presuntos, 2 queijos, alface, cebola, molho especial e maionese temperada.",
    price: 18,
    image: "assets/products/x-egg.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },

  {
    id: "Massapê",
    category: "Hambúrgueres",
    name: "Massapê",
    shortDesc: "Pão brioche, carne de sol, ovo, calabresa, presunto, queijo cheddar, cebola, alface, molho especial e maionese temperada.",
    description: "Pão brioche, carne de sol, ovo, calabresa, presunto, queijo cheddar, cebola, alface, molho especial e maionese temperada.",
    price: 19,
    image: "assets/products/misto-quente.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
  {
    id: "Mumbaba",
    category: "Hambúrgueres",
    name: "Mumbaba",
    shortDesc: "Pão americano, blend 300g, queijo cheddar, bacon, alface, tomate e molho especial + 100g de batata.",
    description: "Pão americano, blend 300g, queijo cheddar, bacon, alface, tomate e molho especial + 100g de batata.",
    price: 23,
    image: "assets/products/bauru.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
  {
    id: "Padre Linhares",
    category: "Hambúrgueres",
    name: "Padre Linhares",
    shortDesc: "Pão americano, blend 150g, frango, queijo cheddar, bacon, alface, cebola, tomate e molho especial + 100g de batata.",
    description: "Pão americano, blend 150g, frango, queijo cheddar, bacon, alface, cebola, tomate e molho especial + 100g de batata.",
    price: 26,
    image: "assets/products/x-salada.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ]
  },

  // ---------- Hambúrgueres Artesanal ----------
    {
    id: "CARTUCHA",
    category: "Hambúrgueres Artesanal",
    name: "CARTUCHA",
    shortDesc: "Carne artesanal 110g, queijo, alface, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, queijo, alface, cebola caramelizada, molho especial e maionese temperada.",
    price: 15,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
  {
    id: "BANDEIRA BRANCA",
    category: "Hambúrgueres Artesanal",
    name: "BANDEIRA BRANCA",
    shortDesc: "Carne artesanal 110g, cheddar, queijo, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, cheddar, queijo, cebola caramelizada, molho especial e maionese temperada.",
    price: 16,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
  {
    id: "MARAMBAIA",
    category: "Hambúrgueres Artesanal",
    name: "MARAMBAIA",
    shortDesc: "Carne artesanal 110g, queijo, calabresa, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, queijo, calabresa, cebola caramelizada, molho especial e maionese temperada.",
    price: 16,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
    {
    id: "ALTO DA BOA VISTA",
    category: "Hambúrgueres Artesanal",
    name: "ALTO DA BOA VISTA",
    shortDesc: "Carne artesanal 110g, queijo, ovo, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, queijo, ovo, cebola caramelizada, molho especial e maionese temperada.",
    price: 16,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
    {
    id: "CENTRO",
    category: "Hambúrgueres Artesanal",
    name: "CENTRO",
    shortDesc: "Carne artesanal 110g, bacon, queijo, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, bacon, queijo, cebola caramelizada, molho especial e maionese temperada.",
    price: 17,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },
    {
    id: "ALTO DA CADEIA",
    category: "Hambúrgueres Artesanal",
    name: "ALTO DA CADEIA",
    shortDesc: "Carne artesanal 110g, queijo, carne de sol, queijo, catupiry, cebola caramelizada, molho especial e maionese temperada.",
    description: "Carne artesanal 110g, queijo, carne de sol, queijo, catupiry, cebola caramelizada, molho especial e maionese temperada.",
    price: 20,
    image: "assets/products/dog-simples.jpg",
    modifierGroups: [
      {
        id: "pao",
        title: "Escolha o pão",
        type: "single",
        max: 1,
        required: true,
        options: [
          { id: "pao-brioche", name: "Pão brioche", price: 0 },
          { id: "pao-americano", name: "Pão americano", price: 0 },
          { id: "pao-arabe", name: "Pão árabe", price: 0 }
        ]
      }
    ],
  },

  // ---------- Pastéis ----------
  {
    id: "pastel-de-vento",
    category: "Pastéis",
    name: "Pastel de Vento",
    shortDesc: "",
    description: "",
    price: 4,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-queijo",
    category: "Pastéis",
    name: "Pastel de Queijo",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-frango",
    category: "Pastéis",
    name: "Pastel de Frango",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-calabresa",
    category: "Pastéis",
    name: "Pastel de Calabresa",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-misto",
    category: "Pastéis",
    name: "Pastel de Misto",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-presunto",
    category: "Pastéis",
    name: "Pastel de Presunto",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-moida",
    category: "Pastéis",
    name: "Pastel de Carne Moída",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-pizza",
    category: "Pastéis",
    name: "Pastel de Pizza",
    shortDesc: "",
    description: "",
    price: 6,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-moida-queijo",
    category: "Pastéis",
    name: "Pastel de Carne Moida + Queijo",
    shortDesc: "",
    description: "",
    price: 7,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol",
    category: "Pastéis",
    name: "Pastel de Carne do Sol",
    shortDesc: "",
    description: "",
    price: 8,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-x-tudo",
    category: "Pastéis",
    name: "Pastel de X-Tudo",
    shortDesc: "",
    description: "",
    price: 8,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-bacon",
    category: "Pastéis",
    name: "Pastel de Bacon",
    shortDesc: "",
    description: "",
    price: 8,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol-queijo",
    category: "Pastéis",
    name: "Pastel de Carne do Sol + Queijo",
    shortDesc: "",
    description: "",
    price: 10,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-bacon-queijo",
    category: "Pastéis",
    name: "Pastel de Bacon + Queijo",
    shortDesc: "",
    description: "",
    price: 10,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-frango-catupiry-milho",
    category: "Pastéis",
    name: "Pastel de frango + Catupiry + Milho",
    shortDesc: "",
    description: "",
    price: 11,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-frango-queijo-azeitona",
    category: "Pastéis",
    name: "Pastel de Frango + Queijo + Azeitona",
    shortDesc: "",
    description: "",
    price: 11,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol-queijo-azeitona",
    category: "Pastéis",
    name: "Pastel de Carne do Sol + Queijo + Azeitona",
    shortDesc: "",
    description: "",
    price: 11,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-calabresa-queijo-tomate",
    category: "Pastéis",
    name: "Pastel de Calabresa + Queijo + Tomate",
    shortDesc: "",
    description: "",
    price: 11,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-bacon-queijo-cheddar",
    category: "Pastéis",
    name: "Pastel de Bacon + Queijo + Cheddar",
    shortDesc: "",
    description: "",
    price: 12,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-calabresa-bacon-cheddar",
    category: "Pastéis",
    name: "Pastel de Calabresa + Bacon + Cheddar",
    shortDesc: "",
    description: "",
    price: 13,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-bacon-calabresa-catupiry",
    category: "Pastéis",
    name: "Pastel de Bacon + Calabresa + Catupiry",
    shortDesc: "",
    description: "",
    price: 13,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol-queijo-coalho",
    category: "Pastéis",
    name: "Pastel de Carne do Sol + Queijo Coalho",
    shortDesc: "",
    description: "",
    price: 13,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-bacon-frango-catupiry",
    category: "Pastéis",
    name: "Pastel de Bacon + Frango + Catupiry",
    shortDesc: "",
    description: "",
    price: 14,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol-catupiry-cebola",
    category: "Pastéis",
    name: "Pastel de Carne do Sol + Catupiry + Cebola",
    shortDesc: "",
    description: "",
    price: 14,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    {
    id: "pastel-de-carne-do-sol-queijo-coalho-cebola",
    category: "Pastéis",
    name: "Pastel de Carne do Sol + Queijo Coalho + Cebola",
    shortDesc: "",
    description: "",
    price: 15,
    image: "assets/products/batata-frita.jpg",
    modifierGroups: [],
  },
    

  // ---------- Bebidas ----------
  {
    id: "agua-mineral",
    category: "Bebidas",
    name: "Água Mineral",
    shortDesc: "",
    description: "",
    price: 2,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "coca-cola-250ml",
    category: "Bebidas",
    name: "Coca-cola 250ml",
    shortDesc: "",
    description: "",
    price: 3.5,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "delrio-250ml",
    category: "Bebidas",
    name: "Delrio 250ml",
    shortDesc: "",
    description: "",
    price: 3.5,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "coca-cola-lata-350ml",
    category: "Bebidas",
    name: "Coca-cola Lata 350ml",
    shortDesc: "",
    description: "",
    price: 5,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "coca-cola-600ml",
    category: "Bebidas",
    name: "Coca-cola 600ml",
    shortDesc: "",
    description: "",
    price: 7,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "deilrio-1l",
    category: "Bebidas",
    name: "Deilrio 1L",
    shortDesc: "",
    description: "",
    price: 7,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "coca-cola-1l",
    category: "Bebidas",
    name: "Coca-cola 1L",
    shortDesc: "",
    description: "",
    price: 8,
    image: "assets/products/refrigerante-lata.jpg",
    modifierGroups: [],
  },
   {
    id: "coca-cola-1-5l",
    category: "Bebidas",
    name: "Coca-cola 1.5L",
    shortDesc: "",
    description: "",
    price: 10,
    image: "assets/products/refrigerante-lata.jpg",
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
    { id: "pix-entrega", name: "PIX", icon: "📱" },
    { id: "cartao-entrega", name: "Cartão", icon: "💳" },
  ],
};
