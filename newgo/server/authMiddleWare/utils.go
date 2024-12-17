package authmiddleWare

// import (
// 	"net/http"
// 	"newgo/auth"
// 	"newgo/dbModels"
// )

// func getUserFromUserDataCookie(r *http.Request) (dbModels.User, error) {
// 	cud, err := r.Cookie("accessToken")
// 	if err != nil {
// 		return dbModels.User{}, err
// 	}
// 	// u, err := auth.DecodeUserHex(cud.Value)
// 	if err != nil {
// 		return dbModels.User{}, err
// 	}
// 	return u, nil
// }

// // func IsScraperTokenValid(t string) bool {

// // }
