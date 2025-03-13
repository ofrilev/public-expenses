package putexpensesbybusinessname

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/dbModels"
	"server/gormDbModule"
	"server/handlers/expenses/utils/bodyParamsHandle"
	"server/handlers/utils/userScope"

	"gorm.io/gorm"
)

func PutExpensesByBusinessName(w http.ResponseWriter, r *http.Request) {
	var err error
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}
	if err = r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	var userScope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.ExpensesTable).Session(&gorm.Session{})

	var bpo = []bodyParamsHandle.BodyParamObj{}
	err = json.NewDecoder(r.Body).Decode(&bpo)
	if err != nil || len(bpo) == 0 {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	var updatedBusiness_names = ""
	var sqlStatement = "UPDATE expenses SET category = CASE "
	for i,obj := range bpo {
		if obj.GetField("business_name") == nil {
			http.Error(w, "Invalid body params: Missing business_name", http.StatusBadRequest)
			return
		}
		escapeSingleQuotes(obj.BusinessName)
		var cat = obj.GetField("category")
		if cat == nil {
			http.Error(w, "Invalid body params: Missing amount", http.StatusBadRequest)
		}
		sqlStatement += fmt.Sprintf("WHEN business_name = '%s' THEN %v ", *obj.BusinessName,*obj.Category)
		sqlStatement += "   "
		if i < len(bpo)-1 {
			updatedBusiness_names += fmt.Sprintf("'%s',", *obj.BusinessName)
		} else {
			updatedBusiness_names += fmt.Sprintf("'%s'", *obj.BusinessName)
		}
	}
	sqlStatement += fmt.Sprintf("END WHERE business_name IN (%s) AND special = 0", updatedBusiness_names)
	var res = userScope.Exec(sqlStatement)
		if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error when update", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)	
}