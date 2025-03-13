package deletecategories

import (
	"net/http"
	"server/dbModels"
	"server/gormDbModule"
	"server/handlers/categories/deleteCategories/checkDelete"
	"server/handlers/utils/userScope"
	"strconv"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func DeleteCategories(w http.ResponseWriter, r *http.Request) {
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
	categoryId, err := strconv.Atoi(categoriesIdStr)
	if err != nil {
		http.Error(w, "Invalid category id", http.StatusBadRequest)
		return
	}
	var userscope = userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.CategoriesTable).Session(&gorm.Session{})

	var resObj = checkdelete.CheckDelete(categoryId, userscope)

	if !resObj.Success {
		http.Error(w, resObj.Msg, resObj.Status)
		return
	}
	var idNum int64
	userscope.Where("id = ?", categoryId).Count(&idNum)
	//is category exist in db
	if idNum == 0 {
		http.Error(w, "Category does not exist", http.StatusNotFound)
		return
	}

	var res = userscope.Where("id = ?", categoryId).Delete(&dbModels.Category{})

	if res.Error != nil || res.RowsAffected == 0 {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
