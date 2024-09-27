import * as fs from 'fs';
// @ts-ignore
import csvParser from 'csv-parser';
import { pipeline } from 'stream';

interface Row {
    [key: string]: string;
}

export function containsHebrewChars(text: string): boolean {
    const regex = /[\u0590-\u05FF]/;
    return regex.test(text);
}

export function splitCsvByHebrewChars(inputPath: string, hebrewPath: string, nonHebrewPath: string): void {
    fs.createReadStream(inputPath)
        .pipe(csvParser())
        .on('data', (row: Row) => {
            const text = Object.values(row).join(',');
            const outputPath = containsHebrewChars(text) ? hebrewPath : nonHebrewPath;
            
            fs.appendFileSync(outputPath, `${text}\n`);
        })
        .on('end', () => {
            console.log('CSV file split successfully!');
        });
}

const inputFilePath = '/Users/ofri.levkowitz/Desktop/expenses.csv';
const hebrewFilePath = '/Users/ofri.levkowitz/Desktop/hebrew_expenses.csv';
const nonHebrewFilePath = '/Users/ofri.levkowitz/Desktop/non_hebrew_expenses.csv';

export const runSplitCsvByHebrewChars = () =>
splitCsvByHebrewChars(inputFilePath, hebrewFilePath, nonHebrewFilePath);
