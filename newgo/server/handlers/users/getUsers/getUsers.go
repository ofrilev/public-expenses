package getusers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"server/dbModels"
	gormdbmodule "server/gormDbModule"
	"server/handlers/utils/pagination"

	rqp "github.com/timsolov/rest-query-parser"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	query, error := pagination.QueryParamsValidationsWithPagination(r.URL.Query(), rqp.Validations{
		"userid:int": rqp.Min(1),
		"name:string": func(value interface{}) error {
			str := fmt.Sprint(value.(string))
			if str == "" {
				return errors.New("name cannot be empty")
			}
			return nil
		},
		"email:string": func(value interface{}) error {
			str := fmt.Sprint(value.(string))
			if str == "" {
				return errors.New("email cannot be empty")
			}
			return nil
		},
	})
	if error != nil {
		http.Error(w, fmt.Sprintf("Invalid query params: %s", error.Error()), http.StatusBadRequest)
		return
	}
	if query.HaveFilter("id") {
		if len(query.Filters) > 1 {
			http.Error(w, "Invalid query params: id cannot be used with name or parent", http.StatusBadRequest)
			return
		}
	}
	page, pageSize := pagination.GetPageAndPageSize(query)
	query.RemoveFilter("page")
	query.RemoveFilter("page_size")
	var users []dbModels.User
	var resObj = map[string]interface{}{
		"Pagination": pagination.GetPaginationObj(gormdbmodule.DB, page, pageSize, dbModels.TableNames.UsersTable, query),
		"Users":      []map[string]interface{}{},
	}
	//run query  with pagination
	query.Limit = pageSize
	query.Offset = (page - 1) * pageSize
	gormdbmodule.DB.Raw(query.SQL(dbModels.TableNames.UsersTable), query.Args()...).Scan(&users)
	for _, user := range users {
		resObj["Users"] = append(resObj["Users"].([]map[string]interface{}), map[string]interface{}{
			"Userid":   user.Userid,
			"Password": user.Password,
			"Name":     user.Name,
			"Email":    user.Email,
			// "Role_ids": user.UserRoles,
		})
	}
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resObj); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
