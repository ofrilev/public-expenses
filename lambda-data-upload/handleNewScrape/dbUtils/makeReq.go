package dbutils

import (
	"bytes"
	"fmt"
	"net/http"
	"newgo/dbModels"
)

func makeReq(method string, url string, data []byte) (*http.Request, error) {
	var body []byte
	if method == "POST" || method == "PUT" {
		body = data
	}
	req, err := http.NewRequest(method, baseURL+"/"+url, bytes.NewBuffer(body))
	addHeader(req)
	//todo-change that user-d will be given at start of the function
	// req = addUserData(req, 1)
	addUserData(req, 1)
	return req, err
}
func addHeader(r *http.Request) {
	r.Header.Add("X-Scraper-Token", ScraperToken)
}
func addUserData(r *http.Request, userId int) {
	var mu = dbModels.User{Userid: userId}
	// ctx := context.WithValue(r.Context(), "user_id", mu.Userid)
	// return r.WithContext(ctx)
	r.Header.Set("X-User-ID", fmt.Sprintf("%d", mu.Userid))
}
