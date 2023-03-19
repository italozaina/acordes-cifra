const acordes = document.getElementById('acordes');

function montarGrelha(contexto) {
    contexto.fillStyle = "rgb(255,255,255)";
    contexto.fillRect (0, 0, 90, 130);
    contexto.fillStyle = "rgb(0,0,0)";
    contexto.fillRect (10, 27, 71, 3);
    for (let index = 0; index < 6; index++) {
        let x = (70/5*index) + 10;        
        contexto.fillRect (x, 30, 1, 90);
    }

    for (let index = 1; index < 7; index++) {
        let y = (90/6*index) + 30;
        contexto.fillRect (10, y, 71, 1);
    }
}

function posicionaDigitacao(contexto, corda, casa, dedo = null){
    contexto.fillStyle = "rgb(0,0,0)";
    corda = 7-corda;
    let x = 70/5 * corda - 3;
    if(casa > 0 && casa < 7){    
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
    let x = 70/5 * corda - 9;
    let y = 30;
    y = 90/6 * casa + 40/2;
    contexto.fillRect (x, y, 85 - x, 6);
}

function montaAcorde(cifra, molde, dedos = null, pestana = null) {
    // Cria um novo canvas
    let novoCanvas = document.createElement('canvas');
    novoCanvas.width = 90;
    novoCanvas.height = 130;
    let contexto = novoCanvas.getContext('2d');    

    // Desenha a grelha do acorde
    this.montarGrelha(contexto);

    // Escreve o nome da cifra sobre a grelha
    contexto.font = 'bold 12px Arial';
    contexto.textAlign = 'center';
    contexto.textBaseline = 'middle';
    contexto.fillText(cifra, 45, 10);

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

this.montaAcorde('C', 'X 3 2 0 1 0', '032010');

this.montaAcorde('C#m', 'X 4 6 6 5 4', '013421', true);

this.montaAcorde('D', 'X X 0 2 3 2', '000132');

this.montaAcorde('E', '0 2 2 1 0 0', '023100');

this.montaAcorde('Em', '0 2 2 0 0 0', '023000');

this.montaAcorde('F', '1 3 3 2 1 1', '134211', true);

this.montaAcorde('F#m', '2 4 4 2 2 2', '134111', true);

this.montaAcorde('G', '3 2 0 0 3 3', '210034');

this.montaAcorde('A', 'X 0 2 2 2 0', '0012300');

this.montaAcorde('Am7', 'X 0 2 0 1 0', '0020100');

this.montaAcorde('B', 'X 2 4 4 4 2', '012341',true);