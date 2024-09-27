package bodyParamsHandle

import (
	"reflect"
)

func GetFeildsToUpdate(bpo interface{}) map[string]interface{} {
	updateFields := map[string]interface{}{}
	val := reflect.ValueOf(bpo)
	for i := 0; i < val.NumField(); i++ {
		field := val.Type().Field(i)
		value := val.Field(i)
		if !value.IsNil() {
			var valTyped interface{}
			switch value.Elem().Kind() {
			case reflect.String:
				valTyped = string(value.Elem().String())
			case reflect.Int:
				valTyped = int(value.Elem().Int())
			default:
				valTyped = value.Elem().Interface()
			}
			updateFields[field.Tag.Get("json")] = valTyped
		}
	}
	return updateFields
}
