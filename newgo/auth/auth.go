package main

import (
	"auth/handlers"
	"auth/middlewares"
	"log"
	"net/http"
)

func main() {
	r := http.NewServeMux()
	r.HandleFunc("/login", handlers.LoginUser)
	// r.HandleFunc("/registration", handlers.RegisterUser)
	r.HandleFunc("/is-user-authenticate", handlers.IsUserAuthenticate)
	r.HandleFunc("/access-token", handlers.MakeNewAccessToken)
	log.Println("Auth running on auth.expensify:8081")
	log.Fatal(http.ListenAndServe("auth.expensify:8081", middlewares.CorsMiddleware(r)))
}
