import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    const data = process.env.DATA;
    const arrayOfData = data.split('\n').map(item => item.trim().split('').map(item => Number(item)));
    const countOfRows = arrayOfData.length;
    let scenicScore = 0;

    for (let x = 0; x < countOfRows; x++) {
        const row = arrayOfData[x];
        const countOfCols = row.length;
        if (x === 0 || x === countOfRows - 1) continue;

        for (let y = 0; y < countOfCols; y++) {
            if (y === 0 || y === countOfCols - 1) continue;

            let count = 1;
            const cell = arrayOfData[x][y];
            count *= lessX(cell, countOfRows, arrayOfData, x, y);
            count *= moreX(cell, countOfRows, arrayOfData, x, y);
            count *= lessY(cell, countOfCols, arrayOfData, x, y);
            count *= moreY(cell, countOfCols, arrayOfData, x, y);
            if(count > scenicScore) scenicScore = count;
        }
    }
    console.log('>>scenicScore', scenicScore)
}

function moreX(cell, countOfRows, arrayOfData, x, y) {
    let count = 1;

    for (let i = x + 1; i < countOfRows - 1; i++) {
        if (cell <= arrayOfData[i][y]) break;
        else count += 1;
    }

    return count
}

function lessY(cell, countOfCols, arrayOfData, x, y) {
    let count = 1;

    for (let i = y - 1; i > 0; i--) {
        if (cell <= arrayOfData[x][i]) break;
        else count += 1;
    }

    return count;
}

function lessX(cell, countOfRows, arrayOfData, x, y) {
    let count = 1;

    for (let i = x - 1; i > 0; i--) {
        if (cell <= arrayOfData[i][y]) break;
        else count += 1;
    }

    return count;
}

function moreY(cell, countOfCols, arrayOfData, x, y) {
    let count = 1;

    for (let i = y + 1; i < countOfCols - 1; i++) {
        if (cell <= arrayOfData[x][i]) break;
        else count += 1;
    }

    return count;
}
