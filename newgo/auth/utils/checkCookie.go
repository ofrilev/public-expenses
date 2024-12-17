package utils

import (
	"net/http"
	"time"
)

func CheckCookie(r *http.Request) (bool, string) {
	c, err := r.Cookie("authToken")
	if err != nil {
		return false, ""
	}
	if c.Expires.After(time.Now()) {
		return false, ""
	}
	return true, c.Value
}
