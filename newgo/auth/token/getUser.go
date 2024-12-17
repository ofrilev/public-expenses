package token

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"newgo/dbModels"
)

type userResponse struct {
	User dbModels.User `json:"user"`
}

const InnerServiceToken = "g#37RCotL7PfgWK!C7&Z%@ZjF!Yl4nM74Ua5s53FM"

func GetUser(userid int) dbModels.User {
	var usr userResponse
	req, err := http.NewRequest("GET", fmt.Sprintf("http://localhost:8082/users/?userid=%v", userid), bytes.NewBuffer([]byte{}))
	req.Header.Add("Inner-Service-Token", InnerServiceToken)
	if err != nil {
		return dbModels.User{}
	}
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Println(err.Error())
		return dbModels.User{}
	}
	err = json.NewDecoder(res.Body).Decode(&res)
	if err != nil {
		log.Println(err.Error())
		return dbModels.User{}
	}
	return usr.User
}
