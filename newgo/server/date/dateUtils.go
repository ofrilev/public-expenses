package date

import (
	"log"
	"time"
)

var dateToday = time.Now()

func TryParseDate(s, layout string) (time.Time, error) {
	// Parsing the date string
	t, err := time.Parse(layout, s)
	if err != nil {
		log.Printf("Failed tom parse date:%s with err:%v", s, err)
		return time.Time{}, err
	}
	return t, nil
}
func ParseDateToStrORNil(date time.Time, layout string) *string {
	if date.IsZero() {
		return nil
	} else {
		var s = date.Format(layout)
		return &s
	}
}
