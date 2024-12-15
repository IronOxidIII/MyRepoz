class Node {
    constructor(char, freq) {
        this.char = char; // Символ
        this.freq = freq; // Частота
        this.left = null; // Левый дочерний узел
        this.right = null; // Правый дочерний узел
    }
}

// Функция для создания дерева Хаффмана
function buildHuffmanTree(charFreq) {
    const nodes = [];

    // Создаем узлы для каждого символа и добавляем их в массив
    for (const [char, freq] of Object.entries(charFreq)) {
        nodes.push(new Node(char, freq));
    }

    // Построение дерева
    while (nodes.length > 1) {
        // Сортируем узлы по частоте
        nodes.sort((a, b) => a.freq - b.freq);

        // Берем два узла с наименьшей частотой
        const left = nodes.shift();
        const right = nodes.shift();

        // Создаем новый узел с суммой частот
        const merged = new Node(null, left.freq + right.freq);
        merged.left = left;
        merged.right = right;

        // Добавляем новый узел обратно в массив
        nodes.push(merged);
    }

    return nodes[0]; // Корень дерева
}

// Функция для генерации кодов Хаффмана
function generateHuffmanCodes(node, prefix = '', codes = {}) {
    if (node) {
        if (node.char !== null) {
            codes[node.char] = prefix; // Сохраняем код для символа
        }
        generateHuffmanCodes(node.left, prefix + '0', codes); // Левый дочерний узел
        generateHuffmanCodes(node.right, prefix + '1', codes); // Правый дочерний узел
    }
    return codes;
}

// Основная функция для кодирования строки
function huffmanEncode(input) {
    // Подсчитываем частоту символов
    const charFreq = {};
    for (const char of input) {
        charFreq[char] = (charFreq[char] || 0) + 1;
    }

    // Строим дерево Хаффмана
    const huffmanTree = buildHuffmanTree(charFreq);

    // Генерируем коды Хаффмана
    const huffmanCodes = generateHuffmanCodes(huffmanTree);

    // Кодируем строку
    let encodedString = '';
    for (const char of input) {
        encodedString += huffmanCodes[char];
    }

    return { encodedString, huffmanCodes };
}

// Пример использования
const inputString = "hello huffman";
const { encodedString, huffmanCodes } = huffmanEncode(inputString);

console.log("Encoded String:", encodedString);
console.log("Huffman Codes:", huffmanCodes);
