class Acorde {
    cifra;
    molde;
    dedos;
    pestana;

    constructor(cifra, molde, dedos = null, pestana = null){
        this.cifra = cifra;
        this.molde = molde;
        this.dedos = dedos;
        this.pestana = pestana;
    }    

    moldeSeparado(){
        return this.molde.split(' ');
    }

    menorPosicaoAcorde() {
        let moldeSeparado = this.moldeSeparado().filter(function(item) {
            return (item !== 'X' && item !== 'x' && item != 0);
        })
        moldeSeparado = moldeSeparado.map(Number);
        return Math.min.apply(null, moldeSeparado);
    }

    reposicionaMolde() {
        let menor = this.menorPosicaoAcorde();    
        let diferenca = menor - 1;
        let novoMolde = [];
        this.moldeSeparado().forEach(p => {
            if(p == 'X' || p == 'x' || p == '0'){
                novoMolde.push(p);
            }else{
                let novaPosicao = p - diferenca;
                novoMolde.push(novaPosicao);
            }        
        });
        return novoMolde.join(' ');
    }

    montarGrelha(contexto) {
        contexto.fillStyle = "rgb(255,255,255)";
        contexto.fillRect (0, 0, 100, 130);
        contexto.fillStyle = "rgb(0,0,0)";
        contexto.fillRect (20, 27, 71, 3);
        for (let index = 0; index < 6; index++) {
            let x = (70/5*index) + 20;        
            contexto.fillRect (x, 30, 1, 90);
        }
    
        for (let index = 1; index < 7; index++) {
            let y = (90/6*index) + 30;
            contexto.fillRect (20, y, 71, 1);
        }
    }

    montarGrelhaAvancada(contexto, casa) {
        contexto.fillStyle = "rgb(255,255,255)";
        contexto.fillRect (0, 0, 90, 130);
        contexto.fillStyle = "rgb(0,0,0)";
        for (let index = 0; index < 6; index++) {
            let x = (70/5*index) + 20;        
            contexto.fillRect (x, 30, 1, 90);
        }
    
        for (let index = 1; index < 6; index++) {
            let y = (90/6*index) + 30;
            contexto.fillRect (20, y, 71, 1);
        }
        contexto.font = 'bold 11px Arial';
        contexto.textAlign = 'center';
        contexto.textBaseline = 'middle';
        contexto.fillText(casa+'ª', 10, 35);
    }

    posicionaDigitacao(contexto, corda, casa, dedo = null){
        contexto.fillStyle = "rgb(0,0,0)";
        corda = 7-corda;
        let x = 70/5 * corda + 7;
        if(casa > 0){    
            let y = 37;
            if(casa > 1)
                y = 90/6 * casa + 46/2;
            let bolinha = new Path2D();
            bolinha.arc(x, y, 6, 0, 2 * Math.PI);
            contexto.fill(bolinha);
            if(dedo != null){
                contexto.fillStyle = "rgb(255,255,255)";
                contexto.font = 'italic bold 13px Arial';
                contexto.textAlign = 'center';
                contexto.textBaseline = 'middle';
                contexto.fillText(dedo, x, y);
            }
        } else {
            if(casa==0){
                let solta = new Path2D();
                solta.arc(x, 21, 4, 0, 2 * Math.PI);
                contexto.stroke(solta);
            }else{            
                contexto.font = 'bold 13px Arial';
                contexto.textAlign = 'center';
                contexto.textBaseline = 'middle';
                contexto.fillText('x', x, 21);
            }       
        }
    }

    posicionaPestana(contexto, corda, casa) {
        contexto.fillStyle = "rgb(0,0,0)";
        corda = 7-corda;
        let x = 70/5 * corda + 1;
        let y = 30;
        y = 90/6 * casa + 40/2;
        contexto.fillRect (x, y, 95 - x, 6);
    }

    precisaDeGrelhaAvancada() {        
        let moldeSeparado = this.moldeSeparado().filter(function(item) {
            return (item !== 'X' && item !== 'x' && item != 0);
        })
        moldeSeparado = moldeSeparado.map(Number);
        if(Math.max.apply(null, moldeSeparado) > 6){
            return true;
        } else {
            return false;
        }
    }

