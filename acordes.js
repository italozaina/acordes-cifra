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
        document.getElementById('acordes').appendChild(novoCanvas);
    }
}


// const acordes = document.getElementById('acordes');

function criarTitulo(texto) {
    let h4 = document.createElement('h4');
    h4.innerHTML = texto;
    acordes.append(h4);
}

const bibliotecaAcordesBasicos = [
    { n: 'C', m: 'X 3 2 0 1 0', d: '032010', p: null},
    { n: 'C#', m: 'X 4 6 6 5 4', d: '013421', p: true},
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

const bibliotecaAcordesBasicos2 = [
    { n: 'C', m: 'X 3 5 5 5 3', d: '012341', p: true},
    { n: 'Db', m: 'X 4 6 6 5 4', d: '013421', p: true},
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


// Para melhorar a separação dos testes será inserido um título entre as partes

this.criarTitulo('Acordes Básicos I');

bibliotecaAcordesBasicos.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p)
    novoAcorde.montaAcorde();
});

this.criarTitulo('Acordes Básicos II');

bibliotecaAcordesBasicos2.forEach(acorde => {
    let novoAcorde = new Acorde(acorde.n, acorde.m, acorde.d,acorde.p)
    novoAcorde.montaAcorde();
});