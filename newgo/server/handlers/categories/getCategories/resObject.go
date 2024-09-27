package getcategories

import "newgo/server/handlers/models/pagination"

type Categories struct {
	Id       int    `json:"id"`
	Category string `json:"category"`
	Parent   string `json:"parent"`
}

type ResObject struct {
	Categories []Categories          `json:"categories"`
	Pagination pagination.Pagination `json:"pagination"`
}
