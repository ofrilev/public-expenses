package auth

import (
	"encoding/hex"
	"encoding/json"
	"log"
	"newgo/dbModels"
)

func DecodeUserHex(s string) (dbModels.User, error) {
	data, err := hex.DecodeString(s)
	if err != nil {
		log.Printf("Failed to decode str with err %v", err)
		return dbModels.User{}, err
	}
	var user dbModels.User
	err = json.Unmarshal(data, &user)
	if err != nil {
		log.Printf("Failed to unmarshal data with err %v", err)
		return dbModels.User{}, err
	}
	return user, nil
}
