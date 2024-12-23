function isMatch(S, T, start) {
    for (let j = 0; j < T.length; j++) {
        if (S[start + j] !== T[j]) {
            return false; // Если символы не совпадают, возвращаем false
        }
    }
    return true; // Если все символы совпадают, возвращаем true
}

// Brute Force
function findOccurrencesBruteForce(S, T) {
    const positions = []; // Массив для хранения позиций найденных вхождений
    const n = S.length; // Длина строки S
    const m = T.length; // Длина подстроки T

    for (let i = 0; i <= n - m; i++) { // Проходим по всем возможным позициям
        if (isMatch(S, T, i)) { // Проверяем совпадение подстроки
            positions.push(i + 1); // Добавляем позицию (индексация с 1)
        }
    }

    return positions; // Возвращаем массив позиций
}

// Хэш
function findOccurrencesWithHash(S, T) {
    const positions = []; // Массив для хранения позиций найденных вхождений
    const n = S.length; // Длина строки S
    const m = T.length; // Длина подстроки T

    // Вычисляем хеш для подстроки T
    let targetHash = Array.from(T).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    // Вычисляем хеш для первого окна длиной m в строке S
    let currentHash = Array.from(S.slice(0, m)).reduce((sum, char) => sum + char.charCodeAt(0), 0);

    for (let i = 0; i <= n - m; i++) { // Проходим по всем возможным позициям
        if (currentHash === targetHash && isMatch(S, T, i)) { // Сравниваем хеши и проверяем совпадение
            positions.push(i + 1); // Добавляем позицию (индексация с 1)
        }

        if (i < n - m) { // Обновляем хеш для следующего окна
            currentHash = currentHash - S.charCodeAt(i) + S.charCodeAt(i + m);
        }
    }

    return positions; // Возвращаем массив позиций
}

// Пример использования
const examples = [
    { S: "abcabdecab", T: "cab" },
    { S: "abababacaba", T: "aba" }
];

// Запускаем примеры и выводим результаты
examples.forEach(({ S, T }) => {
    console.log(`Brute Force: ${findOccurrencesBruteForce(S, T)}`);
    console.log(`Hashing: ${findOccurrencesWithHash(S, T)}`);
});
