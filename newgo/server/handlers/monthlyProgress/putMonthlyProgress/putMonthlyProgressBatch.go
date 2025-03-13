package putmonthlyprogress

import (
	"encoding/json"
	"fmt"
	"server/dbModels"
	"server/gormDbModule"
	"net/http"
	bodyparamhandle "server/handlers/monthlyProgress/bodyParamHandle"
	userscope "server/handlers/utils/userScope"

	"gorm.io/gorm"
)

func PutMonthlyProgressBatch(w http.ResponseWriter, r *http.Request) {
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
	var userScope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.MonthlyProgressTable).Session(&gorm.Session{})
	var bpBo = []bodyparamhandle.BodyParamBatchObj{}
	err = json.NewDecoder(r.Body).Decode(&bpBo)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	var updatedFields = []map[string]interface{}{}

	sqlStatment := "UPDATE monthly_progress SET amount = CASE "

	var updatedIds = ""
	for i, obj := range bpBo {
		if *obj.Amount < 0 {
			http.Error(w, "Invalid amount", http.StatusBadRequest)
			return
		}
		var idNum int64
		userScope.Where("id = ?", *obj.ID).Count(&idNum)
		if idNum == 0 {
			http.Error(w, fmt.Sprintf("There is no monthly progress with id %v", *obj.ID), http.StatusNotFound)
			return
		}
		sqlStatment += fmt.Sprintf("WHEN id = %v THEN %v", *obj.ID, *obj.Amount)
		sqlStatment += fmt.Sprintln()
		if i < len(bpBo)-1 {
			updatedIds += fmt.Sprintf("%v,", *obj.ID)
		} else {
			updatedIds += fmt.Sprintf("%v", *obj.ID)
		}
		updatedFields = append(updatedFields, map[string]interface{}{
			"id":     obj.ID,
			"amount": obj.Amount,
		})
	}

	sqlStatment += fmt.Sprintf("END WHERE id IN (%v)", updatedIds)
	var res = userScope.Exec(sqlStatment)
	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error when update", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updatedFields); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
