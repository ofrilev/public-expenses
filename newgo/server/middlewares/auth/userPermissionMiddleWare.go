package authMiddlewares

import (
	"net/http"
	"os"
	"server/dbModels"
	userscope "server/handlers/utils/userScope"
)

var ScraperToken = os.Getenv("scaper_token")

func UserPermissionMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if the request is coming from the scraper
		if token := r.Header.Get("X-Scraper-Token"); token != "" {
			if token != ScraperToken {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		} else {
			user_id := userscope.UserIdFromCtx(r)
			var u dbModels.User
			u.Userid = user_id
			if !userHasApiPermission(u) {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		}
		// User has permission, continue to the next handler
		next.ServeHTTP(w, r)
	})
}
