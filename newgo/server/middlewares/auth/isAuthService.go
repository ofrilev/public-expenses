package authMiddlewares

import (
	"net/http"
	"os"
)

var AuthToken = os.Getenv("auth_token")

func IsAuthService(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if the request is coming from the scraper
		token := r.Header.Get("X-Auth-Token")
		if token != AuthToken {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		} else {
			next.ServeHTTP(w, r)
		}
	})
}
