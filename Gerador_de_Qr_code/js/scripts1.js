const container = document.querySelector('.container'); // seleciona a div container.

const qrCodeBtn = document.querySelector('#qr-form button'); // seleciona o botão do formulário.

const qrCodeInput = document.querySelector('#qr-form input'); // seleciona o input do formulário.

const qrCodeImg = document.querySelector('#qr-code img'); // seleciona a imagem do qr code.

// Evento de click no botão do formulário.

// Função para gerar o qr code.

function generateQrCode() {
  const qrCodeInputValue = qrCodeInput.value; // pega o valor do input do formulário.

  if (!qrCodeInputValue) return; // se o valor do input for vazio, retorna.

  qrCodeBtn.innerText = 'Gerando Código...'; // muda o texto do botão para "Gerando Código...".
  
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`; // muda o src da imagem do qr code.

  qrCodeImg.addEventListener('load', () => { // evento de load na imagem do qr code.
    container.classList.add('active'); // adiciona a classe active na div container.
    qrCodeBtn.innerText = 'Código Gerado!'; // muda o texto do botão para "Código Gerado!".
  });  

}

qrCodeBtn.addEventListener('click', () => { // evento de click no botão do formulário.
  generateQrCode(); // chama a função generateQrCode.
});

qrCodeInput.addEventListener('keydown', (e) => { // evento de keydown no botão do formulário.
    if (e.code === 'Enter') { // se a tecla pressionada for Enter. 
        generateQrCode(); // chama a função generateQrCode.
    }
});

// Limpar o qr code.

qrCodeInput.addEventListener('keyup', () => {

    if (!qrCodeInput.value) { // se o input estiver vazio.
        container.classList.remove('active'); // remove a classe active da div container. 
        qrCodeBtn.innerText = 'Gerar QR Code'; // muda o texto do botão para "Gerar QR Code".
    }
});

















