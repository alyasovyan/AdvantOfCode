import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

main();

function init() {
    const bridge = (() => {
        const X = 1000;
        const Y = 1000;
        const bridge = [];

        for (let i = 0; i <= Y; i++) {
            const row = [];
            const DOT = '.'
            for (let k = 0; k <= X; k++) {
                row.push(DOT);
            }
            bridge.push(row);
        }

        return bridge;
    })();

    const state = ((bridge) => {
        const head = 'H';
        const tail = 'T';
        const initial = 's';
        const INITIAL_STATE = [ 500, 500 ];

        const stateObject = {
            head: {
                title: head,
                position: INITIAL_STATE,
            },
            tail: {
                title: tail,
                position: INITIAL_STATE,
            },
            initial: {
                title: initial,
                position: INITIAL_STATE,
            },
        };

        const initialStateTitle = stateObject.initial.title;
        const initialStateX = stateObject.initial.position[0];
        const initialStateY = stateObject.initial.position[1];
        bridge[initialStateX][initialStateY] = initialStateTitle;

        return stateObject;
    })(bridge);

    return { bridge, state };
}

function print (bridge) {
    bridge.forEach(item => console.log(item.join('')));
    console.log('\n');
}

function main() {
    const { bridge, state } = init();

    const data = process.env.DATA;
    const arrayOfData = data.split('\n');

    for(let i = 0; i < arrayOfData.length; i++) {
        const step = arrayOfData[i].split(' ');
        const direction = step[0];
        const count = Number(step[1]);

        changePositionOfHead(state.head, bridge, direction, count);
        changePositionOfTail(state.tail, state.head, bridge, direction);
    }

    let partOneCount= 0;
    for (const item of bridge) {
        item.reduce((accumulator, currentValue) => {
            if(currentValue === '#') partOneCount += 1;
        })
    }

    console.log('>>partOneCount', partOneCount)
}

function changePositionOfHead(headState, bridge, direction, count) {
    const X = headState.position[0];
    const Y = headState.position[1];

    let changedX = X;
    let changedY = Y;

    if (direction === 'R') changedY = Y + count;
    if (direction === 'L') changedY = Y - count;
    if (direction === 'U') changedX = X - count;
    if (direction === 'D') changedX = X + count;

    headState.position = [ changedX, changedY ];
}

function changePositionOfTail(tailState, headState, bridge, direction) {
    const headCell = headState.position;
    const tailCell = tailState.position;
    const directionType = direction === 'R' || direction === 'D';
    const isNeighboring = Math.abs(headCell[1] - tailCell[1]) === 1 && Math.abs(headCell[0] - tailCell[0]) === 1;

    if(isNeighboring) return;

    const inOneRow = headCell[0] === tailCell[0];
    if (inOneRow) {
        if(isNeighboring) {
            return;
        } else {
            const start = tailCell[1];
            const end = headCell[1];
            directionType ?
                changePositionOfTailToRight(start, end, tailState, bridge) :
                changePositionOfTailToLeft(start, end, tailState, bridge);
            return;
        }
    }

    const inOnCol = headCell[1] === tailCell[1];
    if(inOnCol) {
        if(isNeighboring) {
            return;
        } else {
            const start = tailCell[0];
            const end = headCell[0];
            directionType ?
                changePositionOfTailToBottom(start, end, tailState, bridge) :
                changePositionOfTailToTop(start, end, tailState, bridge);
            return;
        }
    }

    if(headCell[0] < tailCell[0] && headCell[1] > tailCell[1]) {
        tailState.position = [tailCell[0] - 1, tailCell[1] + 1];
    } else if(headCell[0] > tailCell[0] && headCell[1] > tailCell[1]) {
        tailState.position = [tailCell[0] + 1, tailCell[1] + 1];
    } else if(headCell[0] > tailCell[0] && headCell[1] < tailCell[1]) {
        tailState.position = [tailCell[0] + 1, tailCell[1] - 1];
    } else {
        tailState.position = [tailCell[0] - 1, tailCell[1] - 1];
    }
    changePositionOfTail(tailState, headState, bridge, direction)
}

function changePositionOfTailToRight(start, end, tailState, bridge) {
    const X = tailState.position[0];
    for(let i = start; i < end; i++) {
        tailState.position = [ X, i ];
        bridge[X][i] = '#';
    }
}

function changePositionOfTailToLeft(start, end, tailState, bridge) {
    const X = tailState.position[0];
    for(let i = start; i > end; i--) {
        tailState.position = [ X, i ];
        bridge[X][i] = '#';
    }
}

function changePositionOfTailToTop(start, end, tailState, bridge) {
    const Y = tailState.position[1];
    for(let i = start; i > end; i--) {
        tailState.position = [ i, Y ];
        bridge[i][Y] = '#';
    }
}

function changePositionOfTailToBottom(start, end, tailState, bridge) {
    const Y = tailState.position[1];
    for(let i = start; i < end; i++) {
        tailState.position = [ i, Y ];
        bridge[i][Y] = '#';
    }
}