    montaAcorde() {
        // Cria um novo canvas
        let molde;
        let novoCanvas = document.createElement('canvas');
        novoCanvas.width = 100;
        novoCanvas.height = 130;
        let contexto = novoCanvas.getContext('2d');    
    
        // Desenha a grelha do acorde
        if(this.precisaDeGrelhaAvancada(this.molde)){
            let menor = this.menorPosicaoAcorde(this.molde)
            this.montarGrelhaAvancada(contexto, menor);
            this.molde = this.reposicionaMolde(this.molde);
        } else {
            this.montarGrelha(contexto);
        }    
    
        // Escreve o nome da cifra sobre a grelha
        contexto.font = 'bold 12px Arial';
        contexto.textAlign = 'center';
        contexto.textBaseline = 'middle';
        contexto.fillText(this.cifra, 55, 10);
    
        // Prepara cifra do acorde
        let moldeSeparado = this.moldeSeparado();
        let pestanaCasa = -1;
    
        // Verifica se irá desenhar pestana
        if(this.pestana){
            if(moldeSeparado[0] == 'X' || moldeSeparado[0] == 'x'){
                pestanaCasa = moldeSeparado[1];
                this.posicionaPestana(contexto, 5, pestanaCasa);            
            } else {            
                pestanaCasa = moldeSeparado[0];
                this.posicionaPestana(contexto, 6, pestanaCasa);
            }
        }
    
        // Verifica se irá utilizar numeros dos dedos
        if(this.dedos == null){
            // Monta posicionamento de dedos
            moldeSeparado.forEach((posicao,i) => { 
                if(pestanaCasa != posicao)
                    this.posicionaDigitacao(contexto,6-i,posicao);
            });
        } else {                
            // Monta posicionamento numérico de dedos
            moldeSeparado.forEach((posicao,i) => {     
                if(pestanaCasa != posicao)   
                    this.posicionaDigitacao(contexto,6-i,posicao, this.dedos[i]);
            });
        }
        return novoCanvas;        
    }
}

class BibliotecaAcorde {

    basesAcordes = [{base: "C", posicao: 1}, {base: "C#", posicao: 2}, {base: "Db", posicao: 2}, {base: "D", posicao: 3}, {base: "D#", posicao: 4}, {base: "Eb", posicao: 4}, {base: "E", posicao: 5}, {base: "F", posicao: 6}, {base: "F#", posicao: 7}, {base: "Gb", posicao: 7}, {base: "G", posicao: 8}, {base: "G#", posicao: 9}, {base: "Ab", posicao: 9}, {base: "A", posicao: 10}, {base: "A#", posicao: 11}, {base: "Bb", posicao: 11}, {base: "B", posicao: 12}];

    bibliotecaAcordesCustomizado = [];

    bibliotecaAcordesBasicos = [
        { n: 'C', m: 'X 3 2 0 1 0', d: '032010', p: null},
        { n: 'C#', m: 'X 4 6 6 6 4', d: '012341', p: true},
        { n: 'D', m: 'X X 0 2 3 2', d: '000132', p: null},
        { n: 'D#', m: 'X 6 8 8 8 6', d: '012341', p: true},
        { n: 'E', m: '0 2 2 1 0 0', d: '023100', p: null},
        { n: 'F', m: '1 3 3 2 1 1', d: '134211', p: true},
        { n: 'F#', m: '2 4 4 3 2 2', d: '134211', p: true},
        { n: 'G', m: '3 2 0 0 3 3', d: '210034', p: null},
        { n: 'G#', m: '4 6 6 5 4 4', d: '134211', p: true},
        { n: 'A', m: 'X 0 2 2 2 0', d: '0012300', p: null},
        { n: 'A#', m: 'X 1 3 3 3 1', d: '012341', p: true},
        { n: 'B', m: 'X 2 4 4 4 2', d: '012341', p: true},    
    ];
    
    bibliotecaAcordesBasicos2 = [
        { n: 'C', m: 'X 3 5 5 5 3', d: '012341', p: true},
        { n: 'Db', m: 'X 4 6 6 6 4', d: '012341', p: true},
        { n: 'D', m: 'X 5 7 7 7 5', d: '012341', p: true},
        { n: 'Eb', m: 'X 6 8 8 8 6', d: '012341', p: true},
        { n: 'E', m: 'X 7 9 9 9 7', d: '012341', p: true},
        { n: 'F', m: 'x 8 10 10 10 8', d: '012341', p: true},
        { n: 'Gb', m: '2 4 4 3 2 2', d: '134211', p: true},
        { n: 'G', m: '3 5 5 4 3 3', d: '134211', p: true},
        { n: 'Ab', m: '4 6 6 5 4 4', d: '134211', p: true},
        { n: 'A', m: '5 7 7 6 5 5', d: '134211', p: true},
        { n: 'Bb', m: 'X 1 3 3 3 1', d: '012341', p: true},
        { n: 'B', m: '7 9 9 8 7 7', d: '134211', p: true},    
    ];
    
