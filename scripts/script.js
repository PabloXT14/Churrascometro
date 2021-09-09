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



//Pré carregamento da tela
let carnes = ["Alcatra", "Picanha", "Pernil", "Picanha Suína", "Coxinha de Frango", "Asinha de Frango", "Linguiça p/ churrasco", "Linguiça Toscana"]

let drinks = ["Cerveja", "Refrigerante", "Suco", "Água", "Cachaça", "Vodka"]

const boxCarners  = document.querySelector(".option.meat .inputField")
const boxDrinks = document.querySelector(".option.drink .inputField")

window.onload = ()=> {
    let idCarne = 0;
    let idDrink = 0;

    for(let carne of carnes) {
        boxCarners.innerHTML += `
        <div class="contentBox">
            <input type="checkbox" id="meat${idCarne}" name="meat${idCarne}" value="${carne}">
            <label for="meat${idCarne}">${carne}</label>
        </div>
        `
        idCarne++;
    }

    for(let drink of drinks) {
        boxDrinks.innerHTML += `
        <div class="contentBox">
            <input type="checkbox" id="drink${idDrink}" name="drink${idDrink}" value="${drink}">
            <label for="drink${idDrink}">${drink}</label>
        </div>
        `
        idDrink++;
    }
}

// Funções de calculo das porções 
const amountAdults = document.querySelector("#adults")
const amountChildren = document.querySelector("#children")
const inputDuration = document.querySelector("#duration")
const boxResult = document.querySelector(".result")



function calculateAmounts() {
    
    let adults = amountAdults.value;
    let children = amountChildren.value;
    let duration = inputDuration.value;
    let inputsCarne = document.querySelectorAll(".option.meat .inputField .contentBox input");
    
    
    let qtnMeat = ""
    let totalMeat = 0;
    inputsCarne.forEach((elem)=> {
        if(elem.checked) {
            let qtn = amountMeatPP(duration, elem.value) * adults + (amountMeatPP(duration, elem.value) / 2 * children)
            totalMeat += qtn

            qtnMeat += `
                <p>${elem.value} <span class="qtn">${qtn/1000}kg</span></p>
            `    
        }
    })
    qtnMeat += `<p class="total">TOTAL <span class="qtnTotal">${totalMeat/1000}kg</span></p>`


    let totalBeer = amountBeerPP(duration) * adults 

    let totalDrinks = amountDrinkPP(duration) * adults + (amountDrinkPP(duration) / 2 * children)


    // boxResult.innerHTML = `
    // <p>✔ ${totalMeat/1000}kg de carner</p>
    // <p>✔ ${Math.ceil(totalBeer/350)} Latas(de 350ml) de cerveja</p>
    // <p>✔ ${Math.ceil(totalDrinks/2000)} garrafas(de 2L) de refrigerante/água</p>
    // ` 

    boxResult.innerHTML = `
    <div class="boxMeats">
        <h2>Carnes</h2>
        <div class="resultLines">
            ${qtnMeat}
        </div>
    </div>
    `

    
}


function amountMeatPP(duration, tipoMeat) {
    if(duration >= 6) {
        switch(tipoMeat) {
            case "Alcatra":
                return 650   
            break;
            default:
                return 0;
            break;
        }

    } else {
        switch(tipoMeat) {
            case "Alcatra":
                return 400   
            break;
            case "Pernil":
                return 500   
            break;
            default:
                return 0;
            break;
        }
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
