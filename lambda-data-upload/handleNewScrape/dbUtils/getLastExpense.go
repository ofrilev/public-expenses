package dbutils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"newgo/dbModels"
	// "time"
)

func GetLastExpense() (dbModels.Expense, error) {
	var exp GetExpensesResponse
	var le = dbModels.Expense{}
	var lastExpenseFilter = "sort=-id&limit=1&page_size=1"
	var req, err = makeReq("GET", fmt.Sprintf("expenses/?%s", lastExpenseFilter), []byte{})
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err.Error())
		return le, err
	}

	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		return le, fmt.Errorf("failed to get last expense with status code: %d", res.StatusCode)
	}
	err = json.NewDecoder(res.Body).Decode(&exp)
	if err != nil {
		return le, err
	}

	le, err = ParseAndValidate(exp)
	if err != nil {
		return le, err
	}
	return le, nil
}
