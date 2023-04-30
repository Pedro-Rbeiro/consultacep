//Desenvolvido com a api ViaCEP
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const resultados = document.getElementById("results");
cep.value = "01001000";
resultados.style = "display:none";
cep.addEventListener("blur", function (e) {
  let cep = e.target.value;
  let script = document.createElement("script");
  script.src =
    "https://viacep.com.br/ws/" + cep + "/json/?callback=popularform";
  document.body.appendChild(script);
});
function popularform(resposta) {
  if ("erro" in resposta) {
    alert("cep não encontrado!");
    return;
  }
  // console.log(resposta);
  rua.value = resposta.logradouro;
  bairro.value = resposta.bairro;
  cidade.value = resposta.localidade;
  estado.value = resposta.uf;
  if (rua !== null) {
    resultados.style = "display:visible";
    resultados.innerHTML = `Resultados para o CEP informado: <span id="results-text">${rua.value} ${bairro.value} ${cidade.value} ${estado.value}<span>`;
    // resultados.id = "results-text";
  }
  const resultadoText = document.getElementById("results-text");
  resultadoText.addEventListener("click", async function (e) {
    try {
      await navigator.clipboard.writeText(resultadoText.innerText);
      const infoResults = document.getElementById("info-results");
      infoResults.style = "display:visible";
      infoResults.innerText = `Texto copiado com sucesso!`;
    } catch (err) {
      console.log("Failed to copy text");
    }
  });
}
