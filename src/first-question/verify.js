import convertToRoman from '../first-question/toRoman.js'
import convertToArabic from '../first-question/toArabic.js'

function getArabicNumber(){
  let arabicValue = document.getElementById("num-arabico").value
  let arabicArray = []
  if(arabicValue){
    for(let i=0; i<arabicValue.length;i++){
      arabicArray.push(arabicValue[i])
    }
  }
  return arabicArray;
}

function getRomanNumber(){
  let romanValue = document.getElementById("num-romano").value
  let romanArray = []
  if(romanValue){
    for(let j=0; j<romanValue.length;j++){
      romanArray.push(romanValue[j])
    }
  }
  return romanArray;
}

function romanFormat(){
  let formatoValido = true
  let vetorRomanos = getRomanNumber()
  let repetiu = romanFormatRepeats(vetorRomanos)
  let ordemErrada = romanFormatOrder(vetorRomanos)
  let numeroInex = romanFormatUnkownRepeat(vetorRomanos)

  if(repetiu==true){
    formatoValido = false
    showError("erroRepetiu")
  }else if(ordemErrada == true){
    formatoValido = false
    showError("erroOrdem")
  }else if(numeroInex == true){
    formatoValido = false
    showError("erroInexistente")
  }
  return formatoValido
}

// função para verificar se alguma numeração se repitiu mais de 3 vezes
function romanFormatRepeats(vetor){
  let repetiu = false
  let I = 0
  let V = 0
  let X = 0
  let L = 0
  let C = 0
  let D = 0
  let M = 0
  for(let j=0;j<vetor.length;j++){
    switch (vetor[j]){
      case 'I': I++ 
        break
      
      case 'V': V++ 
        break
        
      case 'X': X++ 
        break
        
      case 'L': L++ 
        break
        
      case 'C': C++ 
        break
        
      case 'D': D++ 
        break
        
      case 'M': M++ 
        break
    }
  }
  // Os números 3900 (MMMCM), 390 (CCCXC) e 39 (XXXIX) possuem o mesmo caractere 4 vezes. Portanto, CM, XC e IX não serão contados como repetição.
  if(vetor.join('').includes('CM')){
    M--
  }else if(vetor.join('').includes('XC')){
    C--
  }else if(vetor.join('').includes('IX')){
    X--
  }

  if(I>3||V>3||X>3||L>3||C>3||D>3||M>3){
    repetiu = true
  }
  return repetiu
}

// função para verificar se há alguma ordem errada no número romano
function romanFormatOrder(vetor){
  let n = vetor.join('')
  let errado = false
  // ordens proibidas
  if((n.includes('IL'))||
  (n.includes('IC'))||
  (n.includes('ID'))||
  (n.includes('IM'))||
  (n.includes('VX'))||
  (n.includes('VL'))||
  (n.includes('VC'))||
  (n.includes('VD'))||
  (n.includes('VM'))||
  (n.includes('LC'))||
  (n.includes('LD'))||
  (n.includes('LM'))||
  (n.includes('XD'))||
  (n.includes('XM'))||
  (n.includes('DM'))
  ){
    errado = true
  }
  return errado
}

// função para verificar se há números que devem ser representados de outra forma
function romanFormatUnkownRepeat(vetor){
  let n = vetor.join('')
  let errado = false
  // ordens proibidas
  if((n.includes('VV'))||
  (n.includes('LL'))||
  (n.includes('DD'))||
  (n.includes('IIV'))||
  (n.includes('IIX'))||
  (n.includes('IXX'))||
  (n.includes('XXL'))||
  (n.includes('XXC'))||
  (n.includes('XLL'))||
  (n.includes('XCC'))||
  (n.includes('CCD'))||
  (n.includes('CCM'))||
  (n.includes('CMM'))||
  (n.includes('CDD'))||
  (n.includes('IVI'))||
  (n.includes('IXI'))||
  (n.includes('XLX'))||
  (n.includes('XCX'))||
  (n.includes('CDC'))||
  (n.includes('CMC'))
  ){
    errado = true
  }
  return errado
}

function showError(errorName){
  let errorMsg
  switch (errorName){
    case 'noNumber':
      errorMsg = "Erro! Você precisa digitar algum número."
      break
      
    case 'naoRomano':
      errorMsg = "Erro! O número romano possui algum caractere não pertencente à regra do conversor."
      break
      
    case 'arabicoOutOfRange':
      errorMsg = "Erro! O número arábico deve estar entre 1 e 3999."
      break

    case 'erroRepetiu':
      errorMsg = "Erro! Alguma numeração repetiu mais de 3 vezes."
      break

    case 'erroOrdem':
      errorMsg = "Erro! Há alguma letra fora da ordem correta de números romanos."
      break

    case 'erroInexistente':
      errorMsg = "Erro! Este número deve ser escrito em outro formato."
      break
  

  }
  if(errorMsg){
    document.getElementById("convert-error").innerHTML = errorMsg
  }
}

function hideError(){
  document.getElementById("convert-error").innerHTML = ""
}

function verify(){
  let a = getArabicNumber()
  let r = getRomanNumber()
  let arabicValue = parseInt(document.getElementById("num-arabico").value)
  
  if(a.length > 0){// se tiver número arábico no input
    if(arabicValue < 4000 && arabicValue > 0){// verifica se o número está no range
      document.getElementById("num-arabico").value = ""
      document.getElementById("num-romano").value = convertToRoman(a)
      hideError()
    }else{
      document.getElementById("num-romano").value = ""
      showError("arabicoOutOfRange")
    }
  }

  
  else if(r.length > 0){// se tiver número romano no input
    // percorrer o vetor para verificar se o valor digitado está no formado de números romanos
    let naoRomano = false
    let formatoValido = romanFormat()
    for(let i=0;i<r.length;i++){
      if(r[i] != "I" && r[i] != "V" && r[i] != "X" && r[i] != "L" && r[i] != "C" && r[i] != "D" && r[i] != "M"){
        naoRomano = true
      }
    }
    if(naoRomano == true){
      showError("naoRomano")
    }else if(formatoValido == true){// se o formato for validado pela função 
      document.getElementById("num-romano").value = ""
      document.getElementById("num-arabico").value = convertToArabic(r)
      hideError()
    }
  }

  // se não tiver nenhum número nos inputs
  else{
    showError("noNumber")
  }
}

// acionar a função caso o botão seja clicado
document.getElementById("convert-button").addEventListener('click', verify)