package monthlyprogress

import (
	"net/http"
	deletemonthlyprogress "newgo/server/handlers/monthlyProgress/deleteMonthlyProgress"
	getmonthlyprogress "newgo/server/handlers/monthlyProgress/getMonthlyProgress"
	postmonthlyprogress "newgo/server/handlers/monthlyProgress/postMonthlyProgress"
	putmonthlyprogress "newgo/server/handlers/monthlyProgress/putMonthlyProgress"
)

func MonthlyProgress(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getmonthlyprogress.GetMonthlyProgress(w, r)
	case "POST":
		postmonthlyprogress.PostMonthlyProgress(w, r)
	case "PUT":
		if r.URL.Path == "/v1/api/monthly-progress/batch" {
			putmonthlyprogress.PutMonthlyProgressBatch(w, r)
		} else {
			putmonthlyprogress.PutMonthlyProgress(w, r)
		}
	case "DELETE":
		deletemonthlyprogress.DeleteMonthlyProgress(w, r)
	}

}
