function searchUsingBoyerMoore(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;

    // Создание таблицы для плохих символов
    const createBadCharTable = (pattern) => {
        const badCharTable = {};
        for (let index = 0; index < pattern.length; index++) {
            badCharTable[pattern[index]] = index;
        }
        return badCharTable;
    };

    // Функция для вычисления сдвига по хорошему суффиксу
    const calculateGoodSuffixShift = (pattern, l) => {
        const m = pattern.length;
        const extendedPattern = '*'.repeat(m) + pattern;

        const findRpr = (l, pattern) => {
            for (let k = m - l; k >= -m + 1; k--) {
                const segment = extendedPattern.slice(k + m, k + m + l);
                const suffix = pattern.slice(m - l);

                if (
                    segment === suffix &&
                    (k <= 0 || pattern[k - 1] !== pattern[m - l - 1])
                ) {
                    return k;
                }
            }
            return -m + 1;
        };

        const k = findRpr(l, pattern);
        return m - k - l + 1;
    };

    const badCharTable = createBadCharTable(pattern);
    const matches = [];

    let shift = 0; // Текущее смещение шаблона
    while (shift <= textLength - patternLength) {
        let j = patternLength - 1;

        // Сравнение символов с конца
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        if (j < 0) { // Если совпадение найдено
            matches.push(shift);
            shift += patternLength; // Переход к следующему возможному совпадению
        } else {
            // Определяем длину совпадающего суффикса
            let l = 0;
            while (l < patternLength && text[shift + patternLength - 1 - l] === pattern[patternLength - 1 - l]) {
                l++;
            }

            // Вычисляем сдвиги по плохому символу и хорошему суффиксу
            const badCharShift = j - (badCharTable[text[shift + j]] || -1);
            const goodSuffixShift = l > 0 ? calculateGoodSuffixShift(pattern, l) : 1;

            // Обновляем смещение
            shift += Math.max(goodSuffixShift, badCharShift);
        }
    }

    return matches;
}

// Пример использования функции
const sampleText = "abccabcbbccabcdabcdabc";
const samplePattern = "abc";
const foundPositions = searchUsingBoyerMoore(sampleText, samplePattern);
console.log("Найденные позиции:", foundPositions);
