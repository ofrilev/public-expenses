package postexpenses

import (
	"server/dbModels"
	"server/date"
)

func GetFieldsToUpdate(mapFields map[string]interface{}) dbModels.Expense {
	var expense dbModels.Expense
	for name, field := range mapFields {
		switch name {
		case "business_name":
			expense.BusinessName = field.(string)
		case "amount":
			expense.Amount = field.(int)
		case "date":
			var dateF, _ = date.TryParseDate(field.(string), "2006/01/02")
			expense.Date = dateF
		case "category":
			expense.CategoryID = field.(int)
		case "card_number":
			expense.CardNumber = field.(int)
		case "special":
			expense.Special = field.(int)
		}

	}

	return expense
}
