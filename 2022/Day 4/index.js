import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let count = 0;
    const data = process.env.DATA;
    const arrayOfData = data.split('\n');
    for(const range of arrayOfData) {
        const arrayOfRange = range.split(',');
        const firstRange = generateRangeString(arrayOfRange[0])
        const secondRange = generateRangeString(arrayOfRange[1])

        if(firstRange.includes(secondRange) || secondRange.includes(firstRange)) {
            count += 1
        }
    }
    console.log(count)
}

function generateRangeString(range) {
    const indexOfDash = range.indexOf('-');
    const startOfRange = Number(range.slice(0, indexOfDash));
    const endOfRange = Number(range.slice(indexOfDash + 1));
    let string = "";
    for(let i = startOfRange; i <= endOfRange; i++) {
        string += " " + i + ","
    }
    return string;
}
