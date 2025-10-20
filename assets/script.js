//Declare variables
let auxiliarNumber;
let number1;
let number2;
let operatorToUse;
let left;

//Declare variables and store the node references
let anyNumber = document.querySelectorAll('.number')
let anyOperator = document.querySelectorAll('.operator')
let display = document.querySelector('.display .result')
let equal = document.querySelector('.equal')

//Convert nodeList to Array
anyNumber = Array.from(anyNumber)
anyOperator = Array.from(anyOperator)

//Do the callback funtion for each element of the array
anyNumber.forEach(getNumber)
anyOperator.forEach(getOperator)


//Functions to do basic mathematic operations
function add(number1, number2) {
    return number1 + number2
}

function subtract(number1, number2) {
    return number1 - number2
}

function multiply(number1, number2) {
    return number1 * number2
}

function divide(number1, number2) {
    return number1 / number2
}

// function to call one of the basic mathematical operations
function operate(number1, operator, number2) {
    console.log(number1)
    console.log(operator)
    console.log(number2)
    let result;

    switch(operator) {
        case '+' :
            result = add(number1,number2);
        break;
        case '−':
            result = subtract(number1,number2);
        break;
        case '×':
            result = multiply(number1,number2);
        break;
        case '÷':
            result = divide(number1,number2);
        break;
        default:
            console.log("Invalid operator");
    }

    display.textContent += ` = ${result}`
}

equal.addEventListener('click', () => {
    if(number1 != undefined && operatorToUse != undefined && number2 != undefined ) {
        operate(number1, operatorToUse, number2)
    }
})

// Function to populate the calculator's display
function populateDisplay (content, withPrevious) {
    if(withPrevious) {
        display.textContent += content
    } else {
        display.textContent = content
    }

}



// Callback funtion to get the number clicked and call the function storeNumber
function getNumber(number) {
    return number.addEventListener('click', () => {
        storeNumber(number.textContent)
    })
}

//Store the first number of the operation into a uxiliar variable and store the second number of the opertaion
function storeNumber(number) {

    if(number1 == undefined) {
        if(auxiliarNumber !== undefined) {
            auxiliarNumber = auxiliarNumber.toString() + number
        } else {
            auxiliarNumber = number
        }

        auxiliarNumber = Number(auxiliarNumber)
        populateDisplay(` ${auxiliarNumber} `,0)

    } else if(number1 != undefined) {
        if(auxiliarNumber == undefined) {
            auxiliarNumber = number
            left = display.textContent;
            populateDisplay(` ${auxiliarNumber}`,1)
            number2 = auxiliarNumber

        } else {
            auxiliarNumber = auxiliarNumber.toString() + number
            auxiliarNumber = Number(auxiliarNumber)
            number2 = auxiliarNumber
            populateDisplay(`${left} ${auxiliarNumber}`,0)
            number2 = auxiliarNumber
            
        }
        
    }
}

//Callback funtion to get the operator clicked and call the function storeOperator
function getOperator(operator) {
    operator.addEventListener('click', ()=> {
        storeOperator(operator.textContent)
    })
}

//Store the operator to make the operation and  store the first number to make the operation
function storeOperator (operator) {
    if(operatorToUse != undefined && operatorToUse !=operator) {
        let text = display.textContent
        text = text.split('')
        text.pop()
        text.push(operator)
        text = text.join('')
        operatorToUse = operator
        populateDisplay(text,0)

    } else if(auxiliarNumber !== undefined) {
       number1 = auxiliarNumber;
       operatorToUse = operator;
       auxiliarNumber = undefined
       populateDisplay(`${operatorToUse}`,1)

    } else {
        console.log('nothing')
    }

}
