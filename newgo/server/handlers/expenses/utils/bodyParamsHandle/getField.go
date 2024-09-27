package bodyParamsHandle

import "reflect"

func (bpo *BodyParamObj) GetField(field string) interface{} {
	val := reflect.ValueOf(*bpo)
	for i := 0; i < val.NumField(); i++ {
		value := val.Field(i)
		if !value.IsNil() {
			if val.Type().Field(i).Tag.Get("json") == field {
				return val.Field(i).Elem().Interface()
			}
		}
	}
	return nil
}
