package api

import "os"

var AuthToken = os.Getenv("auth_token")
var serverdomain = os.Getenv("API_SERVICE_URL")
