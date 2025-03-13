package dbutils

import "os"

const baseURL = "http://localhost:8082"
var ScraperToken = os.Getenv("scraper_token")
