package pagination

import (
	"errors"
	"net/url"

	rqp "github.com/timsolov/rest-query-parser"
)

func QueryParamsValidationsWithPagination(u url.Values, v rqp.Validations) (*rqp.Query, error) {
	v["page:int"] = func(value interface{}) error {
		page, ok := value.(int)
		if !ok || page < 1 {
			return errors.New("page must be greater than 0")
		}
		return nil
	}
	v["page_size:int"] = func(value interface{}) error {
		pageSize, ok := value.(int)
		if !ok || pageSize < 1 {
			return errors.New("page_size must be greater than 0")
		}
		return nil
	}
	return rqp.NewParse(u, v)
}
