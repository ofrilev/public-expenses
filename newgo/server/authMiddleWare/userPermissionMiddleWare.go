package authmiddleWare

import (
	"net/http"
	"newgo/dbModels"
	userscope "newgo/server/handlers/utils/userScope"
)

const ScraperToken = os.Getenv("scraper_token")
func UserPermissionMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if the request is coming from the scraper
		if token := r.Header.Get("X-Scraper-Token"); token != "" {
			if token != ScraperToken {
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}
		} else {
			// u, err := getUserFromUserDataCookie(r)
			// if err != nil {
				// http.Error(w, "InternalError", http.StatusInternalServerError)
				// log.Printf("%e", err)
				// return
			// }
			user_id := userscope.UserIdFromCtx(r)
			var u dbModels.User
			u.Userid = user_id
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
