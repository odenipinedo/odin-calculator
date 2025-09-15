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

    // Only add decimal if there isn't one already and display isn't at max length
    if (!displayValue.includes('.') && displayValue.length < 12) {
        displayValue += '.';
        updateDisplay();
        waitingForOperand = false;
    }
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

// Function to delete last digit (backspace)
function deleteLastDigit() {
    if (shouldResetDisplay) {
        return;
    }

    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

// Function to simulate button click with visual feedback
function simulateButtonClick(buttonElement) {
    if (buttonElement) {
        buttonElement.classList.add('active');
        setTimeout(() => {
            buttonElement.classList.remove('active');
        }, 150);
    }
}

// Unified function to handle calculator actions
function handleCalculatorAction(action, value = null) {
    switch(action) {
        case 'number':
            appendNumber(value);
            break;
        case 'operator':
            setOperator(value);
            break;
        case 'equals':
            calculate();
            break;
        case 'decimal':
            appendDecimal();
            break;
        case 'clear':
            clear();
            break;
        case 'delete':
            deleteLastDigit();
            break;
    }
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
            handleCalculatorAction('number', number);
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
            handleCalculatorAction('operator', op);
        });
    });

    // Add event listeners for other buttons
    document.getElementById('equals').addEventListener('click', () => handleCalculatorAction('equals'));
    document.getElementById('clear').addEventListener('click', () => handleCalculatorAction('clear'));
    document.getElementById('delete').addEventListener('click', () => handleCalculatorAction('delete'));
    document.getElementById('decimal').addEventListener('click', () => handleCalculatorAction('decimal'));

    // Add keyboard support with visual feedback
    document.addEventListener('keydown', function(event) {
        // Prevent default behavior for calculator keys
        if ('0123456789+-*/=.'.includes(event.key) || event.key === 'Enter' || event.key === 'Escape' || event.key === 'Backspace') {
            event.preventDefault();
        }

        let buttonToHighlight = null;

        // Handle number keys
        if (event.key >= '0' && event.key <= '9') {
            buttonToHighlight = document.querySelector(`[data-number="${event.key}"]`);
            handleCalculatorAction('number', event.key);
        }

        // Handle operator keys
        switch(event.key) {
            case '+':
                buttonToHighlight = document.getElementById('add');
                handleCalculatorAction('operator', '+');
                break;
            case '-':
                buttonToHighlight = document.getElementById('subtract');
                handleCalculatorAction('operator', '-');
                break;
            case '*':
                buttonToHighlight = document.getElementById('multiply');
                handleCalculatorAction('operator', '*');
                break;
            case '/':
                buttonToHighlight = document.getElementById('divide');
                handleCalculatorAction('operator', '/');
                break;
            case '=':
            case 'Enter':
                buttonToHighlight = document.getElementById('equals');
                handleCalculatorAction('equals');
                break;
            case '.':
                buttonToHighlight = document.getElementById('decimal');
                handleCalculatorAction('decimal');
                break;
            case 'Backspace':
                buttonToHighlight = document.getElementById('delete');
                handleCalculatorAction('delete');
                break;
            case 'Escape':
            case 'c':
            case 'C':
                buttonToHighlight = document.getElementById('clear');
                handleCalculatorAction('clear');
                break;
        }

        // Simulate button click visual feedback
        simulateButtonClick(buttonToHighlight);
    });

});