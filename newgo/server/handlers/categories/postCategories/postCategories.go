package postcategories

import (
	"encoding/json"
	"gorm.io/gorm"
	"log"
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	"newgo/server/handlers/categories/utils/bodyParamsHandle"
	userscope "newgo/server/handlers/utils/userScope"
)

func PostCategories(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Failed to parse form", http.StatusInternalServerError)
		return
	}
	user_id := userscope.UserIdFromCtx(r)
	if user_id == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}

	bpo, err := bodyParamsHandle.GetBodyParamsObj(r)
	if err != nil {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}
	// validate body params
	if valid := bpo.Name != "" && bpo.Parent > -1; !valid {
		http.Error(w, "Invalid body params", http.StatusBadRequest)
		return
	}

	userScopedQuery := userscope.UserScopedQuery(gormdbmodule.DB, user_id, dbModels.TableNames.CategoriesTable).Session(&gorm.Session{})

	respondseObj := CheckCreate(bpo, userScopedQuery)

	if !respondseObj.Success {
		http.Error(w, respondseObj.Msg, respondseObj.Status)
		return
	}

	var newCategory = dbModels.Category{Category: bpo.Name, ParentID: bpo.Parent, UserId: user_id}

	var res *gorm.DB

	if bpo.Parent == 0 {
		res = userScopedQuery.Debug().Omit("parent").Create(&newCategory)
	} else {
		res = userScopedQuery.Debug().Create(&newCategory)
	}
	if res.Error != nil || res.RowsAffected == 0 {
		log.Printf("Failed to create category with err: %v", res.Error)
		http.Error(w, "Failed to create category", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(newCategory.ID); err != nil {
		http.Error(w, "Failed to encode results", http.StatusInternalServerError)
	}
}
