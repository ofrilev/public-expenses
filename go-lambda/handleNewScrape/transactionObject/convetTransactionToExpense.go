package transactionObject

import (
	"log"
	"newgo/dbModels"
	"newgo/server/date"
)

func ConvertTransactionToExpense(t *Transaction) *dbModels.Expense {
	parsedDate, err := date.TryParseDate(t.Date, "02-01-2006")
	if err != nil {
		log.Println("Error parsing date:", err)
	}
	if err != nil {
		log.Printf("failed to parse date with err:%v", err)
	}
	return &dbModels.Expense{
		BusinessName: t.Business_name,
		Date:         parsedDate, // Convert to time.Time if needed
		Amount:       t.Amount,
		CardNumber:   t.CardNumber,
		CategoryID:   t.Category,
		//todo change here the userid
		UserId: 1,
	}
}
