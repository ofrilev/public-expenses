package handlers

// import (
// 	"auth/api"
// 	"auth/dbModels"
// 	"auth/utils"
// 	"encoding/json"
// 	"log"
// 	"net/http"
// )

// func createUserAndRole(user *dbModels.User) error {
// 	// Create the user
// 	result := gormdbmodule.DB.Create(user)
// 	if result.Error != nil {
// 		return result.Error
// 	}

// 	// Create the user role
// 	userRole := dbModels.UserRole{
// 		UserID: user.Userid,
// 		RoleID: 2,
// 	}
// 	result = gormdbmodule.DB.Create(&userRole)
// 	return result.Error
// }

// func RegisterUser(w http.ResponseWriter, r *http.Request) {
// 	var u dbModels.User
// 	err := json.NewDecoder(r.Body).Decode(&u)
// 	if err != nil {
// 		http.Error(w, "Bad params", http.StatusBadRequest)
// 		return
// 	}

// 	if api.GetUser(u.Userid) {
// 		http.Error(w, "There is an existing user with that email", http.StatusForbidden)
// 		return
// 	}

// 	err = utils.HashPassword(&u.Password)
// 	if err != nil {
// 		http.Error(w, "Please try again", http.StatusInternalServerError)
// 		return
// 	}

// 	err = createUserAndRole(&u)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	log.Printf("user:%v mail:%v has registered successfully", u.Name, u.Email)
// 	http.Redirect(w, r, "/login/", http.StatusSeeOther)
// }
