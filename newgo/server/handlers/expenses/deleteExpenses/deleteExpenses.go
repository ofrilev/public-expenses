package deleteexpenses

import (
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	userscope "newgo/server/handlers/utils/userScope"
	"strconv"

	"github.com/gorilla/mux"
)

func DeleteExpenses(w http.ResponseWriter, r *http.Request) {
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	var err error
	vars := mux.Vars(r)
	expensesIdStr := vars["id"]
	if len(expensesIdStr) < 1 {
		http.Error(w, "Missing id param", http.StatusBadRequest)
		return
	}
	expensesId, err := strconv.Atoi(expensesIdStr)
	if err != nil {
		http.Error(w, "Invalid expense id", http.StatusBadRequest)
		return
	}
	var userscope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.ExpensesTable)
	var idNum int64
	userscope.Where("id = ?", expensesId).Count(&idNum)

	//is expenses  exist in db
	if idNum == 0 {
		http.Error(w, "Expense does not exist", http.StatusNotFound)
		return
	}
	var res = userscope.Where("id = ?", expensesId).Delete(&dbModels.Expense{})

	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)

}
