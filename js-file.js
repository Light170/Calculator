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
        return "Error"; 
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null; 
    }
}

let currentResult = null;
let operator = null;
let currentInput = "";

const display = document.getElementById("display");

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            handleNumber(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === "=") {
            handleEquals(value);
        } else if (value === "AC") {
            
        }
    });
});

function handleNumber(value) {
    if (!operator) {
        if (currentResult) {
        currentResult = null;
        }
    }
    currentInput += value;
    updateDisplay(currentInput);
}

function handleOperator(op) {

    if (currentInput === "") {
        if (operator && currentResult) {
            return;
        } else if (!operator && !currentResult) {
            currentResult = 0;
        }  
    } else if (!currentResult) {
        currentResult = parseFloat(currentInput);
    } else {
        currentResult = operate(operator, currentResult, parseFloat(currentInput));
        updateDisplay(currentResult);
    } 
    
    operator = op; 
    currentInput = "";
}

function handleEquals() {

        if (currentInput === "") {
            return;
        } 
        
        if (currentResult) {
            currentResult = operate(operator, currentResult, parseFloat(currentInput));
            updateDisplay(currentResult); 
            operator = null;  
            currentInput = ""; 
        }
        
          
}

function updateDisplay(value) {
    display.textContent = value;
}