function encontrarCifra(linha) {
    var reg = /^ *[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
        reguniq = /[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/,
        i,
        tab;

    if (linha.match(reg)) {
        i = linha.search(reguniq);
        tab = encontrarCifra(linha.substr(0, i - 1));
        tab[i] = linha.substr(i).trim().replace('b', '&');
        return tab;
    }
    return [];
}
const reg = /^ *([A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *))* *$/g;

const textoMusica = document.getElementsByTagName('textarea')[0].value;
let separadoPorLinhas = textoMusica.split('\n');

alterado = []
separadoPorLinhas.forEach(linha => {
    if(linha.match(reg)){
        alterado.push(linha.replace(reg,'<chord>$1</chord>'));
    }else{
        alterado.push(linha);
    }
    
});
console.log(alterado);


