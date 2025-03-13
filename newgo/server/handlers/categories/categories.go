package categories

import (
	"net/http"
	deletecategories "server/handlers/categories/deleteCategories"
	getcategories "server/handlers/categories/getCategories"
	postcategories "server/handlers/categories/postCategories"
	putcategories "server/handlers/categories/putCategories"
)

func Categories(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getcategories.GetCategories(w, r)
	case "PUT":
		putcategories.PutCategories(w, r)
	case "POST":
		postcategories.PostCategories(w, r)
	case "DELETE":
		deletecategories.DeleteCategories(w, r)
	}
}
