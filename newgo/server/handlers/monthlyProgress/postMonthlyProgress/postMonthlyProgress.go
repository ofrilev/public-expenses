package postmonthlyprogress

import (
	"encoding/json"
	"server/dbModels"
	"server/gormDbModule"
	"net/http"
	bodyparamhandle "server/handlers/monthlyProgress/bodyParamHandle"
	utils "server/handlers/utils/bodyParamsHandle"
	userscope "server/handlers/utils/userScope"
)

func PostMonthlyProgress(w http.ResponseWriter, r *http.Request) {
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	var err error
	var bpo = []bodyparamhandle.BodyParamObj{}
	err = json.NewDecoder(r.Body).Decode(&bpo)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	var progressToUpdate []dbModels.MonthlyProgress
	var progressIds = []int{}
	for _, obj := range bpo {
		for _, field := range []string{"amount", "category", "date"} {
			if (utils.GetField(obj, field)) == nil {
				http.Error(w, "Invalid body params: Missing "+field, http.StatusBadRequest)
				return
			}
		}
		var resObj = bodyparamhandle.ValidateBodyParams(obj)
		if !resObj.Success {
			http.Error(w, resObj.Msg, resObj.Status)
			return
		}
		var newProgressFields = utils.GetFeildsToUpdate(obj)
		var newProgress = bodyparamhandle.GetFieldsToUpdate(newProgressFields)
		newProgress.UserId = int64(user_id)
		if isProgressExist(newProgress) {
			http.Error(w, "Progress already exist: with this category at same month", http.StatusBadRequest)
			return
		}
		progressToUpdate = append(progressToUpdate, newProgress)
	}

	var res = gormdbmodule.DB.Table(dbModels.TableNames.MonthlyProgressTable).Create(&progressToUpdate)
	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	for _, obj := range progressToUpdate {
		progressIds = append(progressIds, obj.ID)
	}
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(progressIds); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}

}
