package parsednewscrapefile

import (
	"handleNewScrape/parsedNewScrapeFile/utils"
	"handleNewScrape/transactionObject"
	"log"
	"newgo/dbModels"
	"os"
)

func Parsednewscrapefile(f *os.File, fn string, le dbModels.Expense) ([]*transactionObject.Transaction, error) {
	if utils.IsFstFileDateGreaterThenSnd(fn, le.Date.Format("02-01-2006")) {
		r := transactionObject.ReadExcelFromFile(f)
		if r.SheetsNum > 0 {
			trarr := transactionObject.GetTransactionObj(r)
			utils.SortStructsByDate(trarr)
			si := utils.FindSliceIndex(trarr, le)
			sd := trarr[si:]
			if len(sd) > 0 {
				return sd, nil
			}
		}
	}
	log.Printf("file:%v not have any new expense", fn)
	return nil, nil
}
