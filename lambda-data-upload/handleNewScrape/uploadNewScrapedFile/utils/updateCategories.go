package utils

import (
	"fmt"
	dbutils "go-lambda/handleNewScrape/dbUtils"
	"log"
	"newgo/dbModels"
)

func UpdateCategories(exarr []*dbModels.Expense, interval int) error {
	// Iterate through the slice of expenses sequentially
	for _, ex := range exarr {
		// Skip if the category ID is 47 (unknown category)
		if ex.CategoryID != 47 {
			// Update the expense
			err := dbutils.UpdateExpense(*ex)
			if err != nil {
				// Log and return the error if updating fails
				fmt.Println(err)
				log.Fatalf("failed to update expense category with error: %v", err)
				return err
			}
		}
	}
	return nil
}
