package userscope

import "net/http"

func UserIdFromCtx(r *http.Request) int {
	userIDValue := r.Context().Value("user_id")
	// Type assert the value to the expected type (string in this case)
	uid, ok := userIDValue.(int)
	if !ok {
		return 0
	}
	return uid
}
