package token

import (
	"net/http"

	"time"
)

func SetCookies(w http.ResponseWriter, tokens map[string]string) {
	// Create a cookie
	refreshTokenCookie := http.Cookie{
		Name:     "refreshToken",
		Value:    tokens["refresh_token"],
		Expires:  time.Now().Add(72 * time.Hour), // Set the expiration time
		SameSite: http.SameSiteLaxMode,           // Set same site for strict
		HttpOnly: true,                           // HttpOnly to prevent XSS attacks
		Secure:   false,                          // Secure, if you are using HTTPS
		Path:     "/",                            // Path for which the cookie is valid
		// SameSite: http.SameSiteStrictMode, // Optionally, set SameSite attribute if needed
	}
	accessTokenCookie := http.Cookie{
		Name:     "accessToken",
		Value:    tokens["access_token"],
		Expires:  time.Now().Add(15 * time.Minute), // Set the expiration time
		SameSite: http.SameSiteLaxMode,             // Set same site for strict
		HttpOnly: true,                             // HttpOnly to prevent XSS attacks
		Secure:   false,                            // Secure, if you are using HTTPS
		Path:     "/",                              // Path for which the cookie is valid
		// SameSite: http.SameSiteStrictMode, // Optionally, set SameSite attribute if needed
	}

	// Set the cookie in the response
	http.SetCookie(w, &refreshTokenCookie)
	http.SetCookie(w, &accessTokenCookie)
}
