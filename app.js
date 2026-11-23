const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
function dinheiro(valor) {
  return valor.toLocaleString("pt-BR",
  {
    style: "currency",
    currency: "BRL"
  });
}
function calcularComissao(salario,
vendas) {
  const faixaInicial = Math.min(vendas,
  1200) * 0.03;
  const faixaAdicional = Math.max(0,
  vendas - 1200) * 0.05;
  return salario + faixaInicial + faixaAdicional;
}
function decomporSaque(valor) {
  const cedulas = [["R$ 100",
  100],
  ["R$ 50",
  50],
  ["R$ 20",
  20],
  ["R$ 10",
  10],
  ["R$ 5",
  5],
  ["R$ 2",
  2],
  ["R$ 1",
  1],
  ];
  const resultado = [];
  for (const [nome, valorCedula] of cedulas) {
    const quantidade = Math.floor(valor / valorCedula);
    if (quantidade > 0) {
      resultado.push(`${quantidade} × ${nome}`);
      valor %= valorCedula;
    }
  }
  return resultado.join(", ") || "sem cédulas";
}
function adicionarLinha(rotulo,
valor) {
  const linha = document.createElement("p");
  const destaque = document.createElement("strong");
  destaque.textContent = `${rotulo}: `;
  linha.append(destaque,
  document.createTextNode(valor));
  resultado.append(linha);
}
formulario.addEventListener("submit",
(evento) => {
  evento.preventDefault();
  const salario = Number(document.querySelector("#salario").value);
  const vendas = Number(document.querySelector("#vendas").value);
  const saque = Number(document.querySelector("#saque").value);
  const estoque = Number(document.querySelector("#estoque").value);
  const ano = Number(document.querySelector("#nascimento").value);
  const anoAtual = new Date().getFullYear();
  resultado.replaceChildren();
  if (ano > anoAtual || ano < 1900 || saque % 1 !== 0) {
    resultado.textContent = "Confira o ano informado e use um saque em reais inteiros.";
    return;
  }
  const salarioTotal = calcularComissao(salario,
  vendas);
  const idade = anoAtual - ano;
  const situacaoEstoque = estoque > 50 ? "acima do limite" : estoque >= 25 ? "em nível adequado" : "reposição recomendada";
  adicionarLinha("Comissão e salário",
  dinheiro(salarioTotal));
  adicionarLinha("Saque",
  `${dinheiro(saque)} (${decomporSaque(saque)})`);
  adicionarLinha("Saldo estimado",
  dinheiro(salarioTotal - saque));
  adicionarLinha("Estoque",
  `${estoque} itens, ${situacaoEstoque}`);
  adicionarLinha("Idade aproximada",
  `${idade} anos, ${idade * 12} meses ou ${idade * 365} dias`);
});
const matriz = [[4,
7,
2],
[9,
5,
1],
[6,
3,
8],
];
document.querySelector("#diagonal").textContent = matriz .map((linha,
indice) => linha[indice]) .join(" · ");
formulario.requestSubmit();



