document.getElementById('ajustar').onclick = function () {
    const notes = "[CDEFGAB]",
    accidentals = "(b|bb)?",
    chords = "(m|maj7|maj|min7|min|sus)?",
    suspends = "(1|2|3|4|5|6|7|8|9)?",
    sharp = "(#)?",
    regex = new RegExp("("+"\\b" + notes + accidentals + chords + suspends + "\\b" + sharp+")", "g");

    const textoMusica = document.getElementsByTagName('textarea')[0].value;
    let separadoPorLinhas = textoMusica.split('\n');

    alterado = [];
    const campo = document.getElementById('resultado');
    campo.innerHTML = "";
    separadoPorLinhas.forEach(linha => {
        if(linha.match(regex)){
            alterado.push(linha.replace(regex,"<span data-acorde=\"$1\">$1</span>"));
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