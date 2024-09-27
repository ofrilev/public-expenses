package bodyparamhandle

type BodyParamObj struct {
	Amount   *int    `json:"amount"`
	Category *int    `json:"category"`
	Date     *string `json:"date"`
}

type BodyParamBatchObj struct {
	ID       *int    `json:"id"`
	Amount   *int    `json:"amount"`
	Category *int    `json:"category"`
	Date     *string `json:"date"`
}
