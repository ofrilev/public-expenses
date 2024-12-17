package main

import (
	"bytes"
	"fmt"
	"net/http"
)

func isAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Create a new GET request to the authentication service
		var body []byte
		req, err := http.NewRequest("GET", authServiceURL+"/is-user-authenticate", bytes.NewBuffer(body))
		if err != nil {
			http.Error(w, "Failed to create request", http.StatusInternalServerError)
			return
		}

		// Add cookies from the original request to the new request
		cookies := r.Cookies()
		for _, cookie := range cookies {
			req.AddCookie(cookie)
		}

		// Send the request to the authentication service
		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil || res.StatusCode != http.StatusAccepted {
			if err != nil {
				fmt.Println(err)
			}
			// Redirect to the authentication page if the check fails
			http.Redirect(w, r, "/auth/", http.StatusSeeOther)
			return
		}

		// If authenticated, proceed to the next handler
		next.ServeHTTP(w, r)
	})
}
