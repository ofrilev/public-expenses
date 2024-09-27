package dbutils

type Expense struct {
	ID           int64  `json:"id"`
	BusinessName string `json:"business_name"`
	Amount       int    `json:"amount"`
	Date         string `json:"date"`
	CardNumber   int    `json:"card_number"`
	CategoryID   int    `json:"category"`
	Special      int    `json:"special"`
	UserId       int64  `json:"user_id"`
}

type Pagination struct {
	TotalItems  int `json:"total_items"`
	TotalPages  int `json:"total_pages"`
	CurrentPage int `json:"current_page"`
	PageSize    int `json:"page_size"`
}

type GetExpensesResponse struct {
	Expenses   []Expense  `json:"expenses"`
	Pagination Pagination `json:"pagination"`
}
