import verifyRules from "./verifyRules.js"

function createMatrizHTML(){
    let matrizHTML = document.getElementById("matriz")
    for(let i=0;i<10;i++){
        matrizHTML.innerHTML += "<div class='linha' id='l"+i+"'></div>"
      for(let j=0;j<10;j++){
        document.getElementById("l"+i).innerHTML += "<div class='celula' id='l"+i+"c"+j+"'></div>"
      }
    }
}

function createMatrizJS(){
    let matrizJS = []
    for(let i=0;i<10;i++){
        matrizJS[i] = []
      for(let j=0;j<10;j++){
        matrizJS[i][j] = 0
      }
    }
    return matrizJS
}

function preencherMatrizOnClick(matrizPreenchida){
    for(let i=0;i<10;i++){
      for(let j=0;j<10;j++){
        document.getElementById("l"+i+"c"+j).addEventListener('click', function (){
            if(matrizPreenchida[i][j] == 0){
                matrizPreenchida[i][j] = 1
                document.getElementById("l"+i+"c"+j).classList.add('celulaSelecionada')
            }else{
                matrizPreenchida[i][j] = 0
                document.getElementById("l"+i+"c"+j).classList.remove('celulaSelecionada')
            }            
        })

        // manter os valores que não foram clicados do jeito que estavam
        if(matrizPreenchida[i][j] == 0){
            matrizPreenchida[i][j] = 0
        }else if(matrizPreenchida[i][j] == 1){
            matrizPreenchida[i][j] = 1
        }
      }
    }
    return matrizPreenchida    
}

function next(){
    matriz = verifyRules(matriz)
    document.getElementById("gen").innerHTML = "Geração atual: "+i
    i++

    // verifica de novo se no intervalo entre uma geração e outra teve algum clique
    matriz = preencherMatrizOnClick(matriz)
}

let i = 2
createMatrizHTML()
let matrizCriada = createMatrizJS()

// essa variável contém a matriz após os primeiros cliques
let matriz = preencherMatrizOnClick(matrizCriada)
let intervalo

document.getElementById("start-game-button").addEventListener('click', function(){
  // executar função a cada 0.5s
  intervalo = setInterval(next, 500)
})

document.getElementById("pause-game-button").addEventListener('click', function(){
  clearInterval(intervalo)
})

