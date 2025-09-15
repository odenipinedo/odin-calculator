// Basic math operator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

// Variables for calculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;

// Operate function that calls the appropriate math function
function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
        case '�':
            return multiply(num1, num2);
        case '/':
        case '�':
            return divide(num1, num2);
        default:
            return null;
    }
}

// Test the functions in console
console.log("Testing calculator functions:");
console.log("add(5, 3) =", add(5, 3));
console.log("subtract(10, 4) =", subtract(10, 4));
console.log("multiply(6, 7) =", multiply(6, 7));
console.log("divide(15, 3) =", divide(15, 3));
console.log("divide(10, 0) =", divide(10, 0));
console.log("operate('+', 10, 5) =", operate('+', 10, 5));
console.log("operate('-', 20, 8) =", operate('-', 20, 8));
console.log("operate('*', 4, 9) =", operate('*', 4, 9));
console.log("operate('/', 100, 25) =", operate('/', 100, 25));