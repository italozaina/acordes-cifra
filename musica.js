function transformar(textoMusica) {
    // (?:[A-G](?:b|bb)*(?:#|##|sus|maj|min|aug|m|M|\\+|-|dim)*[\d\/]*)*)(?=\s|$)(?! \w))

    const notas = "[A-G]",
    acentuacoes = "(?:b|bb)",
    acordes = "*(?:#|##|sus|maj|min|aug|m|M|\\+|-|dim)",
    com = "*[\\d\\/]*",
    numeros = "*(?:[1-9])",
    foraMusica = "(?=\\s|$)(?! \\w)",
    padrao = "("+"\\b(" + notas + acentuacoes + numeros + acordes + com + '(?:' + notas + acentuacoes + acordes + com + ')*)'+foraMusica+")",
    regex = new RegExp(padrao, "g");

    let acordesTexto = textoMusica.split('[Acordes]')[1];
    let novosAcordesSeparados = acordesTexto.split('\n')
    let novosAcordes = [];
    novosAcordesSeparados.forEach(linha => {
        let sep = linha.split(' = ');
        if(sep[0] != '')
            novosAcordes.push({ n: sep[0], m: sep[1], d: null, p: null});
    });
    
    biblioteca.setAcordesCustomizados(novosAcordes);    

    let separadoPorLinhas = textoMusica.split('\n');

    alterado = [];
    const campo = document.getElementById('resultado');
    campo.innerHTML = "";
    separadoPorLinhas.forEach(linha => {
        if(linha.match(regex)){
            alterado.push(linha.replace(regex,"<b>$1</b>"));
        }else{
            alterado.push(linha);
        }
        
    });
    //monta titulo
    let h2 = document.createElement('h2');
    h2.innerHTML = alterado[0];
    campo.appendChild(h2);
    alterado.shift();
    //monta canção
    let pre = document.createElement('pre');
    pre.innerHTML = alterado.join('\n');
    campo.appendChild(pre);
    function removerDaTela(element) {
        if(element.target.querySelector('div')){
            element.target.querySelector('div').remove();
        }
    }
    document.querySelectorAll('#resultado > pre > b').forEach(element => {
        element.addEventListener("mouseenter", function(element) {            
            if(!element.target.querySelector('div')){                
                let campoAcorde = document.createElement('div');
                campoAcorde.style = "height: 140px; width: 110px; position:absolute; top: "+(element.target.offsetTop-140)+"px; left: "+(element.target.offsetLeft + (element.target.offsetWidth/2) - 55)+"px; background-color: transparent; z-index: 100;"     
                let acorde = biblioteca.getAcordePorCifra(element.target.innerText);                
                let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p);
                campoAcorde.appendChild(novoAcorde.montaAcorde());
                element.target.appendChild(campoAcorde);
            }
        });

        element.addEventListener("mouseleave", removerDaTela);

        element.addEventListener("click", function(element) {
            if(this.getAttribute('tela') != 'true'){
                this.setAttribute("tela", "true");
                this.removeEventListener("mouseleave", removerDaTela, false);
            } else {
                this.setAttribute("tela", "null");
                this.addEventListener("mouseleave", removerDaTela);
            }
        });
    });
};

function carregaArquivo(nomeArquivo){
    fetch(`/musicas/${nomeArquivo}.txt`)
    .then(function(response) {
        response.text().then(function(text) {  
        transformar(text);
        });
    });
}

function abrirMusica(event){
    let nome = event.target.getAttribute('data-arquivo');    
    carregaArquivo(nome)    
}