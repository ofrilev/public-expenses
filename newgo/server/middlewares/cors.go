package middlewares

import (
	"net/http"
	"os"
	"strings"
)
func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		
		// Get allowed origins from environment variable
		allowedOriginsStr := os.Getenv("ALLOWED_ORIGINS")
		if allowedOriginsStr == "" {
			// Default if not set in environment
			allowedOriginsStr = "http://auth.expensify:8081,http://expensify:8080,http://expensify:5173"
		}
		
		// Split into individual origins
		allowedOrigins := strings.Split(allowedOriginsStr, ",")
		
		// Check if the request origin is in the allowed list
		originAllowed := false
		for _, allowed := range allowedOrigins {
			if strings.TrimSpace(allowed) == origin {
				originAllowed = true
				break
			}
		}
		
		// Set CORS headers if origin is allowed
		if originAllowed {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true") // Allow cookies and credentials
		
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next.ServeHTTP(w, r)
	})
}