package authmiddleWare

import (
	"context"
	"net/http"
)

func AddUserContextToReqMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// if r.Method != http.MethodOptions {
		u, _ := getUserFromUserDataCookie(r)
		ctx := context.WithValue(r.Context(), "user_id", u.Userid)

		r = r.WithContext(ctx)

		// Call the next handler, which can now access the context data
		// }
		next.ServeHTTP(w, r)
	})
}