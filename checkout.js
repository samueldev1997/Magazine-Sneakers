import {
  desenharProdutoNoCarrinhoSimples,
  lerLocalStorage,
  apagarDoLocalStorage,
  salvarLocalStorage,
} from "./src/utilidades";

function desenharProdutosCheckout() {
  const idsProdutosComQuantidade = lerLocalStorage("carrinho") ?? {};

  for (const idProduto in idsProdutosComQuantidade) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      "container-produto-checkout",
      idsProdutosComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(e) {
  e.preventDefault();

  const idsProdutosComQuantidade = lerLocalStorage("carrinho") ?? {};

  if (Object.keys(idsProdutosComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutosComQuantidade,
  };

  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalStorage("historico", historicoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");

  window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evento) => finalizarCompra(evento));
