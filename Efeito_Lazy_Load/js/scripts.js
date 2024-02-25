const images = document.querySelectorAll('.image-container img'); // Serve para selecionar todos os elementos que possuem a classe .image-container e que são do tipo img

const observer = new IntersectionObserver((entries, observer) => {
    
    entries.forEach(entry => {
        if (!entry.isIntersecting) return; // Serve para verificar se o elemento está visível na tela. Se não estiver, ele retorna e não executa o código abaixo.

        const image = entry.target; // Serve para pegar o elemento que está visível na tela no momento.

        image.src = image.src.replace('?w=10', '?w=1000'); // Serve para substituir o valor de w=10 por w=1000

        observer.unobserve(image); // Serve para parar de observar o elemento que já foi visível na tela.
    });

}, {});

images.forEach((image) => {
    observer.observe(image); // Serve para observar os elementos que estão na tela e que possuem a classe .image-container
});

// O lazyload é um efeito inteligente que faz o download de imagens, vídeos e iframes apenas quando o usuário os visualiza. Isso melhora a performance e SEO do site, além de carregar mais rápido mesmo em conexões mais lentas.