export default function convertToArabic(numeros){
    let n = numeros.join('')
    let numeroArabico = 0

    // percorrer o vetor e somar todos os números
    for(let j=0;j<numeros.length;j++){
        switch (numeros[j]){
            case 'I':
                numeroArabico+=1
                break
      
            case 'V':
                numeroArabico+=5
                break
    
            case 'X':
                numeroArabico+=10
                break
    
            case 'L':
                numeroArabico+=50
                break

            case 'C':
                numeroArabico+=100
                break

            case 'D':
                numeroArabico+=500
                break
            
            case 'M':
                numeroArabico+=1000
                break
        }
    }
    
    //  Lógica para as subtrações:
    //  Acima na função é somado o valor de cada algarismo para formar o número arábico
    //  Por exemplo: XI = 10 + 1. IX = 10 + 1
    //  No entanto, XI e IX são números diferentes
    //  XI => 11 e IX => 9
    //  Para fazer o cálculo correto, após somar todos os algarismo, eu subtraio os valores fixos que são definidos pelas regras abaixo.
    //  Dessa forma, XI = 10 + 1 = 11. IX = 10 + 1 - 2 = 9

    if(n.includes('IV') || n.includes('IX')){
        numeroArabico = numeroArabico-2
    }
    if(n.includes('XL') || n.includes('XC')){
        numeroArabico = numeroArabico-20
    }
    if(n.includes('CD') || n.includes('CM')){
        numeroArabico = numeroArabico-200
    }
    return numeroArabico
  }
