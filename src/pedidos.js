import {
  lerLocalStorage,
  desenharProdutoNoCarrinhoSimples,
} from "./utilidades";

function criarPedidoHistorico(pedidoComData) {
  const elementoPedido = `
  <p class='text-xl text-bold mt-6 mb-4'>${new Date(
    pedidoComData.dataPedido
  ).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}</p>

  <section class='p-3 bg-slate-400 rounded-md w-96' id='container-pedidos-${
    pedidoComData.dataPedido
  }'></section>`;

  const main = document.getElementsByTagName("main")[0];
  main.innerHTML += elementoPedido;

  for (const idProduto in pedidoComData.pedido) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      `container-pedidos-${pedidoComData.dataPedido}`,
      pedidoComData.pedido[idProduto]
    );
  }
}

function renderizarHistoricoPedidos() {
  const historico = lerLocalStorage("historico");

  for (const pedidoComData of historico) {
    criarPedidoHistorico(pedidoComData);
  }
}

renderizarHistoricoPedidos();
