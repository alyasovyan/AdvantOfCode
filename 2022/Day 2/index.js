'use strict';
import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

const data = process.env.DATA;
const arrayOfData = data.split('\n');
let sum = 0;

for(let i = 0; i < arrayOfData.length; i++) {
    const opponentsChoose = arrayOfData[i].slice(0, 1);
    const myChoose = arrayOfData[i].slice(2);

    const defaultRound =
        opponentsChoose === 'A' && myChoose === 'X' ||
        opponentsChoose === 'B' && myChoose === 'Y' ||
        opponentsChoose === 'C' && myChoose === 'Z';

    const winRound =
        opponentsChoose === 'A' && myChoose === 'Y' ||
        opponentsChoose === 'B' && myChoose === 'Z' ||
        opponentsChoose === 'C' && myChoose === 'X';


    if(myChoose === 'X') {
        sum += 1;
    } else if(myChoose === 'Y') {
        sum += 2;
    } else if(myChoose === 'Z') {
        sum += 3;
    }

    if(defaultRound) {
        sum += 3;
    } else if(winRound) {
        sum += 6;
    }
}

/** Part 2 */
let secondPartSum = 0;
for(let i = 0; i < arrayOfData.length; i++) {
    const opponentsChoose = arrayOfData[i].slice(0, 1);
    const roundResult = arrayOfData[i].slice(2);

    const lostRound = roundResult === 'X';
    const defaultRound = roundResult === 'Y';
    const winRound = roundResult === 'Z';

    if(lostRound) addSomePoints(opponentsChoose,3, 1, 2);
    if(defaultRound) addSomePoints(opponentsChoose,1, 2, 3, 3);
    if(winRound) addSomePoints(opponentsChoose, 2, 3, 1, 6);
}

function addSomePoints(opponentsChoose, n, m, k, l = 0) {
    const rockChoose = opponentsChoose === 'A';
    const paperChoose = opponentsChoose === 'B';
    const scissorsChoose = opponentsChoose === 'C';

    if(rockChoose) {
        secondPartSum += n;
    } else if(paperChoose) {
        secondPartSum += m;
    } else if(scissorsChoose) {
        secondPartSum += k;
    }
    secondPartSum += l;
}

console.log('>>secondPartSum', secondPartSum)
