class Node {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(freqMap) {
    const nodes = Object.entries(freqMap).map(([char, freq]) => new Node(char, freq));
    
    nodes.sort((a, b) => a.freq - b.freq);

    while (nodes.length > 1) {
        const left = nodes.shift();
        const right = nodes.shift();
        const newNode = new Node(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        nodes.push(newNode);
        nodes.sort((a, b) => a.freq - b.freq);
    }

    return nodes[0];
}

function generateCodes(node, prefix = '', codeMap = {}) {
    if (node === null) return;

    if (node.char !== null) {
        codeMap[node.char] = prefix;
    }

    generateCodes(node.left, prefix + '0', codeMap);
    generateCodes(node.right, prefix + '1', codeMap);

    return codeMap;
}

function huffmanEncode(input) {
    const freqMap = {};

    for (const char of input) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const root = buildHuffmanTree(freqMap);
    const codes = generateCodes(root);

    let encodedString = '';
    for (const char of input) {
        encodedString += codes[char];
    }

    return { codes, encodedString };
}

const inputString = "abrakadabra";
const { codes, encodedString } = huffmanEncode(inputString);

console.log("Коды символов:", codes);
console.log("Закодированная строка:", encodedString);
