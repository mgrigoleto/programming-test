import makeCalculation from "./getConsumption.js"


//  ESTA FUNÇÃO SALVA OS VALORES INPUTADOS E CRIA NOVAS LINHAS PARA ENTRADA DE DADOS DA PRIMEIRA PERGUNTA

function buildNameQuestion(){
    let i = 0
    // cria matriz com formato [nome, taxa (0 para não, 1 para sim)]
    let namesTax = []  

    // se o botão de salvar for clicado
    let nome
    let taxa

    document.getElementById('confirm-name').addEventListener('click', function(){
        nome = document.getElementById('name'+(i+1))
        taxa = document.getElementById('tax'+(i+1))
        if(nome.value){    
            hideMsg("nomes-error") 
            showMsg("nameSave")       
            namesTax[i] = []
            namesTax[i][0] = nome.value
            namesTax[i][1] = taxa.selectedIndex // 0 para não, 1 para sim
        }else{
            showMsg("noName")
        }
    })
    
    // se o botão de + for clicado
    document.getElementById('add-name').addEventListener('click', function(){        
        // salvar os dados anteriores caso eles não tenham sido salvos manualmente
        if(!namesTax[i]){
            nome = document.getElementById('name'+(i+1))
            taxa = document.getElementById('tax'+(i+1))
            if(nome.value){
                hideMsg("nomes-error")
                showMsg("nameSave")            
                namesTax[i] = []
                namesTax[i][0] = nome.value
                namesTax[i][1] = taxa.selectedIndex // 0 para não, 1 para sim
            }else{
                showMsg("noName")
            }
        }else{
            hideMsg("nomes-save")
        }
        if(nome.value){
            hideMsg("nomes-error")
            i++
            addNameInputs(i)

            // adiciona os valores dos campos anteriores
            for(let j=1;j<=i;j++){
                document.getElementById('name'+(j)).value = namesTax[j-1][0]
                document.getElementById('tax'+(j)).selectedIndex = namesTax[j-1][1]
            }
        }
        // verificar se tem uma linha só para esconder o botão de remover
        activateOrRemoveButton(i,'remove-name')
    })

    // se o botão de - for clicado
    document.getElementById('remove-name').addEventListener('click', function(){
        namesTax.splice(i, 1)
        removeInputs(i,'nome-div')
        i--
        
        // verificar se tem uma linha só para esconder o botão de remover
        activateOrRemoveButton(i,'remove-name')
    })
    
    return namesTax
}

function addNameInputs(i){
    // Função que cria nova linha para input na pergunta sobre os nomes
    // Adicionei o syle com 2px a mais de margem aos itens para corrigir o pequeno bug visual que a manipulação do DOM pelo JS causa. Os elementos criados nessa função estavam desalinhados, mesmo seguindo o que é definido na sua classe do CSS.
    document.getElementById("names-input").innerHTML += 
            "<div class='name-tax-line' id='nome-div"+(i+1)+"'>"+
                "<input style='margin-right:12px' class='ppl-nome-inputs-style' type='text' id='name"+(i+1)+"' placeholder='Nome'>"+
                "<select style='margin-left:12px' class='tax-style' name='taxas' id='tax"+(i+1)+"'>"+
                    "<option selected value='nao-paga'>Não</option>"+
                    "<option value='paga'>Sim</option>"+
                "</select>"+
            "</div>"
}


//  ESTA FUNÇÃO SALVA OS VALORES INPUTADOS E CRIA NOVAS LINHAS PARA ENTRADA DE DADOS DA PRIMEIRA PERGUNTA

function buildItemsQuestion(){
    let i = 0
    // matriz com formato [quantidade, item, preço]
    let itens = []

    // se o botão de salvar for clicado
    let qtd
    let item
    let preco

    document.getElementById('confirm-item').addEventListener('click', function(){
        qtd = document.getElementById('qtd'+(i+1)).value
        item = document.getElementById('item'+(i+1)).value
        preco = document.getElementById('prc'+(i+1)).value
        if((qtd && item && preco)&&(qtd>0 && qtd<=51)&&(preco>0)){            
            hideMsg("itens-error")
            showMsg("itemSave") 
            itens[i] = []
            itens[i][0] = qtd
            itens[i][1] = item
            itens[i][2] = preco
        }else if(!(qtd>0 && qtd<=51)){
            showMsg("qtdInvalida")
        }else if(!(preco>0)){
            showMsg("prcInvalido")
        }else if(!(qtd && item && preco)){
            showMsg("noItem")
        }
    })

    // se o botão de + for clicado
    document.getElementById('add-item').addEventListener('click', function(){
        // salvar os dados anteriores caso eles não tenham sido salvos manualmente
        if(!itens[i]){
            qtd = document.getElementById('qtd'+(i+1)).value
            item = document.getElementById('item'+(i+1)).value
            preco = document.getElementById('prc'+(i+1)).value
            if((qtd && item && preco)&&(qtd>0 && qtd<=51)&&(preco>0)){            
                hideMsg("itens-error")
                showMsg("itemSave") 
                itens[i] = []
                itens[i][0] = qtd
                itens[i][1] = item
                itens[i][2] = preco
            }else if(!(qtd>0 && qtd<=51)){
                showMsg("qtdInvalida")
            }else if(!(preco>0)){
                showMsg("prcInvalido")
            }else if(!(qtd && item && preco)){
                showMsg("noItem")
            }
        }else{
            hideMsg("itens-save")
        }
        if(qtd && item && preco){
            hideMsg("itens-error")
            i++
            addItemInputs(i)

            // adiciona os valores dos campos anteriores
            for(let j=1;j<=i;j++){
                document.getElementById('qtd'+(j)).value = itens[j-1][0]
                document.getElementById('item'+(j)).value = itens[j-1][1]
                document.getElementById('prc'+(j)).value = itens[j-1][2]
            }
        }      

        // verificar se tem uma linha só para esconder o botão de remover
        activateOrRemoveButton(i,'remove-item')
    })

    // se o botão de - for clicado
    document.getElementById('remove-item').addEventListener('click', function(){
        itens.splice(i, 1)
        console.log(itens)
        removeInputs(i,'itens-div')
        i--
        
        // verificar se tem uma linha só para esconder o botão de remover
        activateOrRemoveButton(i,'remove-item')
    })
    
    return itens
}

