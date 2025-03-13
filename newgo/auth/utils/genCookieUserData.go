package utils

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"auth/dbModels"
	"time"
)

func GenCookieUserData(u dbModels.User, w http.ResponseWriter) {
	var mu = u
	mu.Password = ""
	jsonData, err := json.Marshal(mu)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Encode the JSON data to a hex string
	hexString := hex.EncodeToString(jsonData)

	// Create a cookie
	cookie := http.Cookie{
		Name:  "userData", // Name of the cookie
		Value: hexString,
		//todo: change here for less than 12 hours!!!
		Expires:  time.Now().Add(72 * time.Hour), // Set the expiration time
		HttpOnly: true,                           // HttpOnly to prevent XSS attacks
		Secure:   false,                          // Secure, if you are using HTTPS
		Path:     "/",                            // Path for which the cookie is valid
		Raw:      u.Email,
		// SameSite: http.SameSiteStrictMode, // Optionally, set SameSite attribute if needed
	}

	// Set the cookie in the response
	http.SetCookie(w, &cookie)

	// Inform the client
	// w.Write([]byte("Token set in cookie"))
}
