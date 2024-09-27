package dbutils

import (
	"encoding/json"
	"io"
	"net/http"
	"newgo/dbModels"
	"strconv"
	"strings"
)

func InsertNewExpense(expense *dbModels.Expense) error {
	var body []byte
	body, _ = json.Marshal(map[string]interface{}{
		"amount":        expense.Amount,
		"business_name": expense.BusinessName,
		"date":          expense.Date.Format("2006/01/02"),
		"card_number":   expense.CardNumber,
	})
	req, err := makeReq("POST", "expenses", body)
	if err != nil {
		return err
	}
	var client = &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != 201 {
		return err
	}
	rebody, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	responseStr := strings.TrimSpace(string(rebody))
	responseInt, err := strconv.ParseInt(responseStr, 10, 64)
	if err != nil {
		return err
	}
	expense.ID = responseInt
	defer resp.Body.Close()
	return nil
}
