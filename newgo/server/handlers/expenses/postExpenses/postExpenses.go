package postexpenses

import (
	"encoding/json"
	"net/http"
	gormdbmodule "newgo/gormDbModule"
	"newgo/server/handlers/expenses/utils"
	"newgo/server/handlers/expenses/utils/bodyParamsHandle"
	userscope "newgo/server/handlers/utils/userScope"
)

func PostExpenses(w http.ResponseWriter, r *http.Request) {
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
	var bpo = bodyParamsHandle.BodyParamObj{}
	err = json.NewDecoder(r.Body).Decode(&bpo)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	for _, field := range []string{"business_name", "card_number", "date"} {
		if bpo.GetField(field) == nil {
			http.Error(w, "Invalid body params: Missing "+field, http.StatusBadRequest)
			return
		}
	}
	var resObj = bodyParamsHandle.ValidateBodyParams(bpo)
	if !resObj.Success {
		http.Error(w, resObj.Msg, resObj.Status)
		return
	}
	var newExpenseFields = utils.GetFeildsToUpdate(&bpo)

	var newExpense = GetFieldsToUpdate(newExpenseFields)

	newExpense.UserId = int64(user_id)

	var res = gormdbmodule.DB.Create(&newExpense)

	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(newExpense.ID); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}

}
