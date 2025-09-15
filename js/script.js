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
let displayValue = '0';
let waitingForOperand = false;
let shouldResetDisplay = false;

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

// Function to update the display
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;

    // Limit display length to prevent overflow
    if (displayValue.length > 12) {
        display.textContent = displayValue.substring(0, 12);
    }
}

// Function to handle digit button clicks
function appendNumber(number) {
    if (shouldResetDisplay || displayValue === '0') {
        displayValue = '';
        shouldResetDisplay = false;
    }

    // Limit input length
    if (displayValue.length < 12) {
        displayValue += number;
        updateDisplay();
    }

    waitingForOperand = false;
}

// Function to handle decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        displayValue = '0';
        shouldResetDisplay = false;
    }

    // Only add decimal if there isn't one already
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }

    waitingForOperand = false;
}

// Function to handle operator clicks
function setOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } else if (operator && !waitingForOperand) {
        const result = operate(operator, firstNumber, inputValue);

        // Handle division by zero
        if (result === "Error: Division by zero") {
            displayValue = "Don't divide by 0!";
            updateDisplay();
            firstNumber = null;
            operator = null;
            waitingForOperand = false;
            shouldResetDisplay = true;
            return;
        }

        // Round to avoid display overflow
        displayValue = String(Math.round(result * 100000000) / 100000000);
        updateDisplay();
        firstNumber = result;
    }

    waitingForOperand = true;
    shouldResetDisplay = true;
    operator = nextOperator;
}

// Function to calculate result
function calculate() {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null || operator === null) {
        return;
    }

    if (waitingForOperand) {
        return;
    }

    const result = operate(operator, firstNumber, inputValue);

    // Handle division by zero
    if (result === "Error: Division by zero") {
        displayValue = "Don't divide by 0!";
        updateDisplay();
        firstNumber = null;
        operator = null;
        waitingForOperand = false;
        shouldResetDisplay = true;
        return;
    }

    // Round to avoid display overflow
    displayValue = String(Math.round(result * 100000000) / 100000000);
    updateDisplay();

    firstNumber = null;
    operator = null;
    waitingForOperand = false;
    shouldResetDisplay = true;
}

// Function to clear calculator
function clear() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForOperand = false;
    shouldResetDisplay = false;
    updateDisplay();
}

// Function to delete last digit
function deleteLastDigit() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize display
    updateDisplay();

    // Add event listeners to all digit buttons
    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            appendNumber(number);
        });
    });

    // Add event listeners to operator buttons
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            let op;
            switch(button.id) {
                case 'add':
                    op = '+';
                    break;
                case 'subtract':
                    op = '-';
                    break;
                case 'multiply':
                    op = '*';
                    break;
                case 'divide':
                    op = '/';
                    break;
            }
            setOperator(op);
        });
    });

    // Add event listener for equals button
    document.getElementById('equals').addEventListener('click', calculate);

    // Add event listener for clear button
    document.getElementById('clear').addEventListener('click', clear);

    // Add event listener for delete button
    document.getElementById('delete').addEventListener('click', deleteLastDigit);

    // Add event listener for decimal button
    document.getElementById('decimal').addEventListener('click', appendDecimal);

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
});