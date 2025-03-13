package main

import (
	"log"
	"net/http"
	gormdbmodule "server/gormDbModule"
	"server/handlers/categories"
	"server/handlers/expenses"
	monthlyprogress "server/handlers/monthlyProgress"
	"server/handlers/users"
	"server/middlewares"
	authMiddlewares "server/middlewares/auth"
	"github.com/gorilla/mux"
)

func server(r *mux.Router) {
	r.HandleFunc("/categories", categories.Categories)
	r.HandleFunc("/categories/{id:[0-9]*}", categories.Categories)
	r.HandleFunc("/expenses", expenses.Expenses)
	r.HandleFunc("/expenses/by-business-name", expenses.Expenses)
	r.HandleFunc("/expenses/{id:[0-9]*}", expenses.Expenses)
	r.HandleFunc("/monthly-progress", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/monthly-progress/batch", monthlyprogress.MonthlyProgress)
	r.HandleFunc("/monthly-progress/{id:[0-9]*}", monthlyprogress.MonthlyProgress)
	r.Handle("/users", authMiddlewares.IsAuthService(http.HandlerFunc(users.Users)))
	r.Handle("/users/{userid:[0-9]*}", authMiddlewares.IsAuthService(http.HandlerFunc(users.Users)))

}
func main() {
	r := mux.NewRouter()
	gormdbmodule.Init()
	server(r)
	log.Println("Server running on api.expensify:8082")
	log.Fatal(http.ListenAndServe("api.expensify:8082", middlewares.CorsMiddleware(r)))
}
