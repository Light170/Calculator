const MAX_DIGITS = 9;

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
        case "x":
            return multiply(a, b);
        case "/":
        case "÷":
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

        switch (true) {
            case !isNaN(value):
                handleNumber(value);
                break;
            case ["+", "-", "x", "÷"].includes(value):
                handleOperator(value);
                break;
            case value === "=":
                handleEquals();
                break;
            case value === "AC":
                clearAll();
                break;
            case value === ".":
                handleDecimal();
                break;
            case value === "%":
                handlePercentage();
                break;
            case value === "←":
                deleteLastDigit();
                break;
            case value === "+/-":
                toggleSign();
                break;
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
    } else if (currentInput.includes(".")) {
        if (currentInput.length < MAX_DIGITS + 1) {
        currentInput += value;
        }
    } else if (currentInput.length < MAX_DIGITS) {
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

        if (currentResult.toString().length > MAX_DIGITS) {
            currentResult = roundResult(currentResult);
        }
    } 
    
    updateDisplay(currentResult);
    operator = op; 
    currentInput = "";
}

function handleEquals() {
        if (currentInput === "") {
            return;
        } 
        
        if (currentResult) {
            currentResult = operate(operator, currentResult, parseFloat(currentInput));
            
            if (currentResult.toString().length > MAX_DIGITS) {
                currentResult = roundResult(currentResult); 
            }
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
    } else if (!currentInput.includes(".") && currentInput.length <= MAX_DIGITS - 1) {
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

function roundResult(num) {
    numStr = num.toString();
    let integerPart = numStr.split('.')[0]; 
    let decimalPart = numStr.split('.')[1] || ''; 

    if (integerPart.length >= MAX_DIGITS) {
        numStr = integerPart.slice(0, MAX_DIGITS); 
    } else {
        let maxDecimalLength = MAX_DIGITS - integerPart.length - 1;
        decimalPart = decimalPart.slice(0, maxDecimalLength); 
        numStr = `${integerPart}.${decimalPart}`;
    }
    return parseFloat(numStr);
}

function updateDisplay(value) {
    display.textContent = value;
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        handleNumber(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    } else {
        switch (key) {
            case "Enter":
                event.preventDefault();
                handleEquals();
                break;
            case "Escape":
                clearAll();
                break;
            case ".":
                handleDecimal();
                break;
            case "%":
                handlePercentage();
                break;
            case "Backspace":
                deleteLastDigit();
                break;
            case "_": 
            case "±": 
                toggleSign();
                break;
        }
    }
});
