import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let taskIndex = 0;
    const data = process.env.DATA;
    /** @param(i)
     * first task param - i = 3
     * second task param - i = 14
     */
    for(let i = 14; i < data.length; i++) {
        const end = i;
        const start = i - 14;
        const result = check(data, start, end);
        if(result) {
            /** @param(end)
             * first task param - i + 1
             * second task param - end
             */
            taskIndex = i;
            break;
        }
    }

    console.log('>>taskIndex', taskIndex);
}

function check(data, start, end) {
    /** @param(end)
     * first task param - end + 1
     * second task param - end
     */
    const string = data.slice(start, end);
    const array = string.split("");

    const results = array.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});

    return Object.values(results).findIndex(item => item > 1) === -1;
}
