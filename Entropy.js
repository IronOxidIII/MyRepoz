let ArgumentyKonsoli = process.argv;
let inputFile = ArgumentyKonsoli[2];
let Vvod = inputFile;

if (Vvod){
    let testNaTxt = (inputFile.slice(-4) == '.txt');
    if (testNaTxt){
        const fileSystem = require('fs');
        let input = fileSystem.readFileSync(inputFile, 'utf8');
        let entropy = 0;
		let alph = new Object(); 
        let alphPower = 0;
        let inputLength = input.length;
        for (let i = 0; i < inputLength; i++){
            if (alph[input.charAt(i)])
                alph[input.charAt(i)]+=1;
            else
                alph[input.charAt(i)] = 1;
        }
        for (let i in alph){
            alphPower++;
            alph[i] /= inputLength;  
        }
        if (alphPower>1){
            for (let i in alph)
                entropy -= alph[i] * Math.log(alph[i]);
            entropy /= Math.log(alphPower);
        }
        console.log("Энтропия =", entropy);
        console.log("\nЧастотный алфавит");
        console.log(alph);
    }
    else{
        console.log("Ошибка: это не txt!");
    }
}
else{
    console.log("Ошибка: Ввод не отределён!");
}
