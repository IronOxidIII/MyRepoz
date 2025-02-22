Функция infixToRPN
Эта функция преобразует математическое выражение в инфиксной записи (обычное представление) в обратную польскую запись (ОПЗ).
function infixToRPN(expression) {
Объявляем функцию infixToRPN, которая принимает один аргумент expression — строку с математическим выражением.
    const output = [];
    const operators = [];
Создаем два массива: output для хранения итогового выражения в ОПЗ и operators для временного хранения операторов.
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };
Определяем объект precedence, который задает приоритет операторов. Чем выше число, тем выше приоритет.
    const tokens = expression.match(/(\d+|[+\-*/^()])/g);
Используем регулярное выражение для разбивки входной строки на токены (числа и операторы). Результат сохраняем в массив tokens.
Основной цикл
    for (const token of tokens) {
Начинаем цикл по каждому токену из массива tokens.
Обработка токенов
Числа:
     if (!isNaN(token)) {
         output.push(token);
     }
Если токен — число (проверяем с помощью isNaN), добавляем его в массив output.
Операторы:
     else if (token in precedence) {
         while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
             output.push(operators.pop());
         }
         operators.push(token);
     }
Если токен — оператор, проверяем его приоритет. Пока стек операторов не пуст и приоритет верхнего оператора в стеке выше или равен текущему, извлекаем верхний оператор из стека и добавляем его в output. Затем добавляем текущий оператор в стек.
Открывающая скобка:
     else if (token === '(') {
         operators.push(token);
     }
Если токен — открывающая скобка, просто добавляем ее в стек operators.
Закрывающая скобка:
     else if (token === ')') {
         while (operators.length && operators[operators.length - 1] !== '(') {
             output.push(operators.pop());
         }
         operators.pop(); // Удаляем '('
     }
Если токен — закрывающая скобка, извлекаем из стека все операторы до тех пор, пока не встретим открывающую скобку. После этого удаляем открывающую скобку из стека.
Завершение обработки
    while (operators.length) {
        output.push(operators.pop());
    }
После обработки всех токенов извлекаем оставшиеся операторы из стека и добавляем их в output.
    return output.join(' ');
}
Возвращаем итоговое выражение в ОПЗ, объединяя элементы массива output в строку через пробел.
Функция evaluateRPN
Эта функция вычисляет значение выражения, заданного в ОПЗ.
Код функции
function evaluateRPN(rpnExpression) {
Объявляем функцию evaluateRPN, которая принимает один аргумент rpnExpression — строку с выражением в ОПЗ.
    const stack = [];
    const tokens = rpnExpression.split(' ');
Создаем массив stack для хранения промежуточных значений и разбиваем входную строку на токены по пробелам.
Основной цикл
    for (const token of tokens) {
Начинаем цикл по каждому токену из массива tokens.
Обработка токенов
Числа:
     if (!isNaN(token)) {
         stack.push(Number(token));
     }
Если токен — число, преобразуем его в число и добавляем в стек.
Операторы:
     else {
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
Если токен — оператор, извлекаем два верхних значения из стека (b и a). Затем выполняем соответствующую операцию и помещаем результат обратно в стек.
Завершение вычисления
    return stack[0];
}
Возвращаем единственное значение из стека, которое является результатом вычисления выражения.
Пример использования
const expression = "3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3";
const rpn = infixToRPN(expression);
console.log("Обратная польская запись:", rpn);
const result = evaluateRPN(rpn);
console.log("Результат:", result);
Определяем строку с математическим выражением.
Преобразуем это выражение в ОПЗ с помощью функции infixToRPN.
Выводим результат преобразования.
Вычисляем значение полученного выражения в ОПЗ с помощью функции evaluateRPN.
Выводим результат вычисления.
Таким образом, код выполняет преобразование математического выражения из инфиксной записи в обратную польскую запись и затем вычисляет его значение.
