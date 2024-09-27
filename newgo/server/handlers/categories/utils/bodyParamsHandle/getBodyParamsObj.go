package bodyParamsHandle

import (
	"encoding/json"
	"net/http"
	"strconv"
)

func GetBodyParamsObj(r *http.Request) (BodyParamObj, error) {
	var bodyParamObj BodyParamObj
	err := json.NewDecoder(r.Body).Decode(&bodyParamObj)
	if err != nil {
		return bodyParamObj, err
	}
	var parentStr = r.Form.Get("parent")
	if parentStr != "" {
		bodyParamObj.Parent, err = strconv.Atoi(parentStr)
		if err != nil {
			return bodyParamObj, err
		}
	}
	return bodyParamObj, nil
}
