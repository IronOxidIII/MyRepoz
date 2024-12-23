let fs = require('fs');
let arg = process.argv;

try {
    // Чтение текста из файла
    let inText = fs.readFileSync(arg[2], 'utf-8');
    let subString = arg[3]; // Подстрока передается как третий аргумент
    let m = subString.length;
    let n = inText.length;

    // Определяем алфавит подстроки
    let alph = {};
    for (let i = 0; i < m; i++) {
        alph[subString.charAt(i)] = 0;
    }

    // Таблица переходов
    let del = new Array(m + 1);
    for (let j = 0; j <= m; j++) {
        del[j] = {};
    }

    // Инициализация таблицы переходов
    for (let i in alph) {
        del[0][i] = 0;
    }

    // Формирование таблицы переходов
    for (let j = 0; j < m; j++) {
        let prev = del[j][subString.charAt(j)];
        del[j][subString.charAt(j)] = j + 1;
        for (let i in alph) {
            del[j + 1][i] = del[prev][i];
        }
    }

    // Вывод таблицы переходов
    console.log("Таблица переходов:");
    for (let j = 0; j <= m; j++) {
        let out = `Состояние ${j}: `;
        for (let i in alph) {
            out += `${i}: ${del[j][i] || 0} `;
        }
        console.log(out);
    }

    // Поиск подстроки в тексте
    let results = [];
    let state = 0;

    for (let i = 0; i < n; i++) {
        if (inText.charAt(i) in alph) {
            state = del[state][inText.charAt(i)];
        } else {
            state = 0;
        }
        if (state == m) {
            results.push(i - m + 1); // Сохраняем индекс начала вхождения
        }
    }

    console.log("Индексы вхождений подстроки:", results);
} catch (err) {
    console.error(err);
}
