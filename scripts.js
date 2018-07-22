function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { 
    return b === 0 ? (errorEncountered = true, "Div by Zero ERROR") : a / b; 
}

function operate(a, op, b) {
    if (a !== 0 && !a) return b;
    switch(op) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return errorEncountered = true,"SYNTAX ERROR";
    }
}

let errorEncountered = false;
let equalsPressed = false;
let length = 0;
const MAX = 12;

const mainDisplay = document.querySelector(".current");
const currentAnswer = document.querySelector(".answer");

//logic for entering digits
function enterOperand(d) {
    if (!errorEncountered && length < MAX) {
        if (!equalsPressed) {
            if (d.id !== "decimal") {
                mainDisplay.textContent += d.id;
            } else {
                if (mainDisplay.textContent.search(/\./) === -1) {
                    mainDisplay.textContent += ".";
                }
            }
            length++;
        } else {
            mainDisplay.textContent = d.id === "decimal" ? "." : d.id;
            equalsPressed = false;
            length = 1;
        }
    }
}

const digits = document.querySelectorAll(".digit");
digits.forEach(d => {
    d.addEventListener("click", () => {
        enterOperand(d);
    });
});

//logic for functions
function clearAllFunc() {
    mainDisplay.textContent = "";
    currentAnswer.textContent = "";
    errorEncountered = false;
    length = 0;
}

function clearCurrentFunc() {
        mainDisplay.textContent = "";
        length = 0;
        errorEncountered = false;
}

function delFunc() {
    if (!errorEncountered && !equalsPressed) {
        mainDisplay.textContent 
        = mainDisplay.textContent.slice(0, mainDisplay.textContent.length - 1);
        length--;
    } else clearCurrentFunc();
}

 const clearAll = document.querySelector("#clearAll");
 clearAll.addEventListener("click", clearAllFunc);


 //logic for operations
 let prevOp;
 function enterOperation(o) {
    if (!errorEncountered) {
        length = 0;
        let left = currentAnswer.textContent.search(/\./) === -1 
        ? parseInt(currentAnswer.textContent) 
        : parseFloat(currentAnswer.textContent);

        let right = mainDisplay.textContent.search(/\./) === -1 
        ? parseInt(mainDisplay.textContent) 
        : parseFloat(mainDisplay.textContent);

        if (isNaN(left) && isNaN(right)) return;
        if (isNaN(right)) {
            if (o.id === "equals") return;
            prevOp = o.id;
            currentAnswer.textContent 
            = currentAnswer.textContent
                           .slice(0, currentAnswer.textContent.length - 1);
            currentAnswer.textContent += prevOp;
        } else if (o.id !== "equals") {
            if (!prevOp) prevOp = o.id;
            currentAnswer.textContent = operate(left,prevOp,right) + o.id;
            mainDisplay.textContent = "";
            prevOp = o.id;
        } else {
            if (mainDisplay.textContent === "") return;
            if (!prevOp) return;
            mainDisplay.textContent = operate(left,prevOp,right);
            currentAnswer.textContent = "";
            prevOp = "";
            equalsPressed = true;
        }
    } 
 }

 const operations = document.querySelectorAll(".operation");
 operations.forEach(o => {
    o.addEventListener("click", () => {
        enterOperation(o);
    });
 });


//keyboard support
window.addEventListener("keydown", (e) => {
    let element;
    element = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!element) return;
    switch (element.className) {
        case "digit": enterOperand(element); break;
        case "operation": enterOperation(element); break;
    }
});