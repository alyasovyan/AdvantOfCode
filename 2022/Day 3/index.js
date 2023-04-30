"use strict"
import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    const indexObject = generateIndexObject();
    const data = process.env.DATA;
    const arrayOfData = data.split('\n');
    let sum = 0;

    for(const rucksacks of arrayOfData) {
        const { firstPart, secondPart } = sliceArray(rucksacks);
        for(const letter of firstPart) {
            if(secondPart.includes(letter)) {
                sum += indexObject[letter];
                break;
            }
        }
    }

    console.log('>>sum,', sum);

}

function sliceArray(string) {
    const firstPart = string.slice(0, string.length / 2);
    const secondPart = string.slice(string.length / 2);
    return { firstPart, secondPart };
}

function generateIndexObject() {
    const indexObject = {};
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    for(let i = 0; i < alphabet.length; i++) {
        const key = alphabet[i];
        indexObject[key] = i + 1;
    }

    return indexObject
}
