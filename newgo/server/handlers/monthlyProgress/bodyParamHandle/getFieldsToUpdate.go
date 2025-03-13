package bodyparamhandle

import (
	"server/dbModels"
	"time"
)

func GetFieldsToUpdate(mapFields map[string]interface{}) dbModels.MonthlyProgress {
	var progress dbModels.MonthlyProgress
	for name, field := range mapFields {
		switch name {
		case "amount":
			progress.Amount = field.(int)
		case "date":
			var dateF, _ = time.Parse("2006/01/02", field.(string))
			progress.Date = dateF
		case "category":
			progress.CategoryID = field.(int)

		}

	}

	return progress
}
