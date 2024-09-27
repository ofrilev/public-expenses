package dbutils

import (
	"encoding/json"
	"errors"
	"net/http"
	"newgo/dbModels"
	"strconv"
)

func UpdateExpense(e dbModels.Expense) error {
	body, err := json.Marshal(map[string]interface{}{"category": e.CategoryID})
	if err != nil {
		return err
	}
	req, err := makeReq("PUT", "expenses/"+strconv.Itoa(int(e.ID)), body)
	var client = &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	if res.StatusCode != 200 {
		return errors.New("Failed to update expense")
	}
	return nil
}
