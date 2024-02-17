// Seleção de elementos
const multiplicationForm = document.querySelector('#multiplication-form'); // o multiplication-form é o id do formulário.
const numberInput = document.querySelector('#number'); // esse é o input do número, rsponsável por receber o número que será multiplicado.
const multiplicationInput = document.querySelector('#multiplicator'); // esse é o input do multiplicador, responsável por receber o número que será multiplicador.

const multiplicationTitle = document.querySelector('#multiplication-title span'); // esse é o título da tabela, que vai receber o número que será multiplicado.

const multiplicationTable = document.querySelector('#multiplication-operation'); // essa é a tabela que vai receber a multiplicação.

// Funções
const createTable = (number, multiplicatorNumber) => { // essa função vai criar a tabela.
  multiplicationTable.innerHTML = ''; // aqui eu estou limpando a tabela, para que ela não acumule as multiplicações.

  for (i = 1; i <= multiplicatorNumber; i++) { // aqui eu estou criando um loop para fazer a multiplicação.
    const result = number * i; // aqui eu estou armazenando o resultado da multiplicação em uma variável.

    const template = `<div class="row">
      <div class="operation">${number} x ${i} = </div>
      <div class="result">${result}</div>
      </div>`; // aqui eu estou criando um template para a tabela, que vai receber a multiplicação e o resultado.

    const parser = new DOMParser(); // aqui eu estou criando um parser para transformar o template em um elemento do DOM.

    const htmlTemplate = parser.parseFromString(template, 'text/html'); // aqui eu estou transformando o template em um elemento do DOM.

    const row = htmlTemplate.querySelector('.row'); // aqui eu estou selecionando a classe row do elemento do DOM.

    multiplicationTable.appendChild(row); // aqui eu estou adicionando o elemento do DOM à tabela.
  }

  multiplicationTitle.innerText = number; // aqui eu estou adicionando o número que será multiplicado ao título da tabela.
};

// Eventos
multiplicationForm.addEventListener('submit', (e) => { // o evento de submit é acionado quando o formulário é enviado. o (e) é o evento, que é passado como parâmetro para a função. O preventDefault é para evitar que a página seja recarregada, do contrário, o formulário seria enviado e a página recarregada.
  e.preventDefault();
  
    const multiplicationNumber = +numberInput.value; // o + é para converter o valor do input para número. vou armazenar o valor do input em uma variável.

    const multiplicatorNumber = +multiplicationInput.value; // aqui é a mesma coisa, só que para o multiplicador.

    if (!multiplicationNumber || !multiplicatorNumber) return; // se o número ou o multiplicador não forem preenchidos, a função é encerrada.

    createTable(multiplicationNumber, multiplicatorNumber);
});