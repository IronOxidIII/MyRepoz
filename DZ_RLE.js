function rleEncode(input) {
    let encoded = '';
    let count = 1;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++;
        } else {
            encoded += input[i];
            if (count > 1) {
                encoded += count;
            }
            count = 1;
        }
    }
    return encoded;
}

function rleDecode(encoded) {
    let decoded = '';
    let i = 0;
    while (i < encoded.length) {
        const char = encoded[i];
        i++;
        let count = '';
        while (i < encoded.length && !isNaN(encoded[i])) {
            count += encoded[i];
            i++;
        }
        decoded += char.repeat(count ? parseInt(count) : 1);
    }

    return decoded;
}

const inputString = "aaaabbcccdee";
const encodedString = rleEncode(inputString);
console.log(encodedString);
const encodedString1 = "a5gr2";
const decodedString = rleDecode(encodedString1);
console.log(decodedString);
