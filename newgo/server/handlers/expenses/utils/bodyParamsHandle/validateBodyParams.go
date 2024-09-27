package bodyParamsHandle

import (
	"net/http"
	"strconv"
	"strings"
)

func ValidateBodyParams(bpo BodyParamObj) ResultObj {
	if bpo.Date != nil {
		parts := strings.Split(*bpo.Date, "/")
		if len(parts) != 3 {
			return ResultObj{false, "invalid date: date must be in format yyyy/mm/dd", http.StatusBadRequest}
		}
		year, day, month := parts[0], parts[1], parts[2]
		if len(day) != 2 || len(month) != 2 || len(year) != 4 {
			return ResultObj{false, "invalid date: date must be in format yyyy/mm/dd", http.StatusBadRequest}
		}
	}
	if bpo.Category != nil {
		if *bpo.Category <= 0 {
			return ResultObj{false, "invalid category: must be > 0 ", http.StatusBadRequest}
		}
	}
	if bpo.CardNumber != nil {
		strCardNumber := strconv.Itoa(*bpo.CardNumber)
		if len(strCardNumber) != 4 {
			return ResultObj{false, "invalid card number: must be 4 digits", http.StatusBadRequest}
		}
	}
	if bpo.Special != nil {
		if *bpo.Special != 0 && *bpo.Special != 1 {
			return ResultObj{false, "invalid special flag: must be 0 or 1", http.StatusBadRequest}
		}
	}
	return ResultObj{true, "", http.StatusOK}
}
