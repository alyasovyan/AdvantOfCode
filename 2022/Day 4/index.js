import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let firstTaskCount = 0;
    let secondTaskCount = 0;
    const data = process.env.DATA;
    const arrayOfData = data.split('\n');

    for(const range of arrayOfData) {
        const arrayOfRange = range.split(',');
        const firstRange = generateRangeString(arrayOfRange[0]);
        const secondRange = generateRangeString(arrayOfRange[1]);

        // part 1
        if(firstRange.includes(secondRange) || secondRange.includes(firstRange)) {
            firstTaskCount += 1
        }

        // part 2
        const firstRangeArray = generateRangeArray(arrayOfRange[0]);
        const secondRangeArray = generateRangeArray(arrayOfRange[1]);
        for(const index in firstRangeArray) {
            if(secondRangeArray.includes(firstRangeArray[index])) {
                secondTaskCount += 1;
                break;
            }
        }
    }
    console.log(firstTaskCount, secondTaskCount)
}

function generateRangeArray(range) {
    const { startOfRange, endOfRange } = generateIndexes(range);
    const array = [];
    for(let i = startOfRange; i <= endOfRange; i++) {
        array.push(i);
    }
    return array;
}

function generateIndexes(range) {
    const indexOfDash = range.indexOf('-');
    const startOfRange = Number(range.slice(0, indexOfDash));
    const endOfRange = Number(range.slice(indexOfDash + 1));
    return { startOfRange, endOfRange }
}

function generateRangeString(range) {
    const { startOfRange, endOfRange } = generateIndexes(range);
    let string = "";
    for(let i = startOfRange; i <= endOfRange; i++) {
        string += " " + i + ","
    }
    return string;
}
