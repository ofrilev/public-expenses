package utils

import (
	"net/http"
	auth "newgo/auth/token"
	"time"
)

func IsAuthenticated(w http.ResponseWriter, r *http.Request) bool {
	// acessTokenString := r.Header.Get("Authorization")
	accessTokenCookie, err := r.Cookie("accessToken")
	if err == nil {
		_, err = auth.CheckToken(accessTokenCookie.Value)
	}
	if err != nil {
		refreshTokenCookie, err := r.Cookie("refreshToken")
		if err != nil {
			return false
		}
		if refreshTokenCookie.Expires.After(time.Now()) {
			return false
		}
		claims, err := auth.CheckToken(refreshTokenCookie.Value)
		if err != nil {
			return false
		}
		ts, err := auth.GenAccessToken(claims)
		if err != nil {
			return false
		}
		accessTokenCookie := http.Cookie{
			Name:     "accessToken",
			Value:    ts,
			Expires:  time.Now().Add(15 * time.Minute), // Set the expiration time
			SameSite: http.SameSiteNoneMode,             // Set same site for strict
			HttpOnly: true,                             // HttpOnly to prevent XSS attacks
			Secure:   false,                            // Secure, if you are using HTTPS
			Path:     "/",                              // Path for which the cookie is valid
			// SameSite: http.SameSiteStrictMode, // Optionally, set SameSite attribute if needed
		}

		// Set the cookie in the response
		http.SetCookie(w, &accessTokenCookie)
	}
	return true

}
