package putmonthlyprogress

import (
	"encoding/json"
	"fmt"
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	bodyparamhandle "newgo/server/handlers/monthlyProgress/bodyParamHandle"
	"newgo/server/handlers/utils/bodyParamsHandle"
	userscope "newgo/server/handlers/utils/userScope"
	"strconv"

	"github.com/gorilla/mux"
)

func PutMonthlyProgress(w http.ResponseWriter, r *http.Request) {
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
	progressIdStr := vars["id"]
	if len(progressIdStr) < 1 {
		http.Error(w, "Missing id param", http.StatusBadRequest)
		return
	}
	monthlyProgressId, err := strconv.Atoi(progressIdStr)
	if err != nil {
		http.Error(w, "Invalid Monthly progress id", http.StatusBadRequest)
		return
	}
	var userScope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.MonthlyProgressTable)
	var idNum int64
	userScope.Where("id = ?", monthlyProgressId).Count(&idNum)
	if idNum == 0 {
		http.Error(w, fmt.Sprintf("There is no monthly progress with id %v", monthlyProgressId), http.StatusNotFound)
		return
	}
	var bpo = bodyparamhandle.BodyParamObj{}
	err = json.NewDecoder(r.Body).Decode(&bpo)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	if *bpo.Amount < 0 {
		http.Error(w, "Invalid amount", http.StatusBadRequest)
		return
	}

	var updateFields = bodyParamsHandle.GetFeildsToUpdate(bpo)

	var res = userScope.Where("id = ?", progressIdStr).Updates(&updateFields)
	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error when update", http.StatusInternalServerError)
		return
	}
	//add id for return res
	updateFields["id"] = progressIdStr

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updateFields); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
