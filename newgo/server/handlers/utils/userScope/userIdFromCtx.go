package userscope

import (
	// "context"
	"net/http"
	"strconv"
)

func UserIdFromCtx(r *http.Request) int {
	// userIDValue := r.Context().Value("user_id")
	// // Type assert the value to the expected type (string in this case)
	// uid, ok := userIDValue.(int)
	// if !ok {
	// 	return 0
	// }
	// return uid
	userIDHeader := r.Header.Get("X-User-ID")
    if userIDHeader != "" {
        userID, err := strconv.Atoi(userIDHeader)
        if err == nil {
            // ctx := context.WithValue(r.Context(), "user_id", userID)
            // return r.WithContext(ctx)
			return userID
        }
    }
    return 0
}
