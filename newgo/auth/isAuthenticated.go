package auth

import (
	"log"
	"net/http"
	gormdbmodule "newgo/gormDbModule"
	"time"
)

func IsAuthenticated(w http.ResponseWriter, r *http.Request) bool {
	cat, err := r.Cookie("authToken")
	if err != nil {
		return false
	}
	cud, err := r.Cookie("userData")
	if err != nil {
		return false
	}
	if cat.Expires.After(time.Now()) || cud.Expires.After(time.Now()) {
		log.Println("user cookie expierd")
		return false
	}
	u, err := DecodeUserHex(cud.Value)
	if err != nil {
		log.Printf("Failed to decode userData cookie with err %v", err)
		return false
	}
	res := gormdbmodule.DB.Find(&u, "userId=?", u.Userid)
	res.Scan(&u)
	if u.Userid > 0 {
		b, s := CheckCookie(r)
		if b == false {
			GenCookieToken(u, w)
			log.Println("generate new token")
			return true
		} else {
			//should handled with enum
			b := CheckKey(u, s)
			if b == true {
				return true
			}
		}
	}
	return false
}
