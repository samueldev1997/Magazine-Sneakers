export const catalogo = [
  {
    id: "1",
    nome: "Dunk Low Remastered",
    numero: 36,
    preco: 899,
    imagem: "dunk1.webp",
  },
  {
    id: "2",
    nome: "Dunk Low UCLA",
    numero: 39,
    preco: 899,
    imagem: "dunk2.webp",
  },
  {
    id: "3",
    nome: "Dunk Low Halloween",
    numero: 40,
    preco: 950,
    imagem: "dunk11.webp",
  },
  {
    id: "4",
    nome: "Dunk Low Judge Grey",
    numero: 37,
    preco: 850,
    imagem: "dunk4.webp",
  },
  {
    id: "5",
    nome: "Dunk Low Sun Club",
    numero: 38,
    preco: 950,
    imagem: "dunk5.webp",
  },
  {
    id: "6",
    nome: "Dunk Low Goldenrod",
    numero: 40,
    preco: 799,
    imagem: "dunk6.webp",
  },
  {
    id: "7",
    nome: "Dunk Low University Red",
    numero: 41,
    preco: 900,
    imagem: "dunk12.webp",
  },
  {
    id: "8",
    nome: "Dunk Low Knicks",
    numero: 38,
    preco: 1799,
    imagem: "dunk8.webp",
  },
  {
    id: "9",
    nome: "Dunk Low Retro Verde",
    numero: 39,
    preco: 500,
    imagem: "dunk9.webp",
  },
  {
    id: "10",
    nome: "Dunk Low Setsubun",
    numero: 37,
    preco: 600,
    imagem: "dunk10.jpg",
  },
];

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoNoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-300",
    "rounded-md",
    "relative",
    "mb-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `   
 
  <img src="./assets/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-md mr-3">

  <div class='p-2 flex flex-col justify-between'>
    <p class='text-slate-900 text-sm'>${produto.nome}</p>
    <p class='text-slate-900 text-sm'> Número: ${produto.numero}
    <p class='text-green-700'>R$${produto.preco}</p>
  </div>

  <div class='absolute bottom-0 right-2 flex items-end text-slate-900 flex text-lg'> 
    
    <p id='quantidade-${produto.id}' class='ml-2'> ${quantidadeProduto}</p>
   
  </div>
  

  `;
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
}
