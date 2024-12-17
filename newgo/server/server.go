package main

import (
	"fmt"
	"log"
	"net/http"
	gormdbmodule "newgo/gormDbModule"
	// authmiddleWare "newgo/server/authMiddleWare"
	"newgo/server/handlers/categories"
	"newgo/server/handlers/expenses"
	monthlyprogress "newgo/server/handlers/monthlyProgress"
	// "newgo/server/handlers/users"
	"github.com/gorilla/mux"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		// Allow two origins for production and dev mode
		if origin == "http://localhost:8081" || origin == "http://localhost:8080" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true") // Allow cookies and credentials
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}
func newServer(r *mux.Router) {
	r.HandleFunc("/categories", categories.Categories)
	r.HandleFunc("/categories/{id:[0-9]*}", categories.Categories)
	r.HandleFunc("/expenses", expenses.Expenses)
	r.HandleFunc("/expenses/by-business-name", expenses.Expenses)
	r.HandleFunc("/expenses/{id:[0-9]*}", expenses.Expenses)
	r.HandleFunc("/monthly-progress", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/monthly-progress/batch", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/monthly-progress/{id:[0-9]*}", monthlyprogress.MonthlyProgress)
	// r.Handle("/users", authmiddleWare.IsAllowed(http.HandlerFunc(users.Users)))
	// r.Handle("/users/{userid:[0-9]*}", authmiddleWare.IsAllowed(http.HandlerFunc(users.Users)))
}
func main() {
	r := mux.NewRouter()
	// r.Use(authmiddleWare.UserPermissionMiddleware)
	corsM := corsMiddleware(r)
	// r.Use(authmiddleWare.AddUserContextToReqMiddleware)
	gormdbmodule.Init()
	newServer(r)
	fmt.Println("Server is running on port 8082...")
	log.Fatal(http.ListenAndServe(":8082", corsM))
}
