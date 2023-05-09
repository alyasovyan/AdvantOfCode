import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let sum = 0;
    const data = process.env.DATA;
    const arrayOfData = data.split('\n')
    const object = {};
    const path = [];
    for(let i = 0; i < arrayOfData.length; i++) {
        const command = arrayOfData[i].split(" ");
        if(command[1] === "cd" && command[2] === "..") {
            path.pop();
            continue;
        }

        if(command[1] === "cd") path.push(command[2]);

        if(!object[path.join('')]) {
            object[path.join('')] = 0
        }
        object[path.join('')] += Number(command[0]) || 0;

        for(let i = 1; i < path.length; i++) {
            object[path.slice(0, i).join('')] += Number(command[0]) || 0;
        }
    }

    for(const key in object) {
        if(object[key] < 100000) sum += object[key]
    }
    console.log(sum)
}
