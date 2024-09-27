package pagination

import (
	"fmt"
	"newgo/server/handlers/models/pagination"

	rqp "github.com/timsolov/rest-query-parser"
	"gorm.io/gorm"
)

func GetPaginationObj(db *gorm.DB, page int, pageSize int, table string, query *rqp.Query) pagination.Pagination {
	var totalItems int64
	var tx = db.Table(table).Where(query.Where(), query.Args()...).Count(&totalItems)
	if tx.Error != nil {
		fmt.Println("count total itemsError: ", tx.Error)
	}
	return pagination.Pagination{
		TotalItems:  int(totalItems),
		TotalPages:  (int(totalItems) + pageSize - 1) / pageSize,
		CurrentPage: page,
		PageSize:    pageSize,
	}
}
