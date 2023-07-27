// let input = document.getElementById('inputBox');
// let buttons= document.querySelectorAll("button");

// let string = "";
// let arr = Array.from(buttons);
// arr.forEach(button => {
//     button.addEventListener('click', (e) =>{
//         if(e.target.innerHTML == '='){
//             string = eval(string);
//             input.value = string;
//         }
//         else if (e.target.innerHTML == 'AC'){
//             string= "";
//             input.value= string;
//         }
//         else if (e.target.innerHTML == 'DEL'){
//             string = string.substring(0, string.length-1);
//             input.value= string;
//         }
//         else if (e.target.innerHTML == '÷'){
//             string += '÷';
//             expression += '/'; // Store the division operator for evaluation
//             input.value = string;
//         }

//         else{
//             string += e.target.innerHTML;
//             input.value = string;
//         }
//     })
// })
// function evaluateExpression(expression) {
//     // Replace ÷ with / before evaluating the expression
//     return eval(expression.replace(/÷/g, '/'));
// }

let input = document.getElementById('inputBox');
let output = document.getElementById('outputBox');
let buttons = document.querySelectorAll("button");

let string = "";
let expression = "";

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const key = e.target.innerHTML;
    if (key === 'DEL') {
      // For DEL button, delete the last character
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else if (key === 'AC') {
      // For AC button, clear the expression and result
      string = "";
      expression = "";
      input.value = string;
      output.value = '';
    } else {
      handleButtonPress(key);
    }
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key.match(/[0-9]|\.|[+\-*%]/)) {
    // For digits, decimal point, and operators (excluding /), call handleButtonPress with the key
    handleButtonPress(key);
  } else if (key === '/') {
    // For / key from the keyboard, display '÷' instead of '/', but internally treat it as '/'
    e.preventDefault();
    handleButtonPress('÷');
  } else if (key === 'Enter') {
    // For Enter key, evaluate the expression
    string = evaluateExpression(expression);
    input.value = expression + ' =';
    output.value = string;
  } else if (key === 'Backspace') {
    // For Backspace key, delete the last character
    string = string.substring(0, string.length - 1);
    expression = string;
    input.value = string;
  } else if (key === 'Delete') {
    // For Delete key, clear the expression and result (AC)
    string = "";
    expression = "";
    input.value = string;
    output.value = '';
  }
});

function handleButtonPress(key) {
  if (key === '=') {
    string = evaluateExpression(expression);
    input.value = expression + ' =';
    output.value = string;
  } else if (key === '÷') {
    // Display '÷' in the input box, but treat it as '/'
    string += '÷';
    expression += '/';
    input.value = string;
  } else if (key === '%') {
    expression = ((evaluateExpression(expression) / 100).toString()) ;
    input.value = expression;
    output.value = expression;
  } else {
    string += key;
    expression += key;
    input.value = string;
  }
}

function evaluateExpression(expression) {
  // Replace ÷ with / before evaluating the expression
  return eval(expression.replace(/÷/g, '/'));
}





