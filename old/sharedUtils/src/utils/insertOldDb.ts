import * as fs from 'fs';
import csvParser from 'csv-parser';
import {Client} from "pg";
import ClientDbClass from "./dbsUtils/ClientDbClass";
import { containsHebrewChars } from './splitCsvHebrewChar';
const regex = /[\u0590-\u05FF]/;
export const asyncInsertRows = async () => {
    const results: any[] = [];
    fs.createReadStream('/Users/ofri.levkowitz/Desktop/non_hebrew_expenses.csv')
        .pipe(csvParser({separator: ','}))
        .on('data', (data: any) => results.push(data))
        .on('end', async () => {
            // Insert rows into the PostgreSQL table
            ClientDbClass.insertExpensesRows(results);
            
        });


}
const extractExpensesFromFile = (): any => {
    const csvData = fs.readFileSync('/Users/ofri.levkowitz/Desktop/expenses.csv', 'utf8');

        // Split the CSV data into lines
        const lines = csvData.trim().split('\n');

        // Initialize an array to store the parsed data
        const parsedData = [];

        // Loop through each line of the CSV
        for (const line of lines) {
        // Split each line into columns using a comma as the delimiter
        

            if (containsHebrewChars(line)) {
                
                const [index,nameParts ,amount,date,cardNumber,category, specieal] = line.split(',');
                //@ts-ignore
                parsedData.push({
                    category: parseInt(category),
                    amount: parseInt(amount),
                    date: date,
                    cardNumber:cardNumber,
                    special: parseInt(specieal),
                    business_name: nameParts.replace(/\\/g, '')
                });
            }
            else {
        
            const [amount,nameParts,index, date, cardNumber,category,specieal] = line.split(',');
            // Join the name parts back together to reconstruct the name
            const name = nameParts;
            
        // Create an object and add it to the parsedData array
        //@ts-ignore    
        parsedData.push({
            category: parseInt(category),
            amount: parseInt(amount),
            date: date,
            cardNumber:cardNumber,
            special: parseInt(specieal),    
            business_name: name.trim()
            });
        }
    
    }
    return (parsedData)
}
export const insertExpenses = () => {
  const result =  extractExpensesFromFile();
  ClientDbClass.insertExpensesRows(result);
}