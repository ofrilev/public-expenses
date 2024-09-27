package getmonthlyprogress

import (
	"newgo/server/handlers/models/pagination"
)

type MonthlyProgress struct {
	Id            int    `json:"id"`
	Category      int    `json:"category"`
	Amount        int    `json:"amount"`
	Date          string `json:"date"`
	GoalAmount    int    `json:"goal_amount"`
	CurrentAmount int    `json:"currentAmount"`
}
type ResObject struct {
	MonthlyProgress map[string][]map[string]interface{} `json:"monthly_progress"`
	Pagination      pagination.Pagination               `json:"pagination"`
}
