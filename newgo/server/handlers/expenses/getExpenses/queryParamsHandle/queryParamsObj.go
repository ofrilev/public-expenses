package queryParamshandle

type queryParams struct {
	BusinessName string
	Category     string
	Amount       string
	Date         string
	Special      string
	CardNumber   string
}

var QueryParamsNames = &queryParams{
	BusinessName: "business_name",
	Category:     "category",
	Amount:       "amount",
	Date:         "date",
	Special:      "special",
	CardNumber:   "card_number"}
