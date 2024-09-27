package bodyparamhandle

import (
	"net/http"
	bph "newgo/server/handlers/utils/bodyParamsHandle"
	"strings"
)

func ValidateBodyParams(bpo BodyParamObj) bph.ResultObj {
	if bpo.Date != nil {
		parts := strings.Split(*bpo.Date, "/")
		if len(parts) != 3 {
			return bph.ResultObj{false, "invalid date: date must be in format yyyy/mm/dd", http.StatusBadRequest}
		}
		year, day, month := parts[0], parts[1], parts[2]
		if len(day) != 2 || len(month) != 2 || len(year) != 4 {
			return bph.ResultObj{false, "invalid date: date must be in format yyyy/mm/dd", http.StatusBadRequest}
		}
	}
	if bpo.Category != nil {
		if *bpo.Category <= 0 {
			return bph.ResultObj{false, "invalid category: must be > 0 ", http.StatusBadRequest}
		}
	}

	return bph.ResultObj{true, "", http.StatusOK}
}
