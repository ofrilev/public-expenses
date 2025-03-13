package main

import (
	"log"
	"net/http"
	"newgo/auth"
	gormdbmodule "newgo/gormDbModule"
	"newgo/mainSwitch/handlers"
	"os"

	"github.com/gorilla/mux"
)

var appFilePath string
var authFilePath string
var loginFilePath string
var registrationFilePath string
var appFSH http.Handler
var authFSH http.Handler

func first() {
	gormdbmodule.Init()
	appFilePath = os.Getenv("app_file_path")
	authFilePath = os.Getenv("auth_file_path")
	loginFilePath = os.Getenv("login_file_path")
	registrationFilePath = os.Getenv("registration_file_path")
	authFSH = http.FileServer(http.Dir(authFilePath))
	appFSH = http.FileServer(http.Dir(appFilePath))
}
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !auth.IsAuthenticated(w, r) {
			// User is not authenticated, redirect to login
			http.Redirect(w, r, "/auth/", http.StatusSeeOther)
			return
		}
		// User is authenticated, serve the next handler
		next.ServeHTTP(w, r)
	})
}
func main() {
	gormdbmodule.Init()
	first()
	r := mux.NewRouter()

	// Apply the middleware
	r.Use(corsMiddleware)

	// Create file servers for each path
	appFS := http.FileServer(http.Dir(appFilePath))
	authFS := http.FileServer(http.Dir(authFilePath))
	r.HandleFunc("/auth/login", handlers.LoginUser).Methods("POST")
	r.HandleFunc("/auth/registration", handlers.RegisterUser).Methods("POST")

	// Serve static files for login, registration, and app with respective middleware
	r.PathPrefix("/app/").Handler(authMiddleware(http.StripPrefix("/app/", appFS)))
	http.HandleFunc("/app/", func(w http.ResponseWriter, r *http.Request) {
		if _, err := os.Stat(appFilePath + r.URL.Path); os.IsNotExist(err) {
			// Serve index.html for routes that don't match a static file
			http.ServeFile(w, r, appFilePath)
		} else {
			http.FileServer(http.Dir(appFilePath)).ServeHTTP(w, r)
		}
	})
	r.PathPrefix("/auth/").Handler(http.StripPrefix("/auth/", authFS))

	// Start the server with the Gorilla Mux router
	log.Println("Server starting on :8080...")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		log.Fatal(err)
	}
}
