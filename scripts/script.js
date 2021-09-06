/* 
# Conceitos/Lógica para funcionamento do Churrascômetro
- Carne: 
    * 400gr por pessoa -> até 6h de festa
    * 650gr por pessoa -> + 6h de festa
- Cerveja:
    * 1200ml por pessoa -> até 6h de festa
    * 2000ml por pessoa -> + 6h de festa
- Refrigerante/agua:
    * 1000ml por pessoa -> até 6h de festa
    * 1500ml por pessoa -> + 6h de festa

* Obs: as porções para crianças valem 1/2(0.5) de um adulto 
*/

const amountAdults = document.querySelector("#adults")
const amountChildren = document.querySelector("#children")
const inputDuration = document.querySelector("#duration")
const boxResult = document.querySelector(".result")



function calculateAmounts() {
    
    let adults = amountAdults.value;
    let children = amountChildren.value;
    let duration = inputDuration.value;

    let totalMeat = amountMeatPP(duration) * adults + (amountMeatPP(duration) / 2 * children)

    let totalBeer = amountBeerPP(duration) * adults 

    let totalDrinks = amountDrinkPP(duration) * adults + (amountDrinkPP(duration) / 2 * children)


    boxResult.innerHTML = `
    <p>✔ ${totalMeat/1000}kg de carner</p>
    <p>✔ ${Math.ceil(totalBeer/350)} Latas(de 350ml) de cerveja</p>
    <p>✔ ${Math.ceil(totalDrinks/2000)} garrafas(de 2L) de refrigerante/água</p>
    ` 
    
}


function amountMeatPP(duration) {
    if(duration >= 6) {
        return 650
    } else {
        return 400
    }
}

function amountBeerPP(duration) {
    if(duration >= 6) {
        return 2000
    } else {
        return 1200
    }
}

function amountDrinkPP(duration) {
    if(duration >= 6) {
        return 1500
    } else {
        return 1000
    }
}
