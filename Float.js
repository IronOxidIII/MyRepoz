// Преобразование из IEEE 754 в десятичное число
function ieee754ToDecimal(binary) {
    const sign = binary.charAt(0) === '1' ? -1 : 1;
    const exponent = parseInt(binary.slice(1, 9), 2) - 127;  // смещение на 127
    let mantissa = 1;  // Ведущая единица

    // Извлечение мантиссы
    for (let i = 0; i < 23; i++) {
        if (binary.charAt(9 + i) === '1') {
            mantissa += Math.pow(2, -(i + 1));
        }
    }

    // Возвращаем значение
    return sign * mantissa * Math.pow(2, exponent);
}

// Преобразование из десятичного числа в IEEE 754
function decimalToIEEE754(num) {
    const isNegative = num < 0;
    num = Math.abs(num);

    let exponent = 0;
    let mantissa = num;

    // Нормализация числа
    while (mantissa >= 2) {
        mantissa /= 2;
        exponent++;
    }
    while (mantissa < 1 && mantissa > 0) {
        mantissa *= 2;
        exponent--;
    }

    // Смещение экспоненты
    const exponentWithBias = exponent + 127;

    // Извлекаем мантиссу (первые 23 бита)
    let mantissaBinary = mantissa - 1;
    let mantissaBits = '';
    for (let i = 0; i < 23; i++) {
        mantissaBinary *= 2;
        const bit = Math.floor(mantissaBinary);
        mantissaBits += bit.toString();
        mantissaBinary -= bit;
        if (mantissaBinary === 0) break;
    }

    // Оставляем первые 23 бита мантиссы
    mantissaBits = mantissaBits.slice(0, 23);

    // Собираем итоговое представление
    const signBit = isNegative ? '1' : '0';
    const exponentBits = exponentWithBias.toString(2).padStart(8, '0');
    const mantissaPadded = mantissaBits.padEnd(23, '0');

    return signBit + exponentBits + mantissaPadded;
}

// Сложение чисел в формате IEEE 754
function addIEEE754(num1, num2) {
    // Преобразуем числа из IEEE 754 в десятичное
    const decimal1 = ieee754ToDecimal(num1);
    const decimal2 = ieee754ToDecimal(num2);

    // Преобразуем их в нормализованные види 1.xxx * 2^n
    let [mantissa1, exp1] = normalizeNumber(decimal1);
    let [mantissa2, exp2] = normalizeNumber(decimal2);

    // Выравниваем мантиссы по экспонентам
    if (exp1 > exp2) {
        mantissa2 /= Math.pow(2, exp1 - exp2);
        exp2 = exp1;
    } else if (exp2 > exp1) {
        mantissa1 /= Math.pow(2, exp2 - exp1);
        exp1 = exp2;
    }

    // Сложим мантиссы
    let sumMantissa = mantissa1 + mantissa2;

    // Если мантисса больше или равна 2, сдвигаем её влево и увеличиваем порядок
    let sumExp = exp1;
    if (sumMantissa >= 2) {
        sumMantissa /= 2;
        sumExp += 1;
    }

    // Преобразуем сумму в IEEE 754
    const ieee754Result = decimalToIEEE754(sumMantissa * Math.pow(2, sumExp));

    // Выводим результат в десятичном и IEEE 754 формате
    const decimalResult = sumMantissa * Math.pow(2, sumExp);
    console.log("Сумма в десятичном виде: " + decimalResult);
    console.log("Сумма в формате IEEE 754: " + ieee754Result);

    return ieee754Result;
}

// Нормализация числа в вид 1.xxx * 2^n
function normalizeNumber(num) {
    let exponent = 0;
    let mantissa = num;

    // Нормализация числа
    while (mantissa >= 2) {
        mantissa /= 2;
        exponent++;
    }
    while (mantissa < 1 && mantissa > 0) {
        mantissa *= 2;
        exponent--;
    }

    return [mantissa, exponent];
}

// Пример использования:
console.log(decimalToIEEE754(13));      // Пример вывода для проверки
console.log(decimalToIEEE754(-6.75));
console.log(decimalToIEEE754(0.15625));
console.log(decimalToIEEE754(1));
console.log(decimalToIEEE754(0.2));

const num1 = '01000001100010000000000000000000';  // 17 в IEEE 754
const num2 = '01000001101100000000000000000000';  // 22 в IEEE 754

const result = addIEEE754(num1, num2);

// Ожидаемый результат: сумма чисел 17 и 22 в десятичном виде и в IEEE 754