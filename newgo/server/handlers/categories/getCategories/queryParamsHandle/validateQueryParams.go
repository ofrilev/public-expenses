package queryParamshandle

// ValidateQueryParams validates the QueryParamsObj and returns a boolean indicating if all parameters are valid.
func ValidateQueryParams(querParamsObj *QueryParamsObj) bool {
	if querParamsObj.Id < 0 {
		return false
	}
	if querParamsObj.Parent < 0 {
		return false
	}
	//todo: think about some restrictions about the name and validaiton

	return true
}
