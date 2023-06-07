export default function convertToRoman(numeros){
  let vetorRomanos = []
   
  for(let i=0;i<numeros.length;i++){
    switch (i){
      case 3://se o número tiver 4 dígitos, o último dígito sempre é a unidade
        vetorRomanos.push(unidadeF(numeros[i]))
        break

      case 2:
        if(numeros.length==3){//se o número tiver só 3 dígitos, essa parte é da unidade
          vetorRomanos.push(unidadeF(numeros[i]))
          
        }else{//se não for da unidade, é da dezena
          vetorRomanos.push(dezenaF(numeros[i]))
          
        }
        break

      case 1:
        if(numeros.length==2){//se o número tiver só 2 dígitos, essa parte é da unidade
          vetorRomanos.push(unidadeF(numeros[i]))
          
        }else if(numeros.length==3){//se o número tiver 3 dígitos, é a parte da dezena
          vetorRomanos.push(dezenaF(numeros[i]))
          
        }else if(numeros.length==4){//se o número tiver 4 dígitos, é a parte da centena
          vetorRomanos.push(centenaF(numeros[i]))
        }
        break

      case 0:
        if(numeros.length==1){//se o número tiver só 1 dígito, essa parte é da unidade
          vetorRomanos.push(unidadeF(numeros[i]))
          
        }else if(numeros.length==2){//se o número tiver 2 dígitos, é a parte da dezena
          vetorRomanos.push(dezenaF(numeros[i]))
          
        }else if(numeros.length==3){//se o número tiver 3 dígitos, é a parte da centena
          vetorRomanos.push(centenaF(numeros[i]))
          
        }else if(numeros.length==4){//se o número tiver 4 dígitos, é a parte do milhar
          vetorRomanos.push(milharF(numeros[i]))
          
        }
        break

    }
  }
  
  let numeroRomano = vetorRomanos.join('')
  return numeroRomano
}


function unidadeF(n){
  let unidade
  switch (n){
    case '0':
      unidade = null
      break

    case '1':
      unidade = "I"
      break

    case '2':
      unidade = "II"
      break
      
    case '3':
      unidade = "III"
      break

    case '4':
      unidade = "IV"
      break

    case '5':
      unidade = "V"
      break

    case '6':
      unidade = "VI"
      break

    case '7':
      unidade = "VII"
      break

    case '8':
      unidade = "VIII"
      break

    case '9':
      unidade = "IX"
      break
  }
  return unidade;
}

function dezenaF(n){
  let dezena
  switch (n){
    case '0':
      dezena = null
      break

    case '1':
      dezena = "X"
      break

    case '2':
      dezena = "XX"
      break
      
    case '3':
      dezena = "XXX"
      break

    case '4':
      dezena = "XL"
      break

    case '5':
      dezena = "L"
      break

    case '6':
      dezena = "LX"
      break

    case '7':
      dezena = "LXX"
      break

    case '8':
      dezena = "LXXX"
      break

    case '9':
      dezena = "XC"
      break
  }
  return dezena;
}

function centenaF(n){
  let centena
  switch (n){
    case '0':
      centena = null
      break

    case '1':
      centena = "C"
      break

    case '2':
      centena = "CC"
      break
      
    case '3':
      centena = "CCC"
      break

    case '4':
      centena = "CD"
      break

    case '5':
      centena = "D"
      break

    case '6':
      centena = "DC"
      break

    case '7':
      centena = "DCC"
      break

    case '8':
      centena = "DCCC"
      break

    case '9':
      centena = "CM"
      break
  }
  return centena;
}

function milharF(n){
  let milhar
  switch (n){
    case '0':
      milhar = null
      break

    case '1':
      milhar = "M"
      break

    case '2':
      milhar = "MM"
      break
      
    case '3':
      milhar = "MMM"
      break
  }
  return milhar;
}