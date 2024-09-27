package utils

import (
	dbutils "handleNewScrape/dbUtils"
	"newgo/dbModels"
	// "sync"
)

func GetCategories(exparr []*dbModels.Expense, interval int) error {
	// if len(exparr) < interval {
	for _, exp := range exparr {
		var cat dbModels.Category
		var err error
		if cat, err = dbutils.GetBusinessCategory(exp.BusinessName); err != nil {
			return err
		}
		exp.CategoryID = cat.ID
	}
	return nil
	// }
	// var wg sync.WaitGroup
	// errChan := make(chan error, 1)
	// concurrencyLimit := make(chan struct{}, interval) // Limit to interval concurrent goroutines
	// for _, exp := range exparr {
	// 	wg.Add(1)
	// 	go func(exp *dbModels.Expense) {
	// 		defer wg.Done()

	// 		concurrencyLimit <- struct{}{}
	// 		defer func() { <-concurrencyLimit }()

	// 		var category dbModels.Category
	// 		var err error
	// 		category, err = dbutils.GetBusinessCategory(exp.BusinessName)
	// 		if err != nil {
	// 			errChan <- err
	// 			return
	// 		}
	// 		exp.CategoryID = category.ID
	// 	}(exp)
	// }

	// func() {
	// 	wg.Wait()
	// 	close(errChan)
	// }()

	// // Collect errors if any
	// var finalErr error
	// for err := range errChan {
	// 	if err != nil {
	// 		finalErr = err
	// 	}
	// }
	// if finalErr != nil {
	// 	return finalErr
	// }
	// return nil
}
