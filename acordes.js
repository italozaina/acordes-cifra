Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
Array.prototype.min = function() {
return Math.min.apply(null, this);
};

const acordes = document.getElementById('acordes');

function montarGrelha(contexto) {
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

function montarGrelhaAvancada(contexto, casa) {
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

function posicionaDigitacao(contexto, corda, casa, dedo = null){
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

function posicionaPestana(contexto, corda, casa) {
    contexto.fillStyle = "rgb(0,0,0)";
    corda = 7-corda;
    let x = 70/5 * corda + 1;
    let y = 30;
    y = 90/6 * casa + 40/2;
    contexto.fillRect (x, y, 95 - x, 6);
}

function menorPosicaoAcorde(molde) {
    let moldeSeparado = molde.split(' ');
    moldeSeparado = moldeSeparado.filter(function(item) {
        return (item !== 'X' && item !== 'x' && item != 0);
    })
    moldeSeparado = moldeSeparado.map(Number);
    return moldeSeparado.min();
}

function precisaDeGrelhaAvancada(molde) {    
    let moldeSeparado = molde.split(' ');
    moldeSeparado = moldeSeparado.filter(function(item) {
        return (item !== 'X' && item !== 'x' && item != 0);
    })
    moldeSeparado = moldeSeparado.map(Number);
    if(moldeSeparado.max() > 6){
        return true;
    } else {
        return false;
    }
}

function montaAcorde(cifra, molde, dedos = null, pestana = null) {
    // Cria um novo canvas
    let novoCanvas = document.createElement('canvas');
    novoCanvas.width = 100;
    novoCanvas.height = 130;
    let contexto = novoCanvas.getContext('2d');    

    // Desenha a grelha do acorde
    if(this.precisaDeGrelhaAvancada(molde)){
        let menor = this.menorPosicaoAcorde(molde)
        this.montarGrelhaAvancada(contexto, menor);
        molde = this.reposicionaMolde(molde);
    } else {
        this.montarGrelha(contexto);
    }    

    // Escreve o nome da cifra sobre a grelha
    contexto.font = 'bold 12px Arial';
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';
    contexto.fillText(cifra, 55, 10);

    // Prepara cifra do acorde
    let moldeSeparado = molde.split(' ');
    let pestanaCasa = -1;

    // Verifica se irá desenhar pestana
    if(pestana){
        if(moldeSeparado[0] == 'X' || moldeSeparado[0] == 'x'){
            pestanaCasa = moldeSeparado[1];
            this.posicionaPestana(contexto, 5, pestanaCasa);            
        } else {            
            pestanaCasa = moldeSeparado[0];
            this.posicionaPestana(contexto, 6, pestanaCasa);
        }
    }

    // Verifica se irá utilizar numeros dos dedos
    if(dedos == null){
        // Monta posicionamento de dedos
        moldeSeparado.forEach((posicao,i) => { 
            if(pestanaCasa != posicao)
                this.posicionaDigitacao(contexto,6-i,posicao);
        });
    } else {                
        // Monta posicionamento numérico de dedos
        moldeSeparado.forEach((posicao,i) => {     
            if(pestanaCasa != posicao)   
                this.posicionaDigitacao(contexto,6-i,posicao, dedos[i]);
        });
    }
    acordes.appendChild(novoCanvas);
}

function reposicionaMolde(molde) {
    let moldeSeparado = molde.split(' ');
    let menor = this.menorPosicaoAcorde(molde);    
    let diferenca = menor - 1;
    let novoMolde = [];
    moldeSeparado.forEach(p => {
        if(p == 'X' || p == 'x' || p == '0'){
            novoMolde.push(p);
        }else{
            let novaPosicao = p - diferenca;
            novoMolde.push(novaPosicao);
        }        
    });
    return novoMolde.join(' ');
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
    { n: 'D', m: '10 12 12 11 10 10', d: '134211', p: true},
];

bibliotecaAcordesBasicos.forEach(acorde => {
    this.montaAcorde(acorde.n, acorde.m, acorde.d,acorde.p);
});