package token

import (
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenAccessToken(c jwt.Claims) (string, error) {
	claims := c.(jwt.MapClaims)
	userID, ok := claims["userid"]
	if !ok {
		return "", fmt.Errorf("userid not found in claims")
	}
	token := jwt.New(jwt.SigningMethodHS256)
	newClaims := token.Claims.(jwt.MapClaims)
	newClaims["userid"] = userID
	newClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()

	t, err := token.SignedString([]byte(os.Getenv("token_secret")))
	if err != nil {
		return "", err
	}

	return t, nil
}
