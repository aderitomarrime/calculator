//Declare variables
let auxiliarNumber;
let number1;
let number2;
let operatorToUse;
let left;
let result
let auxiliarWipe;
let floatingPoint1
let floatingPoint2
let auxiliarResult

//Declare variables and store the node references
let anyNumber = document.querySelectorAll('.number')
let anyOperator = document.querySelectorAll('.operator')
let display = document.querySelector('.display .result')
let equal = document.querySelector('.equal')
let clear = document.querySelector('.clear')
let floatingPoint = document.querySelector('.floating-point')
let backspace = document.querySelector('.backspace')

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
            if(number2 === 0) {
                result = 'Stop being selfish'
            } else {
                result = divide(number1,number2);
            }
        break;
        default:
            result ="Invalid operator";
    }

    // auxiliarNumberWipe = true
    if(typeof result === 'number') {
        return Math.round((result + Number.EPSILON) * 100) / 100
    } else {
        return result
    }
}

equal.addEventListener('click', () => {
    if(number1 != undefined && operatorToUse != undefined && number2 != undefined ) {
        let result = operate(number1, operatorToUse, number2)
        populateDisplay(`${result}`, 0)
        auxiliarNumber = undefined
        auxiliarResult = true
    } else{
        console.log('nothing')
    }
})

clear.addEventListener('click', () => {
    wipeExistingtData()
})

floatingPoint.addEventListener('click', getFloatingPoint)

backspace.addEventListener('click', removeLastDigit)

//Wipe all existing data
function wipeExistingtData() {
    auxiliarNumber = undefined
    number1 = undefined
    operatorToUse = undefined
    number2 = undefined
    display.textContent = '' 
    result = undefined
    auxiliarWipe = undefined
    floatingPoint1 = undefined
    floatingPoint2 = undefined
}

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
    number.addEventListener('click', () => {
        storeNumber(number.textContent)
    })
}

//Store the first number of the operation into a uxiliar variable and store the second number of the opertaion
function storeNumber(number) {
    if(result != undefined && number1 != undefined && operatorToUse != undefined && number2 != undefined && auxiliarResult != undefined) {
        wipeExistingtData()
        auxiliarNumber = number
        populateDisplay(`${auxiliarNumber} `,0)
        auxiliarResult = undefined;

    } else if((result != undefined && auxiliarWipe != undefined) || (typeof result === 'string')) {
        wipeExistingtData()
        auxiliarNumber = number
        populateDisplay(`${auxiliarNumber} `,0)

    } else if(number1 == undefined) {
        if(auxiliarNumber !== undefined) {
            auxiliarNumber = auxiliarNumber.toString() + number
        } else {
            auxiliarNumber = number
        }

        populateDisplay(` ${auxiliarNumber} `,0)
        auxiliarNumber = Number(auxiliarNumber)

    } else if(number1 != undefined) {
        if(auxiliarNumber == undefined) {
            auxiliarNumber = number
            left = display.textContent;
            populateDisplay(` ${auxiliarNumber}`,1)
            number2 = Number(auxiliarNumber)

        } else {
            auxiliarNumber = auxiliarNumber.toString() + number
            number2 = auxiliarNumber
            populateDisplay(`${left} ${auxiliarNumber}`,0)
            auxiliarNumber = Number(auxiliarNumber)
            number2 = Number(number2)
            
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
    if(typeof result === 'string') {
        wipeExistingtData()
    }
    else if(number1 != undefined && operatorToUse != undefined && number2 != undefined) {
        let result = operate(number1, operatorToUse, number2)
        operatorToUse = operator
        populateDisplay(`${result} ${operatorToUse}`, 0)
        number1 = result
        number2 = undefined
        auxiliarNumber = undefined

    } else if(operatorToUse != undefined && operatorToUse != operator) {
        let text = display.textContent
        text = text.split('')
        text.pop()
        text.push(operator)
        text = text.join('')
        operatorToUse = operator
        populateDisplay(text,0)

    } else if(auxiliarNumber !== undefined) {
       number1 = Number(auxiliarNumber);
       operatorToUse = operator;
       auxiliarNumber = undefined
       populateDisplay(` ${operatorToUse}`,1)

    } else if(number1 != undefined && operatorToUse == undefined) {
        operatorToUse = operator;
        populateDisplay(` ${operatorToUse} `,1)
    } else {
        console.log('nothing')
    }

    auxiliarResult = undefined

}


// A function enable floating point to numbers
function getFloatingPoint() {
    if(auxiliarNumber != undefined && operatorToUse == undefined && number2 == undefined && floatingPoint1 == undefined) {
        auxiliarNumber = auxiliarNumber + '.'
        populateDisplay(auxiliarNumber,0)
        floatingPoint1 = true

    }else if(auxiliarNumber != undefined && operatorToUse != undefined && floatingPoint2 == undefined) {
        auxiliarNumber = auxiliarNumber + '.'
        populateDisplay('.', 1)
        floatingPoint2 = true
    }
}

// A function to enable backspace
function removeLastDigit() {
    if(auxiliarNumber != undefined && operatorToUse == undefined && number2 == undefined) {
        auxiliarNumber = auxiliarNumber.toString()
        auxiliarNumber = auxiliarNumber.split('')
        auxiliarNumber.pop()

        if(auxiliarNumber.lenght <= 0) {
            auxiliarNumber = undefined
        }

        auxiliarNumber = auxiliarNumber.join('')

        populateDisplay(auxiliarNumber,0)

    } else if(number1 != undefined && operatorToUse == undefined && number2 == undefined) {
        number1 = number1.toString()
        console.log(number1)
        number1 = number1.split('')
        console.log(number1)
        number1.pop()
        console.log(number1)

        if(number1.length == 0) {
            number1 = undefined
        } else {
            number1 = number1.join('')
        }
        console.log(number1)
        populateDisplay(number1,0)

    }
     else if (number1 != undefined && operatorToUse != undefined && auxiliarNumber == undefined && number2 == undefined) {
        operatorToUse = undefined
        
        populateDisplay(number1,0)
    } else if (number1 != undefined && operatorToUse != undefined && auxiliarNumber != undefined && number2 == undefined) {
        operatorToUse = undefined
        
        populateDisplay(number1,0)
        auxiliarNumber = number1
        number1 = undefined
        
    } else if(number1 != undefined && operatorToUse != undefined && number2 != undefined){
        if (result === undefined) {
            console.log('oi1')
            number2 = number2.toString()
            number2 = number2.split('')
            number2.pop()

            if(number2.length == 0) {
                number2 = undefined
                auxiliarNumber = undefined
                populateDisplay(`${number1} ${operatorToUse}`,0)
            } else {
                number2 = number2.join('')
                auxiliarNumber = number2
                populateDisplay(`${number1} ${operatorToUse} ${number2}`,0)
            }

        }else if(auxiliarNumber !== undefined){

            number2 = number2.toString()
            number2 = number2.split('')
            number2.pop()
            console.log(number2.length)

            if(number2.length == 0) {
                number2 = undefined
                auxiliarNumber = undefined
                console.log('entrou')
                populateDisplay(`${result} ${operatorToUse}`,0)
            } else {
                number2 = number2.join('')
                populateDisplay(`${result} ${operatorToUse} ${number2}`,0)
            }
    
        }
    }
    else {
        console.log('nothing')
    }
}
