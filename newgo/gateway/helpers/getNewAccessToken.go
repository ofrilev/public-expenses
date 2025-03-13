package helpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gateway/consts"
	"io"
	"net/http"
	"strings"
)

// getNewAccessToken makes a request to get a new access token using a refresh token
func GetNewAccessToken(refreshToken string) (string, error) {
	var body []byte
	body, err := json.Marshal(map[string]interface{}{
		"refreshToken": refreshToken,
	})
	if err != nil {
		return "", err
	}

	// Send POST request to get a new access token
	req, err := http.NewRequest("POST", consts.AuthServiceURL+"/access-token", bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != http.StatusCreated {
		return "", fmt.Errorf("failed to get new access token, status code: %v", resp.StatusCode)
	}
	defer resp.Body.Close()

	// Read the response body
	rebody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	// Parse the response to extract the new access token
	responseStr := strings.TrimSpace(string(rebody))
	if responseStr == "" {
		return "", fmt.Errorf("empty response body")
	}

	return responseStr, nil
}
