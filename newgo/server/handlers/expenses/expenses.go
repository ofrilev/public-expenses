package expenses

import (
	"net/http"
	deleteexpenses "newgo/server/handlers/expenses/deleteExpenses"
	getexpenses "newgo/server/handlers/expenses/getExpenses"
	postexpenses "newgo/server/handlers/expenses/postExpenses"
	putexpenses "newgo/server/handlers/expenses/putExpenses"
	putexpensesbybusinessname "newgo/server/handlers/expenses/putExpensesByBusinessName"
)

func Expenses(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getexpenses.GetExpenses(w, r)
	case "PUT":
		if r.URL.Path == "/expenses/by-business-name" {
			putexpensesbybusinessname.PutExpensesByBusinessName(w, r)
		}else{
			putexpenses.PutExpenses(w, r)
		}
		putexpenses.PutExpenses(w, r)
	case "POST":
		postexpenses.PostExpenses(w, r)
	case "DELETE":
		deleteexpenses.DeleteExpenses(w, r)
	}
}
