function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            const base = char.toLowerCase() === char ? 97 : 65; // a=97, A=65
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char; // Не изменяем символы, не относящиеся к алфавиту
    }).join('');
}

function caesarDecryptWithBruteForce(ciphertext) {
    const possibleDecryptedTexts = [];
    
    for (let shift = 1; shift < 26; shift++) {
        const decryptedText = ciphertext.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt();
                const base = char.toLowerCase() === char ? 97 : 65; // a=97, A=65
                return String.fromCharCode(((code - base - shift + 26) % 26) + base);
            }
            return char; // Не изменяем символы, не относящиеся к алфавиту
        }).join('');
        
        possibleDecryptedTexts.push({ shift, decryptedText });
    }

    return possibleDecryptedTexts;
}

const originalText = "Hello, World!";
const shiftKey = 3;

// Шифруем текст
const encryptedText = caesarEncrypt(originalText, shiftKey);
console.log("Зашифрованный текст:", encryptedText);

// Дешифруем текст с подбором ключа
const decryptedOptions = caesarDecryptWithBruteForce(encryptedText);
decryptedOptions.forEach(option => {
    console.log(`Сдвиг ${option.shift}: ${option.decryptedText}`);
});
