import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutosComQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.add("right-[-360px]");
  document.getElementById("carrinho").classList.remove("right-[0px]");
}

function irParaCheckout() {
  if (Object.keys(idsProdutosComQuantidade).length === 0) {
    return;
  }

  window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
  const btnFecharCarrinho = document.getElementById("fechar");
  const btnAbrirCarrinho = document.getElementById("abrir");
  const btnIrParaCheckout = document.getElementById("btn-checkout");

  btnFecharCarrinho.addEventListener("click", fecharCarrinho);
  btnAbrirCarrinho.addEventListener("click", abrirCarrinho);
  btnIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutosComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutosComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidade(idProduto) {
  idsProdutosComQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idsProdutosComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidade(idProduto) {
  if (idsProdutosComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }

  idsProdutosComQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idsProdutosComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutosComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = ["flex", "bg-white", "rounded-md", "relative"];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `   
  <button id="remover-item-${
    produto.id
  }" class='absolute top-0 right-1 text-slate-500 hover:text-slate-900'>
    <i class="fa-solid fa-circle-xmark"> </i>
  </button>

  <img src="./assets/${produto.imagem}" alt="${
    produto.nome
  }" class="h-24 rounded-md mr-3">

  <div class='p-2 flex flex-col justify-between'>
    <p class='text-slate-900 text-sm'>${produto.nome}</p>
    <p class='text-slate-900 text-sm'> Número: ${produto.numero}
    <p class='text-green-700'>R$${produto.preco}</p>
  </div>

  <div class='absolute bottom-0 right-2 flex items-end text-slate-900 flex text-lg'> 
    <button id='decrementar-produto-${produto.id}' >-</button>
    <p id='quantidade-${produto.id}' class='ml-2'> ${
    idsProdutosComQuantidade[produto.id]
  }</p>
    <button id='incrementar-produto-${produto.id}' class='ml-2'>+</button>
  </div>

  `;
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidade(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidade(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutosComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutosComQuantidade) {
    incrementarQuantidade(idProduto);
    return;
  }

  idsProdutosComQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idsProdutosComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutosComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutosComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`;
}
