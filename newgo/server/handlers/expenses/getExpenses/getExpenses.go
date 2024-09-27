package getexpenses

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"newgo/dbModels"
	"newgo/server/date"
	"newgo/server/handlers/utils/pagination"
	userscope "newgo/server/handlers/utils/userScope"

	rqp "github.com/timsolov/rest-query-parser"

	gormdbmodule "newgo/gormDbModule"
	"strings"
)

func GetExpenses(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	q, error := pagination.QueryParamsValidationsWithPagination(r.URL.Query(),
		rqp.Validations{
			"id:int":               rqp.Min(0),
			"sort":                 rqp.In("id", "date", "amount", "business_name", "category", "special", "card_number"),
			"business_name:string": nil,
			"amount:int":           nil,
			"category:int":         rqp.Min(0),
			"special:int":          rqp.In(0, 1),
			"date:string": func(value interface{}) error {
				if value.(string) == "NULL" {
					return nil
				}
				str := fmt.Sprint(value.(string))
				parts := strings.Split(str, "/")
				year, day, month := parts[0], parts[1], parts[2]
				if len(day) == 2 && len(month) == 2 && len(year) == 4 {
					return nil
				}
				return errors.New("date must be in format yyyy/mm/dd")

			},
			"card_number:int": func(value interface{}) error {
				str := fmt.Sprint(value.(int))
				if len(str) == 4 {
					return nil
				}
				return errors.New("card number must be 4 digits")
			},
		})

	if error != nil {
		http.Error(w, error.Error(), http.StatusBadRequest)
		fmt.Println(error)
		return
	}
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	var page, pageSize = pagination.GetPageAndPageSize(q)
	q.RemoveFilter("page")
	q.RemoveFilter("page_size")

	//build query
	var datef, err = q.GetFilter("date")
	if err == nil {
		datef.Value = strings.ReplaceAll(datef.Value.(string), "-", "/")
	}

	var userScopedQuery = gormdbmodule.DB
	q.AddFilter("user_id", rqp.EQ, user_id)
	paginationObj := pagination.GetPaginationObj(userScopedQuery, page, pageSize, dbModels.TableNames.ExpensesTable, q)

	var resObj ResObject

	resObj.Pagination = paginationObj

	var expensesObj = []Expenses{}

	//build query with pagination

	var limit = pagination.CalcLimit(pageSize, paginationObj.TotalItems)
	var offset = (page - 1) * pageSize
	var order = q.Order()
	var where = q.Where()
	var args = q.Args()
	var userScope = userScopedQuery.Model(&dbModels.Expense{}).Where(where, args...)
	if limit > 0 {
		userScope = userScope.Limit(limit)
	}
	if order != "" {
		userScope = userScope.Order(order)
	}

	userScope.Offset(offset).Find(&expensesObj)

	for _, e := range expensesObj {
		resObj.Expenses = append(resObj.Expenses, map[string]interface{}{
			"id":            e.Id,
			"business_name": e.BusinessName,
			"amount":        e.Amount,
			"card_number":   e.CardNumber,
			"special":       e.Special,
			"date":          date.ParseDateToStrORNil(e.Date, "02-01-2006"),
			"category":      e.Category,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resObj)

}
