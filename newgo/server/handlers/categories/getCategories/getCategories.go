package getcategories

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	"newgo/server/handlers/utils/pagination"
	userscope "newgo/server/handlers/utils/userScope"

	rqp "github.com/timsolov/rest-query-parser"
)

func GetCategories(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	query, error := pagination.QueryParamsValidationsWithPagination(r.URL.Query(), rqp.Validations{
		"id:int": rqp.Min(0),
		"sort": rqp.In("id", "name", "parent"),
		"name:string": func(value interface{}) error {
			str := fmt.Sprint(value.(string))
			if str == "" {
				return errors.New("category name cannot be empty")
			}
			return nil
		},
		"parent": nil,
	})
	if error != nil {
		http.Error(w, fmt.Sprintf("Invalid query params: %s", error.Error()), http.StatusBadRequest)
		return
	}

	if query.HaveFilter("id") {
		if query.HaveFilter("name") || query.HaveFilter("parent") {
			http.Error(w, "Invalid query params: id cannot be used with name or parent", http.StatusBadRequest)
			return
		}
	}

	if query.HaveFilter("name") {
		query.ReplaceNames(map[string]string{"name": "category"})
	}

	page, pageSize := pagination.GetPageAndPageSize(query)
	query.RemoveFilter("page")
	query.RemoveFilter("page_size")

	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	query.AddFilter("user_id", rqp.EQ, user_id)
	var categories []dbModels.Category
	var resObj = map[string]interface{}{
		"Pagination": pagination.GetPaginationObj(gormdbmodule.DB, page, pageSize, dbModels.TableNames.CategoriesTable, query),
		"Categories": []map[string]interface{}{},
	}
	//run query  with pagination
	query.Limit = pageSize
	query.Offset = (page - 1) * pageSize
	gormdbmodule.DB.Raw(query.SQL(dbModels.TableNames.CategoriesTable), query.Args()...).Scan(&categories)
	for _, c := range categories {
		if c.ParentID == 0 {
			resObj["Categories"] = append(resObj["Categories"].([]map[string]interface{}), map[string]interface{}{
				"category": c.Category,
				"parent":   nil,
				"id":       c.ID,
			})
		} else {
			resObj["Categories"] = append(resObj["Categories"].([]map[string]interface{}), map[string]interface{}{
				"category": c.Category,
				"parent":   c.ParentID,
				"id":       c.ID,
			})
		}

	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resObj); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