    bibliotecaAcordesMenores = [
        { n: 'Cm', m: 'X 3 5 5 4 3', d: '013421', p: true},
        { n: 'C#m', m: 'X 4 6 6 5 4', d: '013421', p: true},
        { n: 'Dm', m: 'X X 0 2 3 1', d: '000321', p: null},
        { n: 'D#m', m: 'X 6 8 8 7 6', d: '013421', p: true},
        { n: 'Em', m: '0 2 2 0 0 0', d: '023000', p: null},
        { n: 'Fm', m: '1 3 3 1 1 1', d: '134111', p: true},
        { n: 'F#m', m: '2 4 4 2 2 2', d: '134111', p: true},
        { n: 'Gm', m: '3 5 5 3 3 3', d: '134111', p: true},
        { n: 'G#m', m: '4 6 6 4 4 4', d: '134111', p: true},
        { n: 'Am', m: 'X 0 2 2 1 0', d: '0023100', p: null},
        { n: 'A#m', m: 'X 1 3 3 2 1', d: '013421', p: true},
        { n: 'Bm', m: 'X 2 4 4 3 2', d: '013421', p: true},    
    ];
    
    bibliotecaAcordesSetima = [
        { n: 'C7', m: 'X 3 2 3 1 0', d: '032410', p: null},
        { n: 'C#7', m: 'X 4 6 4 6 4', d: '012131', p: true},
        { n: 'D7', m: 'X X 0 2 1 2', d: '000213', p: null},
        { n: 'D#7', m: 'X 6 8 6 8 6', d: '012131', p: true},
        { n: 'E7', m: '0 2 0 1 0 0', d: '020100', p: null},
        { n: 'F7', m: '1 3 1 2 1 1', d: '131211', p: true},
        { n: 'F#7', m: '2 4 2 3 2 2', d: '131211', p: true},
        { n: 'G7', m: '3 2 0 0 0 1', d: '320001', p: null},
        { n: 'G#7', m: '4 6 4 5 4 4', d: '131211', p: true},
        { n: 'A7', m: 'X 0 2 0 2 0', d: '0010300', p: null},
        { n: 'A#7', m: 'X 1 3 1 3 1', d: '012131', p: true},
        { n: 'B7', m: 'X 2 4 2 4 2', d: '012131', p: true},    
    ];

    getTodosAcordes(){
        let bibliotecaAcordesFinal = [];
        bibliotecaAcordesFinal = bibliotecaAcordesFinal.concat(this.bibliotecaAcordesBasicos);
        bibliotecaAcordesFinal = bibliotecaAcordesFinal.concat(this.bibliotecaAcordesBasicos2);
        bibliotecaAcordesFinal = bibliotecaAcordesFinal.concat(this.bibliotecaAcordesMenores);
        bibliotecaAcordesFinal = bibliotecaAcordesFinal.concat(this.bibliotecaAcordesSetima);
        bibliotecaAcordesFinal = bibliotecaAcordesFinal.concat(this.bibliotecaAcordesCustomizado);
        return bibliotecaAcordesFinal;
    }

    getAcordePorCifra(cifra){
        return this.getTodosAcordes().find(acorde => acorde.n == cifra);
    }

    setAcordesCustomizados(acordes){
        this.bibliotecaAcordesCustomizado = acordes;
    }

    getBaseAcordeAtual(acorde){
        let base = acorde[0];
        if(acorde[1] == '#' || acorde[1] == 'b')
            base = base + acorde[1];        
        return this.basesAcordes.find(baseAcorde => baseAcorde.base == base);
    }

    getBaseAcordePorPosicao(posicao){
        return this.basesAcordes.find(baseAcorde => baseAcorde.posicao == posicao).base;
    }

    getNumeroBaseAcorde(acorde){        
        return (this.getBaseAcordeAtual(acorde)).posicao;
    }

    alterarBaseAcorde(novaBase, acorde){
        let baseAntiga = this.getBaseAcordeAtual(acorde).base;        
        if(baseAntiga.length > 1)
            return novaBase + acorde.substring(2);
        else
            return novaBase + acorde.substring(1);
    }
}

function criarTitulo(texto) {
    let h4 = document.createElement('h4');
    h4.innerHTML = texto;
    acordes.append(h4);
}

let biblioteca = new BibliotecaAcorde();

// Para melhorar a separação dos testes será inserido um título entre as partes

this.criarTitulo('Acordes Básicos I');

biblioteca.bibliotecaAcordesBasicos.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p);
    document.getElementById('acordes').appendChild(novoAcorde.montaAcorde());
});

this.criarTitulo('Acordes Básicos II');

biblioteca.bibliotecaAcordesBasicos2.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p);
    document.getElementById('acordes').appendChild(novoAcorde.montaAcorde());
});

this.criarTitulo('Acordes Menores');

biblioteca.bibliotecaAcordesMenores.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p);
    document.getElementById('acordes').appendChild(novoAcorde.montaAcorde());
});

this.criarTitulo('Acordes 7ª');

biblioteca.bibliotecaAcordesSetima.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p);
    document.getElementById('acordes').appendChild(novoAcorde.montaAcorde());
});