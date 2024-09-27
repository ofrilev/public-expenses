package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	gormdbmodule "newgo/gormDbModule"
	clientModels "newgo/server/handlers/models"
	userscope "newgo/server/handlers/utils/userScope"
)

func GetDefaultCategories(w http.ResponseWriter, r *http.Request) {
	var categories []clientModels.ClientCategories

	//get admign id
	userid := 1

	err := userscope.UserScopedQuery(gormdbmodule.DB, userid, "categories").Find(&categories).Error
	if err != nil {
		http.Error(w, "Failed to get categories", http.StatusInternalServerError)
		log.Printf("Failed to get categories: %v", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}
