package users

import (
	"net/http"
	getusers "server/handlers/users/getUsers"
)

func Users(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getusers.GetUsers(w, r)
		// case "PUT":
		// putusers.PutUsers(w, r)
		// case "POST":
		// postusers.PostUsers(w, r)
		// case "DELETE":
		// deleteusers.DeleteUsers(w, r)
	}
}
