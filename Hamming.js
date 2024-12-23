// Функция для кодирования данных с использованием кода Хэмминга
function hammingCode(input) {
    // Проверка входных данных
    if (input.length !== 4 || !/^[01]+$/.test(input)) {
        throw new Error("Введите 4 бита (0 или 1).");
    }
    
    // Преобразуем строку в массив чисел
    let dataBits = input.split('').map(Number);
    
    // Добавляем контрольные биты
    const parityBits = [
        (dataBits[0] + dataBits[2] + dataBits[3]) % 2, // P1
        (dataBits[1] + dataBits[2] + dataBits[3]) % 2, // P2
        (dataBits[0] + dataBits[1] + dataBits[3]) % 2  // P4
    ];
    
    // Формируем закодированные данные: P1, P2, D1, P4, D2, D3
    return [
        parityBits[0], 
        parityBits[1], 
        dataBits[0], 
        parityBits[2], 
        dataBits[1], 
        dataBits[2], 
        dataBits[3]
    ];
}

// Функция для декодирования данных с использованием кода Хэмминга
function decodeHamming(encoded) {
    if (encoded.length !== 7 || !/^[01]+$/.test(encoded.join(''))) {
        throw new Error("Введите 7 бит в закодированных данных.");
    }
    
    // Проверяем контрольные биты
    const p1 = (encoded[0] + encoded[2] + encoded[5] + encoded[6]) % 2; // Проверка P1
    const p2 = (encoded[1] + encoded[2] + encoded[4] + encoded[6]) % 2; // Проверка P2
    const p4 = (encoded[0] + encoded[1] + encoded[4] + encoded[6]) % 2; // Проверка P4
    
    // Определяем позицию ошибки
    const errorPosition = p1 * 1 + p2 * 2 + p4 * 4;
    
    if (errorPosition > 0) {
        console.log(`Ошибка в позиции: ${errorPosition}`);
        encoded[errorPosition - 1] ^= 1; // Исправляем ошибку
    } else {
        console.log("Ошибок не найдено.");
    }
    
    // Извлекаем оригинальные данные (D1, D2, D3)
    return [encoded[2], encoded[4], encoded[5], encoded[6]];
}


// Пример использования
try {
    const inputData = '1011'; // Исходные данные для кодирования
    const codedData = hammingCode(inputData);
    console.log('Закодированные данные:', codedData.join(''));
    
    // Для тестирования декодирования можно внести ошибку в закодированные данные
    // codedData[0] ^= 1; // Внесите ошибку для проверки декодирования

    const decodedData = decodeHamming(codedData);
    console.log('Декодированные данные:', decodedData.join(''));
} catch (error) {
    console.error(error.message);
}
