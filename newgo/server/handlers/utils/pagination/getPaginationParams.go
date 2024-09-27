package pagination

import (
	rqp "github.com/timsolov/rest-query-parser"
)

func GetPageAndPageSize(q *rqp.Query) (int, int) {
	var page, pageSize = 1, 10
	var pageFilter, err1 = q.GetFilter("page")
	if err1 == nil {
		page = pageFilter.Value.(int)
	}
	var pageSizeFilter, err2 = q.GetFilter("page_size")
	if err2 == nil {
		pageSize = pageSizeFilter.Value.(int)
	}
	return page, pageSize
}
