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



/* ===== Pré carregamento da tela ===== */
let carnes = ["Alcatra", "Picanha", "Pernil", "Picanha Suína", "Coxinha de Frango", "Asinha de Frango", "Linguiça p/ churrasco", "Linguiça Toscana"]

let drinks = ["Cerveja", "Refrigerante", "Suco", "Água", "Cachaça", "Vodka"]

const boxCarners  = document.querySelector(".option.meat .inputField")
const boxDrinks = document.querySelector(".option.drink .inputField")

window.onload = ()=> {
    let idDrink = 0;

    carnes.forEach((elem, index)=> {
        boxCarners.innerHTML += `
        <div class="contentBox">
            <input type="checkbox" id="meat${index}" name="meat${index}" value="${elem}">
            <label for="meat${index}">${elem}</label>
        </div>
        `
    });

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

/* ===== Calculo das porções ===== */
const amountAdults = document.querySelector("#adults")
const amountChildren = document.querySelector("#children")
const inputDuration = document.querySelector("#duration")
const boxResult = document.querySelector(".result")



function calculateAmounts() {
    
    let adults = amountAdults.value;
    let children = amountChildren.value;
    let duration = inputDuration.value;
    let inputsCarne = document.querySelectorAll(".option.meat .inputField .contentBox input");
    let inputsDrink = document.querySelectorAll(".option.drink .inputField .contentBox input");
    
    
    // Calculando qtn de carne
    let lineQtnMeat = ""
    let totalMeat = 0;
    inputsCarne.forEach((elem)=> {
        if(elem.checked) {
            let qtn = amountMeatPP(duration, elem.value) * adults + (amountMeatPP(duration, elem.value) / 2 * children)
            totalMeat += Math.ceil(qtn/1000)

            lineQtnMeat += `
                <p>${elem.value} <span class="qtn">${Math.ceil(qtn/1000)}kg</span></p>
            `    
        }
    })
    lineQtnMeat += `<p class="total">TOTAL <span class="qtnTotal">${totalMeat}kg</span></p>`

    // Calculando qtn de drinks
    let lineQtnDrink = ""
    inputsDrink.forEach((elem)=> {
        if(elem.checked) {
            let qtn = 0;
            if(elem.value != "Cerveja" && elem.value != "Cachaça" && elem.value != "Vodka") {
                qtn = amountDrinkPP(duration, elem.value) * adults + (amountDrinkPP(duration, elem.value) / 2 * children)
            } else {
                qtn = amountDrinkPP(duration, elem.value) * adults
            }
            lineQtnDrink += `
                <p>${elem.value}<span class="qtn">${convertAmountDrink(qtn, elem.value)}</span></p>
            `

        }
    });
 

    //Inserindo Result na boxResult
    boxResult.innerHTML = `
    <div class="boxMeats">
        <h2>Carnes</h2>
        <div class="resultLines">
            ${lineQtnMeat}
        </div>
    </div>

    <div class="boxDrinks">
        <h2>Bebidas</h2>
        <div class="resultLines">
            ${lineQtnDrink}
        </div>
    </div>
    `

    
}


//retorna qtn em gramas
function amountMeatPP(duration, tipoMeat) {
    switch(tipoMeat) {
        case "Alcatra":
            return (duration >= 6) ? 650 : 400
        break;
        case "Picanha":
            return (duration >= 6) ? 700 : 450
        break;
        case "Pernil":
            return (duration >= 6) ? 550 : 300
        break;
        case "Picanha Suína":
            return (duration >= 6) ? 600 : 350
        break;
        case "Coxinha de Frango":
            return (duration >= 6) ? 650 : 400
        break;
        case "Asinha de Frango":
            return (duration >= 6) ? 700 : 450
        break;
        case "Linguiça p/ churrasco":
            return (duration >= 6) ? 700 : 450
        break;
        case "Linguiça Toscana":
            return (duration >= 6) ? 650 : 400
        break;
        default:
            return 0;
        break;
    }
}

"Cerveja", "Refrigerante", "Suco", "Água", "Cachaça", "Vodka"
//retorna qtn em ml
function amountDrinkPP(duration, tipoDrink) {
    
    switch(tipoDrink) {
        case "Água":
            return (duration >= 6) ? 1000 : 500
        break;
        case "Cerveja":
            return (duration >= 6) ? 2000 : 1200
        break;
        case "Refrigerante":
            return (duration >= 6) ? 1500 : 1000
        break;
        case "Suco":
            return (duration >= 6) ? 1000 : 600
        break;
        case "Cachaça":
            return (duration >= 6) ? 200 : 100
        break;
        case "Vodka":
            return (duration >= 6) ? 200 : 100
        break;
        default:
            return 0;
        break;
    }
}

function convertAmountDrink(amount, typeDrink) {
    switch(typeDrink) {
        case "Cerveja":
            return  `${Math.ceil(amount/350)} latas(350ml)`  
        break;
        case "Refrigerante":
            return  `${Math.ceil(amount/2000)} garrafas(2L)`  
        break;
        case "Água":
            return  `${Math.ceil(amount/500)} garrafinhas(500ml)`  
        break;
        case "Suco":
            return  `${Math.ceil(amount/200)} caixinhas(200ml)`  
        break;
        case "Cachaça":
            return  `${Math.ceil(amount/670)} garrafas(670ml)`  
        break;
        case "Vodka":
            return  `${Math.ceil(amount/600)} garrafas(600ml)`  
        break;
        default:
            return 0;
        break; 
    }
}