package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	gormdbmodule "newgo/gormDbModule"
	handlers "newgo/quizServer/handlers"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
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
func server(r *mux.Router) {
	r.HandleFunc("/categories/default", handlers.GetDefaultCategories).Methods("GET")
	// r.Handle("/categories", handlers.UpdateCategories).Methods("POST")
	// r.Handle("/excelFiles").Methods("POST")
}
func main() {
	r := mux.NewRouter()
	corsM := corsMiddleware(r)
	gormdbmodule.Init()
	server(r)
	fmt.Println("Server is running on port 8083...")
	log.Fatal(http.ListenAndServe(":8083", corsM))
}
