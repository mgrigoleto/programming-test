// deixar apenas 1 input funcionando por vez
let arabicInput = document.getElementById("num-arabico")
let romanInput = document.getElementById("num-romano")

arabicInput.addEventListener('click', function(){
  romanInput.value = null
})
romanInput.addEventListener('click', function(){
  arabicInput.value = null
})

// deixar os números romanos em upper case
function upperRoman(){
  romanInput.value = romanInput.value.toUpperCase()
}