package dbutils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"newgo/dbModels"
	"strings"
)

func GetBusinessCategory(businesName string) (dbModels.Category, error) {
	var category dbModels.Category
	var err error
	var queryBusinessName = strings.ReplaceAll(businesName, " ", "%20")
	req, err := makeReq("GET", fmt.Sprintf("expenses/?business_name=%s&category[ne]=0&special[eq]=0&page_size=1&limit=1", queryBusinessName), []byte{})
	if err != nil {
		return category, err
	}
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err.Error())
		return category, err
	}

	if res.StatusCode != http.StatusOK {
		return category, fmt.Errorf("failed to get category expense with status code: %d", res.Body)
	}

	defer res.Body.Close()
	var expense GetExpensesResponse

	if err := json.NewDecoder(res.Body).Decode(&expense); err != nil {
		return category, nil
	}
	category = extractCategory(expense)
	return category, nil
}
func extractCategory(expense GetExpensesResponse) dbModels.Category {
	var category dbModels.Category
	var data = expense.Expenses
	if len(data) > 0 {
		category.ID = data[0].CategoryID
		return category
	}
	return category

}
