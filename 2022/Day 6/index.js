import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let firstTaskIndex = 0;
    const data = process.env.DATA
    for(let i = 3; i < data.length; i++) {
        const result = check(data, i)
        if(result) {
            firstTaskIndex = i + 1;
            break
        }
    }

    console.log('>>firstTaskIndex', firstTaskIndex)
}

function check(data, i) {
    const array = []
    array.push(data[i - 3]);
    array.push(data[i - 2]);
    array.push(data[i - 1]);
    array.push(data[i]);

    const results = array.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {})

    return Object.values(results).findIndex(item => item > 1) === -1;
}
