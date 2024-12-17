package handlers

import (

	"net/http"
	"newgo/auth/utils"
)

func IsUserAuthenticate(w http.ResponseWriter, r *http.Request) {
	b := utils.IsAuthenticated(w,r)
	if b{
		w.WriteHeader(http.StatusAccepted)
	}else{
		w.WriteHeader(http.StatusForbidden)
	}
}