package dbutils

import (
	"bytes"
	"encoding/hex"
	"encoding/json"

	"net/http"
	"newgo/dbModels"
	"time"
)

func makeReq(method string, url string, data []byte) (*http.Request, error) {
	var body []byte
	if method == "POST" || method == "PUT" {
		body = data
	}
	req, err := http.NewRequest(method, baseURL+"/"+url, bytes.NewBuffer(body))
	addHeader(req)
	//todo-change that user-d will be given at start of the function
	addUserData(req, 1)
	return req, err
}
func addHeader(r *http.Request) {
	r.Header.Add("X-Scraper-Token", ScraperToken)
}
func addUserData(r *http.Request, userId int) {
	var mu = dbModels.User{Userid: userId}
	jsonData, _ := json.Marshal(mu)
	hexString := hex.EncodeToString(jsonData)
	r.AddCookie(&http.Cookie{
		Name:     "userData",
		Value:    hexString,
		Expires:  time.Now().Add(1 * time.Hour),
		HttpOnly: true,
		Secure:   false,
		Path:     "/",
	})
}
