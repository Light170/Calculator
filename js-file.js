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
            handleEquals();
        } else if (value === "AC") {
            clearAll();  
        } else if (value === ".") {
            handleDecimal();
        } else if (value === "%") {
            handlePercentage();
        } else if (value === "←") {
            deleteLastDigit();
        } else if (value === "+/-") {
            toggleSign();
        }
    });
});

function handleNumber(value) {
    if (!operator) {
        if (currentResult) {
        currentResult = null;
        }
    }
    
    if (currentInput === "0") {
    currentInput = value;
    } else {
        currentInput += value;
    }

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

function clearAll() {
    currentInput = "";
    currentResult = null;
    operator = null;
    display.textContent = 0;
}

function handleDecimal() {
    if (currentInput === "") {
        if (currentResult && !operator) {
            currentResult = null;
        }
        currentInput = "0.";
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay(currentInput);
}

function handlePercentage() {
    if (currentInput === "") {
        if (currentResult) {
            if (!operator) {
                currentResult = currentResult / 100;
                updateDisplay(currentResult);
            } else {
                currentInput = currentResult * (currentResult / 100);
                updateDisplay(currentInput);
            }
        }
    } else { 
        if (!currentResult) {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else {
            currentInput = currentResult * (currentInput / 100);
        }
        updateDisplay(currentInput);
    } 
}

function deleteLastDigit() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    }
}

function toggleSign() {
    if (currentInput === "") {
        if (currentResult) {
            currentResult = -currentResult;
            updateDisplay(currentResult);
        }
    } else if (currentInput !== "0") {
        currentInput = -currentInput;
        updateDisplay(currentInput);
    }
}

function updateDisplay(value) {
    display.textContent = value;
}