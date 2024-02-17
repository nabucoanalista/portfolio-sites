const buttons = document.querySelectorAll('#image-picker li'); // Select all the buttons
const image = document.querySelector('#product-image'); // Select the image

buttons.forEach((btn) => { // esse comando é para cada botão
    btn.addEventListener('click', (e) => { // esse comando é para cada evento de click
        console.log(e); // esse comando é para mostrar no console o evento de click

        buttons.forEach((btn) => { // esse comando é para cada botão
            btn.querySelector('.color').classList.remove('selected'); // esse comando é para remover a classe selected
        });

        const button = e.target; // esse comando é para pegar o botão clicado

        const id = button.getAttribute('id'); // esse comando é para pegar o id do botão clicado

        button.querySelector('.color').classList.add('selected'); // esse comando é para adicionar a classe selected

        image.classList.add('changing'); // esse comando é para adicionar a classe changing
        image.setAttribute('src', `img/iphone_${id}.jpg`); // esse comando é para mudar a imagem

        setTimeout(() => { // esse comando é para esperar 200 milissegundos
            image.classList.toggle('changing'); // esse comando é para adicionar a classe changing
        }, 200); // esse comando é para esperar 200 milissegundos

    });
}); 