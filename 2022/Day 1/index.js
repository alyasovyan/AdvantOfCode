'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

const data = process.env.DATA;
const arrayOfData = data.split('\n');
const arrayOfSum = [];
let sum = 0;

for(let i = 0; i < arrayOfData.length; i++) {
	const arrayElement = arrayOfData[i];
	const isTheLastElementOrEmpty = (i === arrayOfData.length - 1) || !arrayElement;

	if(isTheLastElementOrEmpty) {
		arrayOfSum.push(sum);
		sum = 0;
		continue;
	}

	sum += Number(arrayElement);
}

console.log(Math.max(...arrayOfSum));
