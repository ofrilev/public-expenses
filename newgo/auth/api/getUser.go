package api

import (
	"auth/dbModels"
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type userResponse struct {
	Users      []dbModels.User     `json:"users"`
	Pagination dbModels.Pagination `json:"pagination"`
}

func GetUserByUserName(email string) dbModels.User {
	var usr userResponse
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/users?email=%v", serverdomain, email), bytes.NewBuffer([]byte{}))
	req.Header.Add("X-Auth-Token", AuthToken)
	if err != nil {
		return dbModels.User{}
	}
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err.Error())
		return dbModels.User{}
	}
	err = json.NewDecoder(res.Body).Decode(&usr)
	if err != nil {
		log.Println(err.Error())
		return dbModels.User{}
	}
	return usr.Users[0]
}
