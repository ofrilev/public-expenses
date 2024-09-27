import {monthNumberRegex, totalAmountRegex} from "../consts/comonRegex";
import ClientDbClass from "../dbsUtils/ClientDbClass";

export type transactionObj = {
    cardNumber: number;
    date: string,
    name: string,
    amount: string,
    category: string,
    subCategory?: string,
}


export class MonthExpensesUtils {

    static getTotalAmount = (fileData: any[]): string => {
        const fileDataTotalAmount = fileData[4]["כרטיסי אשראי"]
        const filteredNumber = fileDataTotalAmount.match(totalAmountRegex)[0]
        return filteredNumber ? filteredNumber : ""
    }

    static getMonthName = (fileData: any[]): string => {
        const fileDataDate = fileData[6]["__EMPTY_1"]
        const monthFromFullDate = fileDataDate.match(monthNumberRegex)[1]
        console.log(fileDataDate.match(monthNumberRegex)[1])
        const monthFormatter = new Intl.DateTimeFormat('en-US', {month: 'long'});
        try {
            return monthFormatter.format(new Date(2000, parseInt(monthFromFullDate) - 1))
        } catch (err) {
            console.log(`failed to cast month string from  value -${monthFromFullDate}. Err ${err}`);
            return ""
        }
    }
    static getExcelColumnName = (fileData: any, index: number): any => {
        const excelColumnName = {
            amount: "",
            date: "",
            name: "",
            cardNumber: ""
        }
        Object.entries(fileData[index]).map((column: any) => {
            if (column[1].includes("תאריך רכישה") || column[1].includes("תאריך עסקה") ) {
                // @ts-ignore
                excelColumnName.date = column[0]
            }
            if (column[1].includes("סכום חיוב")) {
                // @ts-ignore
                excelColumnName.amount = column[0]
            }

            if (column[1].includes("שם") && column[1].includes("עסק")) {
                // @ts-ignore
                excelColumnName.name = column[0]
            }
        })
        return excelColumnName
    }
}

export class TransactionUtils {
    static getTransactionAmount = (amount: string): string => {
        // @ts-ignore
        return amount.match(totalAmountRegex)[0]
    }

    static getMonthExpansesObjDiscont = async (fileData: any[]): Promise<transactionObj[]> => {
        let beginIndex = 0;
        const returnedObjectArray = []
        while (!fileData[beginIndex]["__EMPTY"]) {
            beginIndex++
        }
        //one last time
        beginIndex++

        while (fileData[beginIndex]["__EMPTY_2"]) {
            returnedObjectArray.push({
                amount: Math.round(fileData[beginIndex]["__EMPTY_7"]).toString(),
                date: fileData[beginIndex]["__EMPTY_1"],
                name: (fileData[beginIndex]["__EMPTY"]),
                cardNumber: parseInt((fileData[beginIndex]["כרטיסי אשראי"]).replace(/\D/g, '')),
                category: await ClientDbClass.getBusinessCategory(fileData[beginIndex]["__EMPTY"]),
            })
            beginIndex++
        }

        return returnedObjectArray
    }

    static getMonthExpansesObjMax = async (fileData: any[]): Promise<transactionObj[]> => {
        let beginIndex = 0;
        const returnedObjectArray = []
        while (!fileData[beginIndex]["__EMPTY"]) {
            beginIndex++
        }
        //one last time
        beginIndex++

        while (fileData[beginIndex]["__EMPTY_2"]) {
            returnedObjectArray.push({
                amount: Math.round(fileData[beginIndex]["__EMPTY_3"]).toString(),
                date: fileData[beginIndex]['כל המשתמשים (1)'].replace(/-/g, '/'),
                name: (fileData[beginIndex]["__EMPTY"]),
                cardNumber: parseInt((fileData[beginIndex]['__EMPTY_1']).replace(/\D/g, '')),
                category: await ClientDbClass.getBusinessCategory(fileData[beginIndex]["__EMPTY"]),
            })
            beginIndex++
        }

        return returnedObjectArray
    }


    static getMonthExpansesObjAbstract = async (fileData: any[]): Promise<transactionObj[]> => {
        let beginIndex = 0;
        const returnedObjectArray = []
        while (!fileData[beginIndex]["__EMPTY_3"]) {
            beginIndex++
        }

        let excelColumnName = MonthExpensesUtils.getExcelColumnName(fileData, beginIndex)

        //one last time
        beginIndex++

        while (fileData[beginIndex][excelColumnName.date]) {
            if (fileData[beginIndex][excelColumnName.name] === "סך חיוב בש\"ח:" || fileData[beginIndex][excelColumnName.name] === "TOTAL FOR DATE") {
                beginIndex++
                continue;
            }
            if (fileData[beginIndex]["__EMPTY"] == "עסקאות בחו˝ל") {
                beginIndex++
                excelColumnName = MonthExpensesUtils.getExcelColumnName(fileData, beginIndex)
                beginIndex++
            }
            returnedObjectArray.push({
                amount: Math.round(fileData[beginIndex][excelColumnName.amount]).toString(),
                date: fileData[beginIndex][excelColumnName.date].replace(/-/g, '/'),
                name: (fileData[beginIndex][excelColumnName.name]),
                cardNumber: 9310,
                category: await ClientDbClass.getBusinessCategory(fileData[beginIndex][excelColumnName.name]),
            })

            beginIndex++
        }

        return returnedObjectArray
    }


    static handleNewTransactions = async (fileData: any[], bank: string) => {
        let transactionObj
        if (bank === 'discont') {
            transactionObj = await this.getMonthExpansesObjDiscont(fileData);
        }

        if (bank === 'max') {
            transactionObj = await this.getMonthExpansesObjMax(fileData)
        }

        if (transactionObj) ClientDbClass.updateExpenses(transactionObj);
    }


}

//todo: start using typeScrip, add helpper functions for every transaction, think of how to clasiffy ech catgory
