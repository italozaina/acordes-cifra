document.getElementById('ajustar').onclick = function () {
    // (?:[A-G](?:b|bb)*(?:#|##|sus|maj|min|aug|m|M|\\+|-|dim)*[\d\/]*)*)(?=\s|$)(?! \w))

    const notas = "[A-G]",
    acentuacoes = "(?:b|bb)",
    acordes = "*(?:#|##|sus|maj|min|aug|m|M|\\+|-|dim)",
    com = "*[\\d\\/]*",
    numeros = "*(?:[1-9])",
    foraMusica = "(?=\\s|$)(?! \\w)",
    padrao = "("+"\\b(" + notas + acentuacoes + numeros + acordes + com + '(?:' + notas + acentuacoes + acordes + com + ')*)'+foraMusica+")",
    regex = new RegExp(padrao, "g");
    
    const textoMusica = document.getElementsByTagName('textarea')[0].value;
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
};