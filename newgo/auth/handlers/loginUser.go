package handlers

import (
	"auth/api"
	"auth/dbModels"
	"auth/token"
	"auth/utils"
	"encoding/json"
	"log"
	"net/http"
)

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var u dbModels.User
	var su dbModels.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	su = api.GetUserByUserName(u.Email)
	if su.Userid > 0 {
		if utils.CheckPasswordHash(u.Password, su.Password) {
			log.Printf("user:%v. logged in succesfully", u.Email)
			tokens, _ := token.GenTokenPair(su)
			token.SetCookies(w, tokens)
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
