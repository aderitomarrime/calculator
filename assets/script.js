let number1;
let number2;
let operator;


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

function operate(number1, operator, number2) {
    console.log(operator)
    switch(operator) {
        case '+' :
            return add(number1,number2);
        break;
        case '-':
            return subtract(number1,number2);
        break;
        case '*':
            return multiply(number1,number2);
        break;
        case '/':
            return divide(number1,number2);
        break;
        default:
            return console.log("Invalid operator");
    }
}