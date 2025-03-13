package transactionObject

import (
	"math"
	"strconv"
	"strings"
)

type excelColumnRollMapIndex struct {
	cardNumber    int
	date          int
	business_name int
	amount        int
	category      int
}
type Transaction struct {
	CardNumber    int
	Date          string
	Business_name string
	Amount        int
	Category      int
}

func GetTransactionObj(r ExcelData) []*Transaction {
	rowIndexRoll := getRowIndexRoll(r.Data[0])
	var returnedObjArray []*Transaction
	endOfSheetCounter := 0
	f2 := r.Data[1:]
	row := 0
	for row < len(f2) {
		if f2[row][0] == "end-of-sheet" {
			endOfSheetCounter++
			if endOfSheetCounter == r.SheetsNum {
				break
			}
			row += 1
		}
		tempObj := &Transaction{Amount: 0, CardNumber: 0, Date: "", Business_name: "", Category: 0}
		cardNumber, err := strconv.Atoi(f2[row][rowIndexRoll.cardNumber])
		business_name := f2[row][rowIndexRoll.business_name]
		amount, err2 := strconv.ParseFloat(f2[row][rowIndexRoll.amount], 32)
		date := f2[row][rowIndexRoll.date]
		if strings.Contains(f2[row][rowIndexRoll.category], "משיכת מזומנים") {
			//handle abroad exepnses sheet
			if r.AbroadSheetInd == r.SheetsNum || r.AbroadSheetInd == endOfSheetCounter {
				tempObj.Category = 49
			} else {
				tempObj.Category = 38
			}
		}
		if err != nil || err2 != nil {
			continue
		}
		tempObj.CardNumber, tempObj.Business_name, tempObj.Amount, tempObj.Date = cardNumber, business_name, int(math.Round(amount)), date
		returnedObjArray = append(returnedObjArray, tempObj)
		row++
	}
	return returnedObjArray
}

// add the logic of getting roll and index for the after for loop
func getRowIndexRoll(f []string) excelColumnRollMapIndex {
	e := excelColumnRollMapIndex{}
	for i, cell := range f {
		isStringCardNumber := strings.Contains(cell, "אשראי") && strings.Contains(cell, "כרטיס")
		isStringBusiness_name := strings.Contains(cell, "שם") && strings.Contains(cell, "עסק")
		isStringDate := strings.Contains(cell, "תאריך רכישה") || strings.Contains(cell, "תאריך עסקה")
		isStringAmount := strings.Contains(cell, "סכום חיוב")
		isStringCategory := strings.Contains(cell, "קטגוריה")

		if isStringBusiness_name {
			e.business_name = i
		}
		if isStringDate {
			e.date = i
		}
		if isStringAmount {
			e.amount = i
		}
		if isStringCardNumber {
			e.cardNumber = i
		}
		if isStringCategory {
			e.category = i
		}
	}
	return e
}
