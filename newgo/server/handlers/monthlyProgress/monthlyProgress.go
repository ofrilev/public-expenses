package monthlyprogress

import (
	"net/http"
	deletemonthlyprogress "server/handlers/monthlyProgress/deleteMonthlyProgress"
	getmonthlyprogress "server/handlers/monthlyProgress/getMonthlyProgress"
	postmonthlyprogress "server/handlers/monthlyProgress/postMonthlyProgress"
	putmonthlyprogress "server/handlers/monthlyProgress/putMonthlyProgress"
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
