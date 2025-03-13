package utils

import (
	"go-lambda/handleNewScrape/transactionObject"
	"newgo/dbModels"
)

func FindSliceIndex(trarr []*transactionObject.Transaction, lastexpense dbModels.Expense) int {

	for i, e := range trarr {

		edate := parseDate(e.Date)

		if lastexpense.Date.After(edate) {
			continue
		}
		isLaterDate := lastexpense.Date.Before(edate)
		hasEnoughFollowing := len(trarr) > i+2
		isMatchingBusiness := e.Business_name == lastexpense.BusinessName
		isEndOfSlice := i+1 >= len(trarr)
		isNextDifferentBusiness := !isEndOfSlice && trarr[i+1].Business_name != lastexpense.BusinessName

		if isLaterDate && hasEnoughFollowing || (isMatchingBusiness && (isEndOfSlice || isNextDifferentBusiness)) {
			return i + 1
		}
	}
	return 0
}
