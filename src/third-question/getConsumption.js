export default function makeCalculation(names,itens){
    // ESCONDER A DIV ANTERIOR
    document.getElementById("nomes-itens").style.display = "none"
    document.getElementById("calculate").style.display = "block"

    buildUsesQuestions(names,itens)
    let consumo = getPeople(names,itens)
    document.getElementById("calculate").addEventListener('click', function(){
    let error = true

        for(let i=0;i<consumo.length;i++){
            for(let j=0;j<names.length;j++){
                // Se todas as linhas da matriz consumo estiver preenchida com pelo menos o nome de UMA pessoa, está certo
                if(consumo[i].includes(names[j][0])){
                    error = false
                }
            }
        }
        if(error == true){
            document.getElementById("consumo-error").innerHTML = "Erro! Algum item está sem nenhum pagador."
        }else{
            document.getElementById("consumo-error").innerHTML = ""
            let dados = calcular(consumo, names, itens)
            showResult(dados)
        }
    })
    
}

function buildUsesQuestions(names,itens){
    for(let i=0;i<itens.length;i++){
        // Construir uma pergunta pra cada item
        document.getElementById('consumo').innerHTML += '<div id="con-div-'+i+'">'+
        '<div><b><p class="p-question-text">Quem consumiu e/ou irá pagar pelo item '+itens[i][1]+'?</p></b></div>'+
        '<div class="nomes-box" id="con-nomes-'+i+'"></div>'

        // Construir um nome para cada um registrado
        for(let j=0;j<names.length;j++){
            document.getElementById('con-nomes-'+i).innerHTML += '<div class="nomes" id="item-'+i+'-pessoa-'+j+'">'+names[j][0]+'</div>'
        }
    }
}

function getPeople(names,itens){
    let consumo = [] // matriz para armazenar [item, pessoa 1, ..., pessoa n]
    for(let i=0;i<itens.length;i++){
        consumo[i] = [] // Cria uma linha na matriz
        consumo[i][0] = itens[i][1] // Armazena o nome do item em questão no início da linha da matriz

        // Pega todos os nomes que são opções para tal item
        for(let j=0;j<names.length;j++){
            consumo[i][j+1] = ''
            document.getElementById('item-'+i+'-pessoa-'+j).addEventListener('click', function(){
                // Se a pessoa não tiver armazenada em consumo ainda
                if(!consumo[i].includes(names[j][0])){
                    consumo[i][j+1] = names[j][0]                    
                    document.getElementById('item-'+i+'-pessoa-'+j).classList.add("nomes-selected")
                }else{
                    consumo[i][j+1] = ''
                    document.getElementById('item-'+i+'-pessoa-'+j).classList.remove("nomes-selected")
                }
            })            
        }
    }
    return consumo
}

function calcular(consumo, names, itens){
    let valor = [] // Matriz para armazenar [nome, valor a pagar]
    

    // Percorre a matriz dos nomes
    for(let i=0;i<names.length;i++){
        let preco = 0
        let consumidores = 0
        // Para cada pessoa, vê o que ela consumiu percorrendo a matriz consumo
        for(let j=0;j<consumo.length;j++){
            // Conta quantos consumidores tem um item
            for(let c=1;c<consumo[j].length;c++){
                if(consumo[j][c] != ''){
                    consumidores++
                }
            }
            // Se encontrar um consumo do usuário
            if(consumo[j].includes(names[i][0])){
                let qtdItem
                let precoItem
                // Percorre a matriz dos itens para pegar os detalhes do item em questão
                for(let k=0;k<itens.length;k++){
                    // Encontrou o item que o usuário consumiu
                    if(itens[k][1] == consumo[j][0]){
                        qtdItem = itens[k][0]
                        precoItem = itens[k][2]
                    }
                }
                // Se ele paga +10 ou não
                if(names[i][1]==1){
                    preco = parseFloat(preco + ((qtdItem*precoItem)/consumidores)*1.1)
                }else if(names[i][1]==0){
                    preco = parseFloat(preco + ((qtdItem*precoItem)/consumidores))
                }                 
            }
        }
        // Salva o nome e o valor total a ser pago
        valor[i] = []
        valor[i][0] = names[i][0]
        valor[i][1] = preco.toFixed(2)
    }        
    return valor
}

function showResult(valor){
    document.getElementById("calculate").style.display = "none"
    document.getElementById("consumo").style.display = "none"
    document.getElementById("result-box").innerHTML = '<table id="resultados">'+'<tr><th style="width:60%">Nome</th><th>Valor</th></tr>'+'</table>'
    for(let i=0;i<valor.length;i++){
        document.getElementById("resultados").innerHTML += 
        '<tr><td style="width:60%">'+valor[i][0]+'</td><td>R$ '+valor[i][1]+'</td></tr>'
    }
}