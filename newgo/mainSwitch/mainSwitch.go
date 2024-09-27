package main

import (
	"fmt"
	"log"
	"net/http"
	"newgo/auth"
	gormdbmodule "newgo/gormDbModule"
	"newgo/mainSwitch/handlers"
	"os"

	"github.com/gorilla/mux"
)

var appFilePath string
var loginFilePath string
var registrationFilePath string
var loginFSH http.Handler
var appFSH http.Handler
var registrationFSH http.Handler

func first() {
	gormdbmodule.Init()
	appFilePath = os.Getenv("app_file_path")
	loginFilePath = os.Getenv("login_file_path")
	registrationFilePath = os.Getenv("registration_file_path")
	loginFSH = http.FileServer(http.Dir(loginFilePath))
	registrationFSH = http.FileServer(http.Dir(registrationFilePath))
	appFSH = http.FileServer(http.Dir(appFilePath))
	d := http.Dir(appFilePath)
	fmt.Println(d)
}
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
			http.Redirect(w, r, "/login/", http.StatusSeeOther)
			return
		}
		// User is authenticated, serve the next handler
		next.ServeHTTP(w, r)
	})
}

// Other functions like first(), corsMiddleware(), authMiddleware()...

func getLoginHandler(w http.ResponseWriter, r *http.Request) {
	// Serve the login page for GET requests
	// Assuming login page is a static file, adjust the file name as necessary
	http.ServeFile(w, r, loginFilePath+"index.html")
}

func main() {
	gormdbmodule.Init()
	first()
	r := mux.NewRouter()

	// Apply the middleware
	r.Use(corsMiddleware)

	// Create file servers for each path
	appFS := http.FileServer(http.Dir(appFilePath))
	loginFS := http.FileServer(http.Dir(loginFilePath))
	registrationFS := http.FileServer(http.Dir(registrationFilePath))

	// Route requests for GET and POST on /login
	// r.HandleFunc("/login", getLoginHandler).Methods("GET")
	// r.HandleFunc("/login", loginFS.ServeHTTP).Methods("GET")
	r.HandleFunc("/login", handlers.LoginUser).Methods("POST")
	r.HandleFunc("/registration", handlers.RegisterUser).Methods("POST")

	// Serve static files for login, registration, and app with respective middleware
	r.PathPrefix("/app/").Handler(authMiddleware(http.StripPrefix("/app/", appFS)))
	r.PathPrefix("/login/").Handler(http.StripPrefix("/login/", loginFS))
	r.PathPrefix("/registration/").Handler(http.StripPrefix("/registration/", registrationFS))

	// Start the server with the Gorilla Mux router
	log.Println("Server starting on :8081...")
	err := http.ListenAndServe(":8081", r)
	if err != nil {
		log.Fatal(err)
	}
}
