package main

import (
	"log"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	userscope "newgo/server/handlers/utils/userScope"
)

type Result struct {
	Count int64
	Res   dbModels.Expense
}

func getTransactionByModel(ta *dbModels.Expense) Result {
	var result Result

	// Query the database once to count the number of matching rows and find the first matching row
	userscope.UserScopedQuery(gormdbmodule.DB, 1, "expenses").
		Model(&dbModels.Expense{}).
		Where("amount = ? AND business_name = ? AND card_number = ?", ta.Amount, ta.BusinessName, ta.CardNumber).
		Count(&result.Count).
		First(&result.Res)

	return result
}
func updateDbExpense(ta *dbModels.Expense) error {
	result := userscope.UserScopedQuery(gormdbmodule.DB, 1, "expenses").Model(&dbModels.Expense{}).
		Where("id=?", ta.ID).
		Update("date", ta.Date)
	if result.RowsAffected == 0 {
		log.Fatalf("No rows were inserted for expense:bname-%v,amount-%v,date-%v", ta.BusinessName, ta.Amount, ta.Date) // consider returning the error instead
	}
	return result.Error
}
