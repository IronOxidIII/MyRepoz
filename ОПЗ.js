function infixToRPN(expression) {
    const output = [];
    const operators = [];
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    const tokens = expression.match(/(\d+|[+\-*/^()])/g);

    for (const token of tokens) {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token in precedence) {
            while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // Удаляем '('
        }
    }

    while (operators.length) {
        output.push(operators.pop());
    }

    return output.join(' ');
}

function evaluateRPN(rpnExpression) {
    const stack = [];
    const tokens = rpnExpression.split(' ');

    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
                case '^':
                    stack.push(Math.pow(a, b));
                    break;
            }
        }
    }

    return stack[0];
}

const expression = "3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3";
const rpn = infixToRPN(expression);
console.log("Обратная польская запись:", rpn);

const result = evaluateRPN(rpn);
console.log("Результат:", result);
