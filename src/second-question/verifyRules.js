export default function verifyRules(matriz){
    // os valores da próxima geração serão armazenados na novaMatriz
    let novaMatriz = createMatrizZerada()  

    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            //vetor para armazenar os vizinhos
            let vizinhos = []
            let soma = 0

            //percorrer os vizinhos e incluir o valor 0 caso o vizinho não exista
            for(let a=-1;a<2;a++){
                for(let b=-1;b<2;b++){

                    // tenta achar a posição da matriz
                   try{
                    
                    // se a célula encontrada é a própria célula que está sendo consultada, adiciona 0 pois seu valor deve ser irrelevante na soma
                    if((a==0) && (b==0)){
                        vizinhos.push(0)
                    }

                    // se achar a posição e não for indefinida, adiciona o valor dessa posição ao vetor
                    else if(matriz[i+a][j+b] !== undefined){
                        vizinhos.push(matriz[i+a][j+b])
                    }
                    
                    // se achar a posição e ela for indefinida, é considerada 0
                    else if(matriz[i+a][j+b] == undefined){
                        vizinhos.push(0)
                    }
                   }

                   // se não achar uma posição na matriz, adiciona 0 ao vetor
                   catch(error){
                    vizinhos.push(0)
                   }
                }
            }

            for(let c=0;c<vizinhos.length;c++){
                soma+=vizinhos[c]
            }

            // regras para a célula morta
            if(matriz[i][j] == 0 && soma == 3){
                novaMatriz[i][j] = 1
                document.getElementById("l"+i+"c"+j).classList.add('celulaSelecionada')
            }
            
            // regras para a célula viva
            else if(matriz[i][j] == 1 && soma < 2){
                novaMatriz[i][j] = 0
                document.getElementById("l"+i+"c"+j).classList.remove('celulaSelecionada')
            }
            else if(matriz[i][j] == 1 && soma > 3){
                novaMatriz[i][j] = 0
                document.getElementById("l"+i+"c"+j).classList.remove('celulaSelecionada')
            }
            else if(matriz[i][j] == 1 && (soma == 2 || soma == 3)){
                novaMatriz[i][j] = 1
            }
        }
    }
    return novaMatriz
}

function createMatrizZerada(){
    let matrizJS = []
    for(let i=0;i<10;i++){
        matrizJS[i] = []
      for(let j=0;j<10;j++){
        matrizJS[i][j] = 0
      }
    }
    return matrizJS
}