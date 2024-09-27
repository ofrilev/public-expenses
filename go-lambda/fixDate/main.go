package main

import (
	loadnewscrpaedfile "handleNewScrape/loadNewScrpaedFile"
	"handleNewScrape/transactionObject"
	"log"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	"strings"
)

func main() {
	f, err := loadnewscrpaedfile.LoadNewFile()
	if err != nil {
		log.Fatalf("Failed to load last scraped file from /tmp with err: %v", err)
	}

	gormdbmodule.Init()
	r := transactionObject.ReadExcelFromFile(f)
	trarr := transactionObject.GetTransactionObj(r)
	var ex []*dbModels.Expense
	for _, t := range trarr {
		ex = append(ex, transactionObject.ConvertTransactionToExpense(t))
	}
	for _, e := range ex {
		res := getTransactionByModel(e)
		var y = strings.Split(res.Res.Date.Format("02-01-2006"), "-")[2]
		if res.Count == 1 && y == "0001" {
			e.ID = res.Res.ID
			updateDbExpense(e)
		}

	}

}
