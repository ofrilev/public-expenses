package authmiddleWare

import (
	"log"
	"net/http"
)

const ScraperToken = "R!dhkuwvN27$HeVhjdfJ4jD2Fk8XgzG9"

func UserPermissionMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if the request is coming from the scraper
		if token := r.Header.Get("X-Scraper-Token"); token != "" {
			if token != ScraperToken {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		} else {
			u, err := getUserFromUserDataCookie(r)
			if err != nil {
				http.Error(w, "InternalError", http.StatusInternalServerError)
				log.Printf("%e", err)
				return
			}

			// If the user does not have permission
			if !UserHasApiPermission(u) {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		}
		// User has permission, continue to the next handler
		next.ServeHTTP(w, r)
	})
}
