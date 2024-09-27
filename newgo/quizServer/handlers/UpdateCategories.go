package handlers

import (
	"encoding/json"
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	userscope "newgo/server/handlers/utils/userScope"
)

func CreateCategories(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close() // Ensure the request body is closed

	var categories []dbModels.Category
	if err := json.NewDecoder(r.Body).Decode(&categories); err != nil {
		http.Error(w, "Error decoding request body: "+err.Error(), http.StatusBadRequest)
		return
	}

	for _, category := range categories {
		if len(category.Category) < 1 {
			http.Error(w, "Missing required parameters in one or more categories", http.StatusBadRequest)
			return
		}
	}

	userid := userscope.UserIdFromCtx(r)
	if userid == 0 {
		http.Error(w, "Failed to get userid from req context", http.StatusInternalServerError)
		return
	}

	// Begin a transaction
	tx := gormdbmodule.DB.Begin()
	if tx.Error != nil {
		http.Error(w, "Failed to start a database transaction: "+tx.Error.Error(), http.StatusInternalServerError)
		return
	}

	for _, category := range categories {
		category.UserId = userid // Associate the category with the user
		if err := tx.Create(&category).Error; err != nil {
			tx.Rollback() // Roll back in case of error
			http.Error(w, "Failed to create category: "+err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if err := tx.Commit().Error; err != nil {
		http.Error(w, "Failed to commit the transaction: "+err.Error(), http.StatusInternalServerError)
		return
	}
}
