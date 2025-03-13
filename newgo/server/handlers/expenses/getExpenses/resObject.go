package getexpenses

import (
	"server/handlers/models/pagination"
	"time"
)

type Expenses struct {
	Id           int       `json:"id"`
	Category     int       `json:"category"`
	Amount       int       `json:"amount"`
	Date         time.Time `json:"date"`
	BusinessName string    `json:"business_name"`
	Special      int       `json:"special"`
	CardNumber   int       `json:"card_number"`
}

type ResObject struct {
	Expenses   []map[string]interface{} `json:"expenses"`
	Pagination pagination.Pagination    `json:"pagination"`
}
