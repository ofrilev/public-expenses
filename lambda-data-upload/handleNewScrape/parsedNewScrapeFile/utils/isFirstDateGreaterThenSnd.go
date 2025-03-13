package utils

import (
	"log"
	"newgo/server/date"
	"strings"
	"time"
)

func parseDate(filename string) time.Time {
	parts := strings.Split(filename, "_")
	if len(parts) == 0 {
		log.Fatalf("Invalid filename format: %s", filename)
	}
	dateStr := parts[0]
	dateParts := strings.Split(dateStr, "-")
	if len(dateParts) != 3 {
		log.Fatalf("Invalid date format in filename: %s", filename)
	}
	// Assuming the date format is DD-MM-YYYY
	layout := "02-01-2006" // Go's reference date format
	date, err := date.TryParseDate(dateStr, layout)
	if err != nil {
		log.Fatalf("Failed to parse date: %v", err)
	}
	return date
}
func IsFstFileDateGreaterThenSnd(filename1, filename2 string) bool {
	date1 := parseDate(filename1)
	date2 := parseDate(filename2)
	return date1.After(date2)
}
