package models

type ClientMonthlyProgress struct {
	ID            int    `json:"id"`
	GoalAmount    int    `json:"goal_amount"`
	Date          string `json:"date"`
	Category      string `json:"category"`
	CurrentAmount int    `json:"currentAmount"`
}
