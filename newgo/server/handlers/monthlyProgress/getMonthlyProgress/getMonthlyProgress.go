package getmonthlyprogress

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	"newgo/server/date"
	"newgo/server/handlers/utils/pagination"
	userscope "newgo/server/handlers/utils/userScope"
	"strings"

	rqp "github.com/timsolov/rest-query-parser"
)

func dateValidator(value interface{}) error {
	if value.(string) == "NULL" {
		return nil
	}
	str := fmt.Sprint(value.(string))
	parts := strings.Split(str, "/")
	var year, month string
	year, month = parts[0], parts[1]
	if len(month) == 2 && len(year) == 4 {
		return nil
	}
	return errors.New("date must be in format yyyy/mm/dd")
}
func GetMonthlyProgress(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	q, error := pagination.QueryParamsValidationsWithPagination(r.URL.Query(),
		rqp.Validations{
			"id:int":       rqp.Min(0),
			"sort":         rqp.In("id", "date", "amount", "category"),
			"amount:int":   nil,
			"category:int": rqp.Min(0),
			"date:string":  dateValidator,
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
		//date reformat
		dString := datef.Value.(string)
		dStringArr := strings.Split(datef.Value.(string), "/")
		if len(dStringArr) > 2 {
			dString = strings.Join(dStringArr[0:2], "/")
		}
		(*datef).Value = dString + "/01"
	}
	var userScopedQuery = gormdbmodule.DB

	q.AddFilter("user_id", rqp.EQ, user_id)
	paginationObj := pagination.GetPaginationObj(userScopedQuery, page, pageSize, dbModels.TableNames.MonthlyProgressTable, q)

	var resObj ResObject

	resObj.Pagination = paginationObj
	resObj.MonthlyProgress = map[string][]map[string]interface{}{}
	var monthlyProgressObj []dbModels.MonthlyProgress

	var limit = pagination.CalcLimit(pageSize, paginationObj.TotalItems)
	var offset = (page - 1) * pageSize
	var order = q.Order()
	var where = q.Where()
	var args = q.Args()
	var userScope = userScopedQuery.Table(dbModels.TableNames.MonthlyProgressTable).Where(where, args...)
	if limit > 0 {
		userScope = userScope.Limit(limit)
	}
	if order != "" {
		userScope = userScope.Order(order)
	}
	userScope.Offset(offset).Find(&monthlyProgressObj)

	for _, e := range monthlyProgressObj {
		datef := date.ParseDateToStrORNil(e.Date, "2006-01-02")
		if datef == nil {
			continue
		}
		var dateStr = *datef
		newVal := map[string]interface{}{
			"id":            e.ID,
			"date":          date.ParseDateToStrORNil(e.Date, "2006-01-02"),
			"goal_amount":   e.Amount,
			"currentAmount": GetCurrentAmount(e.Date, e.CategoryID, user_id),
			"category":      e.CategoryID,
		}
		val, ex := resObj.MonthlyProgress[dateStr]
		if !ex {
			resObj.MonthlyProgress[dateStr] = []map[string]interface{}{newVal}
		} else {
			resObj.MonthlyProgress[dateStr] = append(val, newVal)
		}
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resObj)

}
