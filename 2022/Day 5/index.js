import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function main() {
    let taskString = "";
    const schema = generateSchema(process.env.SCHEMA.split('\n').filter(item => item));
    const data = process.env.DATA
    const arrayOfData = data.split('\n');

    for(let i = 0; i < arrayOfData.length; i++) {
        const move = arrayOfData[i];
        const arrayOfMove = move.match(new RegExp(/\b([0-9]|[1-9][0-9])\b/gm));
        const count = arrayOfMove[0];
        const from = arrayOfMove[1];
        const to = arrayOfMove[2];

        const takenFrom = takeFrom(schema, count, from);
        pushTo(schema, to, takenFrom)
    }

    for(let i = 0; i < schema.length; i++) {
        const lastElement = schema[i].length - 1
        if(lastElement !== -1) {
            taskString += schema[i][lastElement][1]
        }
    }

    console.log('>>taskString ', taskString);
}

function takeFrom(schema, count, from) {
    const row = schema[from - 1];
    return row.splice(row.length - count)
}

function pushTo(schema, to, array) {
    /** @param(.concat(param))
     * first task param - array.reverse()
     * second task param - array
    */
    schema[to - 1] = schema[to - 1].concat(array);
}

function generateSchema(array) {
    const reverseArray = array.reverse();
    const schema = [];
    const regExp = new RegExp(/\[[A-Z]]|(\s{3})[\s+]/gm);

    for(let i = 0; i <= array.length; i++) {
        schema.push([]);
    }

    for(let i = 1; i < array.length; i++) {
        const row = reverseArray[i];
        const matchArrayRow = row.match(regExp);
        for(let j = 0; j < matchArrayRow.length; j++) {
            if(matchArrayRow[j].trim()){
                schema[j].push(matchArrayRow[j])
            }
        }
    }

    return schema;
}
