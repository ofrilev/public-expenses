package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"github.com/joho/godotenv"
)

var authFilePath string
var appFilePath string
var apiServiceURL = "http://localhost:8082"
var authServiceURL = "http://localhost:8084"

// quizServiceURL := "http://localhost:8083"
func initDotEnv() {
	err := godotenv.Load("/Users/ofri.levkowitz/expenses/newgo/.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func first() {
	initDotEnv()
	appFilePath = os.Getenv("app_file_path")
	authFilePath = os.Getenv("auth_file_path")
}

func main() {
	first()
	http.Handle("/auth/", staticFileHandler("/auth/", authFilePath))
	http.Handle("/app/", isAuthenticated(staticFileHandler("/app/", appFilePath)))

	http.Handle("/v1/api/", AddUserContextToReq(http.StripPrefix("/v1/api", proxyHandler(apiServiceURL))))
	http.Handle("/auth/api/", http.StripPrefix("/auth/api", proxyHandler(authServiceURL)))

	log.Println("Gateway running on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Failed to start gateway: %v", err)
	}
}

// ProxyHandler proxies requests to the target service
func proxyHandler(target string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		targetURL, err := url.Parse(target)
		if err != nil {
			http.Error(w, "Invalid target URL", http.StatusInternalServerError)
			return
		}

		proxy := httputil.NewSingleHostReverseProxy(targetURL)
		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
			http.Error(w, "Service unavailable", http.StatusBadGateway)
		}
		proxy.ServeHTTP(w, r)
	}
}

func staticFileHandler(prefix string, root string) http.HandlerFunc {
	fs := http.FileServer(http.Dir(root)) // Static file server
	return func(w http.ResponseWriter, r *http.Request) {
		// Strip the prefix to get the relative file path
		relativePath := r.URL.Path[len(prefix):]
		filePath := root + relativePath

		// Check if the request matches a static file
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			// Fallback only for non-asset paths
			if !isStaticAsset(relativePath) {
				http.ServeFile(w, r, root+"/index.html")
				return
			}
		}

		// Serve the static file if it exists
		http.StripPrefix(prefix, fs).ServeHTTP(w, r)
	}
}

// isStaticAsset checks if the requested path is for a static asset
func isStaticAsset(path string) bool {
	staticExtensions := []string{".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}
	for _, ext := range staticExtensions {
		if len(path) > len(ext) && path[len(path)-len(ext):] == ext {
			return true
		}
	}
	return false
}
