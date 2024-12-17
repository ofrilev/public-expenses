package utils

import (
	"encoding/hex"
	"log"
	"newgo/dbModels"
	"time"

	"aidanwoods.dev/go-paseto"
)

func CheckKey(user dbModels.User, signed string) bool {
	var parser paseto.Parser
	publicKeyBytes, err := hex.DecodeString(user.PublicKey)
	if err != nil {
		log.Fatalf("Failed with err:%v", err)
	}
	publicKey, _ := paseto.NewV4AsymmetricPublicKeyFromBytes(publicKeyBytes)
	token, err := parser.ParseV4Public(publicKey, signed, nil)
	if err != nil {
		log.Printf("Failed to auth for user:%v with err:%v", user.Email, err)
		return false
	}
	t, err := token.GetExpiration()
	if time.Now().After(t) {
		return false
		//should be redirected to the log in and assigned new token
	}
	return true
}
