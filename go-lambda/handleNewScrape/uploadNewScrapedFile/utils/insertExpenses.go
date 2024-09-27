package utils

import (
	dbutils "handleNewScrape/dbUtils"
	"newgo/dbModels"
)

func InsertExpenses(expenses []*dbModels.Expense) error {
	for _, e := range expenses {
		err := dbutils.InsertNewExpense(e)
		if err != nil {
			return err
		}
	}
	return nil
}
