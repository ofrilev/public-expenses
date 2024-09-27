package utils

import (
	"fmt"
	dbutils "handleNewScrape/dbUtils"
	"log"
	"newgo/dbModels"
	"sync"
)

func UpdateCategories(exarr []*dbModels.Expense, interval int) error {
	if len(exarr) < interval {
		for _, ex := range exarr {
			if ex.CategoryID != 47 {
				err := dbutils.UpdateExpense(*ex)
				if err != nil {
					fmt.Println(err)
					log.Fatalf("failed to update expense category with error: %v", err)
				}
			}
		}
		return nil
	}
	var wg sync.WaitGroup
	concurrencyLimit := make(chan struct{}, interval)
	errChan := make(chan error, 1)
	for _, ex := range exarr {
		wg.Add(1)
		go func(ex *dbModels.Expense) {
			defer wg.Done()
			// Only proceed if the category is not unkown
			if ex.CategoryID != 47 {
				concurrencyLimit <- struct{}{}
				err := dbutils.UpdateExpense(*ex)
				if err != nil {
					errChan <- err
				}

				<-concurrencyLimit
			}
		}(ex)
	}
	func() {
		wg.Wait()
	}()
	if err, ok := <-errChan; ok {
		return err
	}
	return nil
}
