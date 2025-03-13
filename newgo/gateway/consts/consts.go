package consts

import "os"

// Service URLs with environment variable fallbacks
var (
	ApiServiceURL  = GetEnvOrDefault("API_SERVICE_URL", "http://api.expensify:8082")
	AuthServiceURL = GetEnvOrDefault("AUTH_SERVICE_URL", "http://auth.expensify:8081")
)

// getEnvOrDefault retrieves an environment variable or returns a default if not set
func GetEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return defaultValue
}
