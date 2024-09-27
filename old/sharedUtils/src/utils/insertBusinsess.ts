import * as fs from 'fs';
import csvParser from 'csv-parser';
import {Client} from "pg";
import ClientDbClass from "./dbsUtils/ClientDbClass";
import { containsHebrewChars } from './splitCsvHebrewChar';

const extractBusinessFromFile = (): any => {
    const csvData = fs.readFileSync('/Users/ofri.levkowitz/Desktop/business.csv', 'utf8');

        // Split the CSV data into lines
        const lines = csvData.trim().split('\n');

        // Initialize an array to store the parsed data
        const parsedData = [];

        // Loop through each line of the CSV
        for (const line of lines) {
        // Split each line into columns using a comma as the delimiter
        

            if (containsHebrewChars(line)) {
                const [index,nameParts ,category] = line.split(',');
                //@ts-ignore
                parsedData.push({
                    category: parseInt(category),
                    index: parseInt(index),
                    business_name: nameParts.replace(/\\/g, '')
                });
            }
            else {
            const [index,nameParts, category] = line.split(',');
            // Join the name parts back together to reconstruct the name
            const name = nameParts;
            
        // Create an object and add it to the parsedData array
        //@ts-ignore    
        parsedData.push({
                category: parseInt(category),
                index: parseInt(index),
                business_name: name.trim()
            });
        }
    
    }
    return (parsedData)
}

export const insertBusiness = () => {
  const resObj =  extractBusinessFromFile();
  ClientDbClass.insertBusinessNameRows(resObj);

}