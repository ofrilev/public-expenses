package token

import (
	"auth/dbModels"
	"os"
	"time"
	"github.com/dgrijalva/jwt-go"
)

func GenTokenPair(user dbModels.User) (map[string]string, error) {
	// Create access token
	accessToken := jwt.New(jwt.SigningMethodHS256)
	accessClaims := accessToken.Claims.(jwt.MapClaims)
	accessClaims["userid"] = user.Userid
	accessClaims["exp"] = time.Now().Add(time.Minute * 15).Unix()

	// Sign the access token
	t, err := accessToken.SignedString([]byte(os.Getenv("token_secret")))
	if err != nil {
		return nil, err
	}

	// Create refresh token
	refreshToken := jwt.New(jwt.SigningMethodHS256)
	rtClaims := refreshToken.Claims.(jwt.MapClaims)
	rtClaims["userid"] = user.Userid
	rtClaims["exp"] = time.Now().Add(time.Hour * 24 * 30).Unix()

	// Sign the refresh token
	rt, err := refreshToken.SignedString([]byte(os.Getenv("token_secret")))
	if err != nil {
		return nil, err
	}

	return map[string]string{
		"access_token":  t,
		"refresh_token": rt,
	}, nil
}
