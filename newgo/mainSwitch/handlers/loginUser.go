package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	auth "newgo/auth/token"
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
			tokens, _ := auth.GenTokenPair(su)
			auth.SetCookies(w, tokens)
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("User logged in succesfully"))
			return
		}
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Wrong password"))
	}
	w.WriteHeader(http.StatusUnauthorized)
	w.Write([]byte("User does not exist"))
}
