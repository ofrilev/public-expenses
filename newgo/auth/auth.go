package main

import (
	"log"
	"net/http"
	"newgo/auth/handlers"
	gormdbmodule "newgo/gormDbModule"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	gormdbmodule.Init()
	r := http.NewServeMux()
	r.HandleFunc("/login", handlers.LoginUser)
	r.HandleFunc("/registration", handlers.RegisterUser)
	r.HandleFunc("/is-user-authenticate", handlers.IsUserAuthenticate)
	r.HandleFunc("/access-token", handlers.MakeNewAccessToken)

	// Start the API Gateway
	log.Println("API Gateway running on http://localhost:8084")
	log.Fatal(http.ListenAndServe(":8084", corsMiddleware(r)))
}
