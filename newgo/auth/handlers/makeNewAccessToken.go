package handlers

import (
	"encoding/json"
	"net/http"
	"auth/token"
)

func MakeNewAccessToken(w http.ResponseWriter, r *http.Request) {
	var refresh_token map[string]string
	err := json.NewDecoder(r.Body).Decode(&refresh_token)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	claims, err := token.CheckToken(refresh_token["refreshToken"])
	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	ts,err := token.GenAccessToken(claims)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(ts))
}