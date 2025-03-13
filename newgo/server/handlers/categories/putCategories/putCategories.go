package putcategories

import (
	"encoding/json"
	"net/http"
	"server/dbModels"
	"server/gormDbModule"
	checkchange "server/handlers/categories/putCategories/checkChange"
	"server/handlers/categories/utils/bodyParamsHandle"
	userscope "server/handlers/utils/userScope"
	"strconv"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func PutCategories(w http.ResponseWriter, r *http.Request) {
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
	categoriesIdStr := vars["id"]
	if len(categoriesIdStr) < 1 {
		http.Error(w, "Missing id param", http.StatusBadRequest)
		return
	}
	categoriesId, err := strconv.Atoi(categoriesIdStr)
	if err != nil {
		http.Error(w, "Invalid category id", http.StatusBadRequest)
		return
	}
	var bpo = bodyParamsHandle.BodyParamObj{}
	bpo, err = bodyParamsHandle.GetBodyParamsObj(r)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	if valid := bpo.Name != "" || bpo.Parent > 0; !valid {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}

	//reminder: support dynamic db context with session
	userScopedQuery := userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.CategoriesTable).Session(&gorm.Session{})

	resObj := checkchange.CheckChange(categoriesId, bpo, userScopedQuery)
	if !resObj.Success {
		http.Error(w, resObj.Msg, resObj.Status)
		return
	}

	var res *gorm.DB

	updateFields := map[string]interface{}{}

	if bpo.Name != "" {
		updateFields["category"] = bpo.Name
	}
	if bpo.Parent != 0 {
		updateFields["parent"] = bpo.Parent
	}

	res = userScopedQuery.Where("id = ?", categoriesId).Updates(updateFields)
	if res.Error != nil {
		http.Error(w, "Failed to update category: "+res.Error.Error(), http.StatusInternalServerError)
		return
	}

	if res.RowsAffected == 0 {
		http.Error(w, "No changes made to category", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updateFields); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
