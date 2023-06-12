import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    const data = process.env.DATA;
    const arrayOfData = data.split('\n').map(item => item.trim().split('').map(item => Number(item)));
    const countOfRows = arrayOfData.length;
    let countOfBorderCell = 0;

    for (let x = 0; x < countOfRows; x++) {
        const row = arrayOfData[x];
        const countOfCols = row.length;
        if (x === 0 || x === countOfRows - 1) {
            countOfBorderCell += countOfRows;
            continue;
        }

        for (let y = 0; y < countOfCols; y++) {
            if (y === 0 || y === countOfCols - 1) {
                countOfBorderCell += 1
                continue;
            }
            if (row[y] === 0) continue;

            const cell = arrayOfData[x][y];
            const needCheckNorth = cell > arrayOfData[x - 1][y] && cell > arrayOfData[0][y];
            if(needCheckNorth) {
                let isAvailable = true;
                for(let i = x - 1; i > 0; i--) {
                    if(cell <= arrayOfData[i][y]) {
                        isAvailable = false
                        break;
                    }
                }
                if(isAvailable) {
                    countOfBorderCell += 1;
                    continue;
                }
            }

            const needCheckSouth = cell > arrayOfData[x + 1][y] && cell > arrayOfData[countOfRows - 1][y];
            if(needCheckSouth) {
                let isAvailable = true;
                for(let i = x + 1; i < countOfRows - 1; i++) {
                    if(cell <= arrayOfData[i][y]) {
                        isAvailable = false
                    }
                }
                if(isAvailable) {
                    countOfBorderCell += 1;
                    continue;
                }
            }

            const needCheckEast = cell > arrayOfData[x][y - 1] && cell > arrayOfData[x][0];
            if(needCheckEast) {
                let isAvailable = true;
                for(let i = y - 1; i > 0; i--) {
                    if(cell <= arrayOfData[x][i]) {
                        isAvailable = false;
                        break;
                    }
                }
                if(isAvailable) {
                    countOfBorderCell += 1;
                    continue;
                }
            }

            const needCheckWest = cell > arrayOfData[x][y + 1] && cell > arrayOfData[x][countOfCols - 1];
            if(needCheckWest) {
                let isAvailable = true;
                for(let i = y + 1; i < countOfCols - 1; i++) {
                    if(cell <= arrayOfData[x][i]) {
                        isAvailable = false;
                        break;
                    }
                }
                if(isAvailable) {
                    countOfBorderCell += 1;
                    continue;
                }
            }
        }
    }
    console.log('>>countOfBorderCell', countOfBorderCell)
}

// 1715 - true?
