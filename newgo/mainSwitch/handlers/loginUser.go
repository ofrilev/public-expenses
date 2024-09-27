package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"newgo/auth"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
)

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var u dbModels.User
	var su dbModels.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	res := gormdbmodule.DB.First(&su, "email=?", u.Email)
	res.Scan(&su)
	if su.Userid > 0 {
		if CheckPasswordHash(u.Password, su.Password) {
			log.Printf("user:%v. logged in succesfully", u.Email)
			auth.GenCookieToken(su, w)
			auth.GenCookieUserData(su, w)
			http.Redirect(w, r, "/app/", http.StatusSeeOther)
			return
		}
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Wrong password"))
	}
	w.WriteHeader(http.StatusUnauthorized)
	w.Write([]byte("User does not exist"))
}
