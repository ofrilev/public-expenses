package putexpenses

import (
	"encoding/json"
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	"newgo/server/handlers/expenses/utils"
	"newgo/server/handlers/expenses/utils/bodyParamsHandle"
	userscope "newgo/server/handlers/utils/userScope"
	"strconv"

	"github.com/gorilla/mux"
)

func PutExpenses(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	var err error
	vars := mux.Vars(r)
	expenseIdStr := vars["id"]
	if len(expenseIdStr) < 1 {
		http.Error(w, "Missing id param", http.StatusBadRequest)
		return
	}

	var bpo = bodyParamsHandle.BodyParamObj{}
	err = json.NewDecoder(r.Body).Decode(&bpo)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	var resObj = bodyParamsHandle.ValidateBodyParams(bpo)
	if !resObj.Success {
		http.Error(w, resObj.Msg, resObj.Status)
		return
	}
	expensesId, err := strconv.Atoi(expenseIdStr)
	if err != nil {
		http.Error(w, "Invalid expense id", http.StatusBadRequest)
		return
	}
	var userScope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.ExpensesTable)
	var idNum int64
	userScope.Where("id = ?", expensesId).Count(&idNum)

	//is expenses  exist in db
	if idNum == 0 {
		http.Error(w, "Expense does not exist", http.StatusNotFound)
		return
	}
	var updateFields = utils.GetFeildsToUpdate(&bpo)

	var res = userScope.Where("id = ?", expenseIdStr).Updates(&updateFields)
	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error when update", http.StatusBadRequest)
		return
	}
	//add id for return res
	updateFields["id"] = expenseIdStr

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updateFields); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
