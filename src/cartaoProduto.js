import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `
  
    <div class='w-52 m-1 shadow-lg shadow-slate-300 rounded-lg p-2' id="produto-${produtoCatalogo.id}">
      <img src="./assets/${produtoCatalogo.imagem}" alt="${produtoCatalogo.nome}" class="max-w-full h-auto"'>
      <p class='text-sm'>${produtoCatalogo.nome}</p>
      <p> Número: ${produtoCatalogo.numero} </P>
      <p class='text-sm'> <strong> R$${produtoCatalogo.preco},00 </strong> </p>

      <button id='adicionar-${produtoCatalogo.id}' class='px-2 py-1 bg-red-200 rounded-lg hover:bg-neutral-950 
      hover:text-white transition duration-300 ease-in-out transform hover:scale-105 w-full'>
      <i class="fa-solid fa-cart-plus"></i>
      </button>

    </div>
  
    `;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
  }

  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
  }
}
