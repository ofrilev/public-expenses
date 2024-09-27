package uploadnewscrapedfile

import (
	"handleNewScrape/transactionObject"
	utils "handleNewScrape/uploadNewScrapedFile/utils"
	"newgo/dbModels"
)

func UploadNewScrapedFile(tr []*transactionObject.Transaction) error {
	var ex []*dbModels.Expense
	for _, t := range tr {
		ex = append(ex, transactionObject.ConvertTransactionToExpense(t))
	}
	var err error
	err = utils.InsertExpenses(ex)
	if err != nil {
		return err
	}
	err = utils.GetCategories(ex, 5)
	if err != nil {
		return err
	}
	var extoUpdate = []*dbModels.Expense{}
	for _, e := range ex {
		if e.CategoryID != 0 {
			extoUpdate = append(extoUpdate, e)
		}
	}
	err = utils.UpdateCategories(extoUpdate, 5)
	if err != nil {
		return err
	}
	return nil
}
