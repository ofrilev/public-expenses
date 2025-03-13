package utils

import (
	"go-lambda/handleNewScrape/transactionObject"
	"log"
	"newgo/server/date"
	"sort"
)

func SortStructsByDate(trr []*transactionObject.Transaction) {
	// Define a custom sort function
	sort.Slice(trr, func(i, j int) bool {
		dateI, err := date.TryParseDate(trr[i].Date, "02-01-2006")
		if err != nil {
			log.Fatalf("Invalid date format: %v", err)
		}
		dateJ, err := date.TryParseDate(trr[j].Date, "02-01-2006")
		if err != nil {
			log.Fatalf("Invalid date format: %v", err)
		}
		return dateI.Before(dateJ)
	})
}
