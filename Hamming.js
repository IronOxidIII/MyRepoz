// Функция для вычисления контрольных битов и кодирования данных
function calculateParityBits(data) {
    const m = data.length; // Количество бит данных
    let r = 0; // Инициализация количества контрольных битов

    // Вычисление количества контрольных битов
    while (Math.pow(2, r) < m + r + 1) {
        r++;
    }

    const totalBits = m + r; // Общее количество битов (данные + контрольные биты)
    const hammingCode = new Array(totalBits).fill(0); // Инициализация массива для кода Хэмминга

    // Заполнение массива данными
    let j = 0;
    for (let i = 0; i < totalBits; i++) {
        if (Math.pow(2, j) === i + 1) {
            j++; // Пропускаем позиции для контрольных битов
        } else {
            hammingCode[i] = data[j - 1]; // Заполняем данные
            j++;
        }
    }

    // Вычисление контрольных битов
    for (let i = 0; i < r; i++) {
        const parityPosition = Math.pow(2, i);
        let parityValue = 0;

        for (let j = parityPosition - 1; j < totalBits; j += parityPosition * 2) {
            for (let k = j; k < Math.min(j + parityPosition, totalBits); k++) {
                parityValue ^= hammingCode[k]; // Вычисление значения контрольного бита
            }
        }
        
        hammingCode[parityPosition - 1] = parityValue; // Установка контрольного бита в массив
    }

    return hammingCode.join(''); // Возвращаем код Хэмминга как строку
}

// Функция для декодирования и исправления ошибок
function decodeHammingCode(hammingCode) {
    const n = hammingCode.length; // Длина кода Хэмминга
    const r = Math.floor(Math.log2(n + 1)); // Количество контрольных битов

    let errorPosition = 0;

    // Проверка контрольных битов
    for (let i = 0; i < r; i++) {
        const parityPosition = Math.pow(2, i);
        let parityValue = 0;

        for (let j = parityPosition - 1; j < n; j += parityPosition * 2) {
            for (let k = j; k < Math.min(j + parityPosition, n); k++) {
                parityValue ^= Number(hammingCode[k]); // Вычисление значения контрольного бита
            }
        }

        if (parityValue !== 0) {
            errorPosition += parityPosition; // Суммируем позиции ошибок
        }
    }

    if (errorPosition > 0) {
        console.log(`Ошибка в позиции: ${errorPosition}`);
        hammingCode = hammingCode.split('');
        hammingCode[errorPosition - 1] ^= 1; // Исправляем ошибку
        hammingCode = hammingCode.join('');
    } else {
        console.log('Ошибок не найдено.');
    }

    // Извлечение оригинальных данных без контрольных битов
    const originalData = [];
    for (let i = 0, j = 0; i < n; i++) {
        if (Math.pow(2, j) === i + 1) {
            j++; // Пропускаем контрольные биты
        } else {
            originalData.push(hammingCode[i]);
        }
    }

    return originalData.join(''); // Возвращаем оригинальные данные как строку
}

// Пример использования:
const inputData = '1011'; // Данные для кодирования
const hammingCode = calculateParityBits(inputData);
console.log('Код Хэмминга:', hammingCode);

const decodedData = decodeHammingCode(hammingCode);
console.log('Декодированные данные:', decodedData);