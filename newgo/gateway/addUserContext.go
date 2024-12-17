package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	auth "newgo/auth/token"

	"github.com/dgrijalva/jwt-go"
)

// LocksMap is a concurrent map to store locks for each userID
var LocksMap sync.Map

// getUserLock retrieves or creates a lock for a specific userID
func getUserLock(userID float64) *sync.Mutex {
	lock, _ := LocksMap.LoadOrStore(userID, &sync.Mutex{})
	return lock.(*sync.Mutex)
}

// extractUserID extracts the "userid" from the JWT claims
func extractUserID(claims jwt.MapClaims) (float64, error) {
	// Extract "userid" from claims
	userIDValue, ok := claims["userid"]
	if !ok {
		return 0, fmt.Errorf("userID not found in claims")
	}
	userIDInt, ok := userIDValue.(float64)
	if !ok {
		return 0, fmt.Errorf("userID is not a valid number")
	}

	// Convert to int if required

	return userIDInt, nil
}

// AddUserContextToReq middleware extracts the user ID from the token,
// adds it to the request context, and ensures per-user locking.
func AddUserContextToReq(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Try to get the access token from the cookie
		accessTokenCookie, err := r.Cookie("accessToken")
		var token string

		// If access token is missing or expired, attempt to refresh it using the refresh token
		if err != nil || accessTokenCookie.Value == "" {
			// Try to get the refresh token from the cookie
			refreshTokenCookie, err := r.Cookie("refreshToken")
			if err != nil || refreshTokenCookie.Value == "" {
				// If both cookies are missing, respond with 401 Unauthorized
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			// If refresh token is present, attempt to get a new access token
			token, err = getNewAccessToken(refreshTokenCookie.Value)
			if err != nil {
				// If getting a new access token fails, respond with 401 Unauthorized
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			// Set the new access token in the response cookies (optional)
			http.SetCookie(w, &http.Cookie{
				Name:     "accessToken",
				Value:    token,
				Expires:  time.Now().Add(15 * time.Minute), // Expiration time
				SameSite: http.SameSiteNoneMode,            // SameSite for stricter security
				HttpOnly: true,                             // Prevents access via JavaScript
				Secure:   false,                            // Set to true if using HTTPS
				Path:     "/",
			})
		} else {
			// Use the access token if it's already available
			token = accessTokenCookie.Value
		}

		// Validate the access token
		claims, err := auth.CheckToken(token)
		if err != nil {
			// If token validation fails, respond with 401 Unauthorized
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Extract user ID from the claims
		userID, err := extractUserID(claims)
		if err != nil {
			// If there is an issue extracting user ID
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Lock the user's specific mutex
		userLock := getUserLock(userID)
		userLock.Lock()
		defer userLock.Unlock()

		// Add the user ID to the request header or context
		r.Header.Set("X-User-ID", fmt.Sprintf("%.0f", userID))
		// Uncomment if you prefer to use context instead of headers
		// ctx := context.WithValue(r.Context(), "user_id", userID)
		// r = r.WithContext(ctx)

		// Proceed to the next handler
		next.ServeHTTP(w, r)
	})
}
