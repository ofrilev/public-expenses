package main

import (
	"fmt"
	"log"
	"net/http"

	gormdbmodule "newgo/gormDbModule"
	authmiddleWare "newgo/server/authMiddleWare"
	"newgo/server/handlers/categories"
	"newgo/server/handlers/expenses"
	monthlyprogress "newgo/server/handlers/monthlyProgress"
	"newgo/server/handlers/users"

	"github.com/gorilla/mux"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8081") // Allow any origin
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
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
func newServer(r *mux.Router) {
	r.HandleFunc("/v1/api/categories", categories.Categories)
	r.HandleFunc("/v1/api/categories/{id:[0-9]*}", categories.Categories)
	r.HandleFunc("/v1/api/expenses", expenses.Expenses)
	r.HandleFunc("/v1/api/expenses/by-business-name", expenses.Expenses)
	r.HandleFunc("/v1/api/expenses/{id:[0-9]*}", expenses.Expenses)
	r.HandleFunc("/v1/api/monthly-progress", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/v1/api/monthly-progress/batch", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/v1/api/monthly-progress/{id:[0-9]*}", monthlyprogress.MonthlyProgress)
	r.Handle("/v1/api/users", authmiddleWare.IsUserAdmin(http.HandlerFunc(users.Users)))
	r.Handle("/v1/api/users/{userid:[0-9]*}", authmiddleWare.IsUserAdmin(http.HandlerFunc(users.Users)))
}
func main() {
	r := mux.NewRouter()
	corsM := corsMiddleware(r)
	r.Use(authmiddleWare.UserPermissionMiddleware)
	r.Use(authmiddleWare.AddUserContextToReqMiddleware)
	gormdbmodule.Init()
	// server(r)
	newServer(r)
	fmt.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsM))

}
