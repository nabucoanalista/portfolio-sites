// IMC DATA
const data = [ // Esse array contém os dados que serão utilizados para calcular o IMC e preencher a tabela.
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    }, // Aqui temos um objeto que contém os valores mínimos e máximos, a classificação, a informação e o grau de obesidade.

    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    }, // Esses valores só serão exibidos caso o IMC do usuário esteja dentro do intervalo.

    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    }, // Caso o IMC do usuário esteja fora do intervalo, esses valores não serão exibidos.

    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    }, // O array contém 5 objetos, cada um com os valores de classificação, informação e grau de obesidade.

    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    }, 
  ];
// Seleção de elementos

const imcTable = document.querySelector('#imc-table'); // Essa variável é a tabela que será preenchida com os dados do array data.

const heightInput = document.querySelector('#height'); // Essa variável é o input que receberá a altura do usuário.
const weightInput = document.querySelector('#weight'); // Essa variável é o input que receberá o peso do usuário.
const calcBtn = document.querySelector('#calc-btn'); // Essa variável é o botão que será clicado para calcular o IMC.
const clearBtn = document.querySelector('#clear-btn'); // Essa variável é o botão que será clicado para limpar os campos de input.

const calcContainer = document.querySelector('#calc-container'); // Essa variável é o container que será escondido quando o IMC for calculado.
const resultContainer = document.querySelector('#result-container'); // Essa variável é o container que será exibido quando o IMC for calculado.

const imcNumber = document.querySelector('#imc-number span'); // Essa variável é o span que exibirá o valor do IMC do usuário.
const imcInfo = document.querySelector('#imc-info span'); // Essa variável é o span que exibirá a informação sobre o IMC do usuário.

const backBtn = document.querySelector('#back-btn'); // Essa variável é o botão que será clicado para voltar à tela inicial.

// Funções

function createTable(data) {
    data.forEach((item) => { // O método forEach() executa uma função para cada item do array.

        const div = document.createElement('div');
        div.classList.add('table-data');

        const classification = document.createElement('p');
        classification.innerText = item.classification;

        const info = document.createElement('p');
        info.innerText = item.info;

        const obesity = document.createElement('p');
        obesity.innerText = item.obesity;

        // O método createElement() cria um elemento HTML especificado por tagName e o retorna como um objeto Element.

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);
        // O método appendChild() adiciona um nó ao final da lista de filhos de um nó pai especificado.

        imcTable.appendChild(div);
        
    });
}

function cleanInputs() {
    heightInput.value = '';
    weightInput.value = '';
    imcNumber.classList = '';
    imcInfo.classList = '';
}

function validDigits(text) {
    return text.replace(/[^0-9.]/g, ''); // A expressão regular /[^0-9.]/g remove todos os caracteres que não são números ou pontos.
}

function calcIMC(weight, height) {
    const imc = (weight / (height * height)).toFixed(1); // O método toFixed() formata um número utilizando notação de ponto fixo.

    return imc;
}

function showOrHideResults() {
    calcContainer.classList.toggle('hide'); // O método toggle() alterna entre adicionar e remover uma classe de um elemento.
    resultContainer.classList.toggle('hide');
}

// Inicilização

createTable(data); // A função createTable() é chamada para preencher a tabela com os dados do array data.

// Eventos

[heightInput, weightInput].forEach((el) => {
    el.addEventListener('input', (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

// Os comando acima adicionam um evento de input para cada input. Quando o usuário digita algo, a função validDigits() é chamada para validar o valor do input. heigthInput e weightInput são os inputs que receberão a altura e o peso do usuário, respectivamente. O método forEach() executa uma função para cada item do array. el ou input são os parâmetros que representam cada item do array. O método addEventListener() adiciona um evento a um elemento HTML. O evento input é acionado quando o valor de um input é alterado. o comando e.target.value = updatedValue; atualiza o valor do input com o valor validado.

calcBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(',', '.'); // O sinal de + antes de weightInput.value.replace(',', '.') converte o valor para um número.
    const height = +heightInput.value.replace(',', '.');

    if (!weight || !height) return; // O comando if (!weight || !height) return; verifica se o valor de weight ou height é falso. Se for, a função retorna e o código abaixo não é executado.

    const imc = calcIMC(weight, height); // A função calcIMC() é chamada para calcular o IMC do usuário. ps cuidado na ordem dos parametros.

    let info; // A variável info é declarada sem valor, a fim de que ela possa ser preenchida posteriormente.

    data.forEach((item) => { // O método forEach() executa uma função para cada item do array data.
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    if (!info) return; // O comando if (!info) return; verifica se a variável info é falsa. Se for, a função retorna e o código abaixo não é executado. ex: se o imc for 0 ou um numero fora do intervalo, retorna undefined.

    imcNumber.innerText = imc; // O valor do IMC é exibido no span imcNumber.
    imcInfo.innerText = info; // A informação sobre o IMC é exibida no span imcInfo.

    switch (info) { // O comando switch(info) verifica o valor da variável info.
        case 'Magreza': // Se o valor de info for 'Magreza', o comando case 'Magreza' é executado.
            imcNumber.classList.add('low'); // A classe low é adicionada ao span imcNumber.
            imcInfo.classList.add('low'); // A classe low é adicionada ao span imcInfo.
            break; // O comando break; encerra a execução do switch.
        case 'Magreza':
            imcNumber.classList.add('low');
            imcInfo.classList.add('low');
            break;
        case 'Normal':
            imcNumber.classList.add('good');
            imcInfo.classList.add('good');
            break;
        case 'Sobrepeso':
            imcNumber.classList.add('low');
            imcInfo.classList.add('low');
            break;
        case 'Obesidade':
            imcNumber.classList.add('medium');
            imcInfo.classList.add('medium');
            break;
        case 'Obesidade grave':
            imcNumber.classList.add('high');
            imcInfo.classList.add('high');
            break;     
    }
        
    showOrHideResults(); // A função showOrHideResults() é chamada para exibir os resultados do IMC.
});


clearBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Aqui, o método preventDefault() é chamado para evitar que o formulário seja enviado ou a página seja recarregada.

    cleanInputs(); // A função cleanInputs() é chamada para limpar os campos de input, quando o botão de limpar é clicado. Mas ela sozinha não faz nada, é preciso adicionar um evento para que ela seja chamada.
});

backBtn.addEventListener('click', (e) => {
    cleanInputs(); // A função cleanInputs() é chamada para limpar os campos de input, quando o botão de voltar é clicado.
    showOrHideResults(); // A função showOrHideResults() é chamada para esconder os resultados do IMC e exibir o formulário novamente.
});