function addItemInputs(i){
    // Adicionei o syle com 4px a mais de margem aos itens para corrigir o pequeno bug visual que a manipulação do DOM pelo JS causa. Os elementos criados nessa função estavam desalinhados, mesmo seguindo o que é definido na sua classe do CSS.
    document.getElementById("itens-input").innerHTML += 
            '<div class="itens-line" id="itens-div'+(i+1)+'">'+
                '<input style="margin-right:14px" class="itens-qtd-inputs-style" type="number" id="qtd'+(i+1)+'"" value="1" min="1" max="50">'+
                '<input class="itens-nome-inputs-style" type="text" id="item'+(i+1)+'"" placeholder="Item">'+
                '<input style="margin-left:14px" class="preco-qtd-inputs-style" type="number" id="prc'+(i+1)+'"" placeholder="Preço" min="1">'+
            '</div>'
}

// REMOVER OS INPUTS ANTERIORES
function removeInputs(i, div){
    hideMsg("")
    document.getElementById(div+(i+1)).remove()
}

// MOSTRAR O BOTÃO DE REMOVER
function activateOrRemoveButton(i, id){
    // se tiver mais de 1 linha, mostrar o botão remover
    if(i>0){
        document.getElementById(id).style.display = "block"
    }else{
        document.getElementById(id).style.display = "none"
    }
}

// FUNÇÃO PARA MOSTRAR AS MENSAGENS
function showMsg(msg){
    switch (msg){
        case 'noName':
            document.getElementById("nomes-error").innerHTML = "Erro! Você precisa digitar um nome."
            
            break
            
        case 'noItem':
            document.getElementById("itens-error").innerHTML =  "Erro! Você deve preencher todos os detalhes do item."
            break

        case 'qtdInvalida':
            document.getElementById("itens-error").innerHTML =  "Erro! A quantidade especificada deve ser entre 1 e 50."
            break

        case 'prcInvalido':
            document.getElementById("itens-error").innerHTML =  "Erro! O preço do produto deve ser maior que Zero."
            break

        case 'nameSave':
            document.getElementById("nomes-save").innerHTML =  "Nome e taxa salvos com sucesso!"
            setTimeout(function() {
                document.getElementById("nomes-save").innerHTML = "";
              }, 2000);
            break 

        case 'itemSave':
            document.getElementById("itens-save").innerHTML =  "Quantidade, item e valor salvos com sucesso!"
            setTimeout(function() {
                document.getElementById("itens-save").innerHTML = "";
              }, 2000);
            break 
    }
}


// FUNÇÃO PARA ESCONDER AS MENSAGENS
function hideMsg(msg){
    if(msg == "nomes-error"){
        document.getElementById("nomes-error").innerHTML = ""
    }else if(msg == "itens-error"){
        document.getElementById("itens-error").innerHTML = ""
    }else if(msg == "nomes-save"){
        document.getElementById("nomes-save").innerHTML = ""
    }else if(msg == "itens-save"){
        document.getElementById("itens-save").innerHTML = ""
    }
    //essa condição é executada quando algum botão de remover for clicado
    else{
        document.getElementById("nomes-error").innerHTML = ""
        document.getElementById("itens-error").innerHTML = ""
        document.getElementById("nomes-save").innerHTML = ""
        document.getElementById("itens-save").innerHTML = ""
    }
}

let names = buildNameQuestion()
let itens = buildItemsQuestion()
document.getElementById("next-questions").addEventListener('click', function(){
    if(names != "" && itens != "" ){
        makeCalculation(names, itens)
    }else{
        if(names == ""){
            showMsg("noName")
        }
        if(itens == ""){
            showMsg("noItem")
        }
    }
})

