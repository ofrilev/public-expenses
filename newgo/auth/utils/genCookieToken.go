package utils

// import (
// 	"net/http"
// 	"auth/dbModels"
// 	"time"
// )

// func GenCookieToken(u dbModels.User, w http.ResponseWriter) {
// 	// Generate the PASETO token
// 	token, err := GenUserToken(u)
// 	if err != nil {
// 		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
// 		return
// 	}

// 	// Create a cookie
// 	cookie := http.Cookie{
// 		Name:  "authToken", // Name of the cookie
// 		Value: token,
// 		//todo: change here for less than 12 hours!!!
// 		Expires:  time.Now().Add(72 * time.Hour), // Set the expiration time
// 		HttpOnly: true,                           // HttpOnly to prevent XSS attacks
// 		Secure:   false,                          // Secure, if you are using HTTPS
// 		Path:     "/",                            // Path for which the cookie is valid
// 		Raw:      u.Email,
// 		// SameSite: http.SameSiteStrictMode, // Optionally, set SameSite attribute if needed
// 	}

// 	// Set the cookie in the response
// 	http.SetCookie(w, &cookie)

// 	// Inform the client
// 	//    w.Write([]byte("Token set in cookie"))
// }
