class BoxShadowGenerator { // tem como função gerar o box-shadow, pegs os valores dos inputs e aplica no box-shadow do preview.
    constructor( // aqui eu coloquei os valores que eu quero pegar dos inputs, no final de cada deve se usar a virgula. são os argumentos recebidos de cada input.
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
        previewBox,
        rule,
        webkitRule,
        mozRule
    ) { // aqui os valores passam a usar o this. para serem acessados, pois estão dentro de uma classe e o funcionamento é executar a função.
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.insetRef = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    }

    intialize() { // função para iniciar o box-shadow, pegar os valores dos inputs e aplicar no box-shadow do preview.
        this.horizontalRef.value = this.horizontal.value; // pega o valor do input horizontal e aplica no span horizontal.
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule(); // chama a função applyRule, para aplicar o box-shadow no preview.
        this.showRule(); // chama a função showRule, para mostrar o box-shadow no preview.
    }

    updateValue(type, value) { // função para atualizar o valor do input e aplicar no span.
        switch (type) { // switch é uma estrutura de controle, que permite a seleção de um bloco de instruções, de acordo com o valor de uma expressão.
          case "horizontal": // caso o valor seja horizontal.
            this.horizontalRef.value = value; // aplica o valor do input no span.
            break; // quebra o switch, para não continuar a execução em todos os casos.
          case "vertical":
            this.verticalRef.value = value;
            break;
          case "spread":
            this.spreadRef.value = value;
            break;
          case "blur":
            this.blurRef.value = value;
            break;
          case "color":
            this.colorRef.value = value;
            break;
          case "opacity":
            this.opacityRef.value = value;
            break;
          case "inset":
            this.insetRef = value;
            break;
        }
    
        this.applyRule(); // chama a função applyRule, para aplicar o box-shadow no preview.
        this.showRule(); // chama a função showRule, para mostrar o box-shadow no preview.
    }

    applyRule() { // função para aplicar o box-shadow no preview.
        const rgbValue = this.hexToRgb(this.colorRef.value); // pega o valor do input color e aplica na função hexToRgb, para converter o valor hexadecimal em rgb.
    
        const shadowRule = `${this.insetRef ? "inset" : ""} ${
          this.horizontalRef.value
        }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
          this.spreadRef.value
        }px rgba(${rgbValue}, ${this.opacityRef.value})`;
    
        this.previewBox.style.boxShadow = shadowRule;
        this.currentRule = shadowRule;
    }

    showRule() { // função para mostrar o box-shadow no preview.
        const ruleWithSemiColon = `${this.currentRule};`; // pega o valor da variável currentRule e aplica na variável ruleWithSemiColon, para adicionar um ponto e vírgula no final do valor.
        
        this.rule.innerText = ruleWithSemiColon; // aplica o valor da variável ruleWithSemiColon no span rule.
        this.webkitRule.innerText = ruleWithSemiColon;
        this.mozRule.innerText = ruleWithSemiColon;
    }

    hexToRgb(hex) { // função para converter o valor hexadecimal em rgb.
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
          ("0x" + hex[5] + hex[6]) | 0
        }`; // retorna o valor convertido em rgb.
    }
}

// Seleção de elementos	
const horizontal = document.querySelector("#horizontal"); // pega o input horizontal e aplica na variável horizontal.
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const previewBox = document.querySelector("#box");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");

const inset = document.querySelector("#inset");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator( // aqui eu criei uma nova instância da classe BoxShadowGenerator, e passei os valores dos inputs como argumentos, o objetivo é pegar os valores dos inputs e aplicar no box-shadow do preview.
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
);

boxShadow.intialize(); // aqui eu chamei a função intialize, para pegar os valores dos inputs e aplicar no box-shadow do preview.


// Eventos

horizontal.addEventListener('input', (e) => { // adiciona um evento de input no input horizontal, para pegar o valor do input e aplicar no span horizontal.
    const value = e.target.value; // pega o valor do input horizontal.

    boxShadow.updateValue('horizontal', value); // chama a função updateValue, para atualizar o valor do input e aplicar no span.
});

vertical.addEventListener("input", (e) => {
  const value = e.target.value;
  
  boxShadow.updateValue("vertical", value);
});
  
blur.addEventListener("input", (e) => {
  const value = e.target.value;
  
  boxShadow.updateValue("blur", value);
});
  
spread.addEventListener("input", (e) => {
  const value = e.target.value;
  
   boxShadow.updateValue("spread", value);
});
  
color.addEventListener("input", (e) => {
  const value = e.target.value;
  
  boxShadow.updateValue("color", value);
});
  
opacity.addEventListener("input", (e) => {
  const value = e.target.value;
  
  boxShadow.updateValue("opacity", value);
});
  
inset.addEventListener("input", (e) => {
  const value = e.target.checked;
  
  boxShadow.updateValue("inset", value);
});

// Copiar regra
const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

rulesArea.addEventListener("click", () => {
  const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

  navigator.clipboard.writeText(rules).then(() => {
    copyInstructions.innerText = "Regra copiada com sucesso!";

    setTimeout(() => {
      copyInstructions.innerText =
        "Clique no quadro acima para copiar as regras";
    }, 1000);
  });
});






















