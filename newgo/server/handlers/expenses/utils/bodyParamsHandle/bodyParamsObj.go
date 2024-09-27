package bodyParamsHandle

type BodyParamObj struct {
	BusinessName *string `json:"business_name"`
	Amount       *int    `json:"amount"`
	Date         *string `json:"date"`
	Category     *int    `json:"category"`
	CardNumber   *int    `json:"card_number"`
	Special      *int    `json:"special"`
}
