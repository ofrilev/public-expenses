package deletemonthlyprogress

import (
	"net/http"
	"server/dbModels"
	"server/gormDbModule"
	"server/handlers/utils/userScope"
	"strconv"

	"github.com/gorilla/mux"
)

func DeleteMonthlyProgress(w http.ResponseWriter, r *http.Request) {
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
	progressId, err := strconv.Atoi(progressIdStr)
	if err != nil {
		http.Error(w, "Invalid Monthly progress id", http.StatusBadRequest)
		return
	}
	var userscope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.MonthlyProgressTable)
	var idNum int64
	userscope.Where("id = ?", progressId).Count(&idNum)

	//is expenses  exist in db
	if idNum == 0 {
		http.Error(w, "Monthly progress does not exist", http.StatusNotFound)
		return
	}
	var res = userscope.Where("id = ?", progressId).Delete(&dbModels.MonthlyProgress{})

	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)

}
