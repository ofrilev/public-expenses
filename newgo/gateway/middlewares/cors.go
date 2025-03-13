package middlewares

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// CORSMiddleware adds CORS headers to allow cross-origin requests
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Add CORS headers
		AddCORSHeaders(w, r)

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}

// addCORSHeaders adds the necessary CORS headers to the response
func AddCORSHeaders(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")

	// Get allowed origins from environment
	allowedOrigins := getEnvOrDefault("ALLOWED_ORIGINS", "http://localhost:5173,http://expensify:5173,http://localhost:5174,http://expensify:5174")

	// Check if we're in development mode
	devMode, _ := strconv.ParseBool(getEnvOrDefault("DEV_MODE", "false"))

	// In development mode, or if the origin is in our allowed list, set CORS headers
	if devMode || isAllowedOrigin(origin, allowedOrigins) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, X-CSRF-Token")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Max-Age", "3600")

		if devMode {
			log.Printf("CORS: Added headers for origin: %s", origin)
		}
	} else if devMode {
		log.Printf("CORS: Origin not allowed: %s", origin)
	}
}

// isAllowedOrigin checks if the origin is in the list of allowed origins
func isAllowedOrigin(origin, allowedOrigins string) bool {
	if origin == "" {
		return false
	}

	origins := strings.Split(allowedOrigins, ",")
	for _, allowed := range origins {
		if strings.TrimSpace(allowed) == origin {
			return true
		}
	}

	return false
}
func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return defaultValue
}
