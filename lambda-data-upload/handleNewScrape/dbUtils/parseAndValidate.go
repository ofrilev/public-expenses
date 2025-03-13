package dbutils

import (
	"newgo/dbModels"
	"newgo/server/date"
)

func ParseAndValidate(data GetExpensesResponse) (dbModels.Expense, error) {
	var expense dbModels.Expense
	var err error
	for _, e := range data.Expenses {
		expense.Amount = e.Amount
		expense.BusinessName = e.BusinessName
		expense.Date, err = date.TryParseDate(e.Date, "02-01-2006")
		if err != nil {
			return expense, err
		}
		expense.CardNumber = e.CardNumber

	}
	return expense, nil
}
