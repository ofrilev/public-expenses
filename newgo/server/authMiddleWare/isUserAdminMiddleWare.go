package authmiddleWare

import (
	"net/http"
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
)

func IsUserAdmin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		u, err := getUserFromUserDataCookie(r)
		if err != nil {
			http.Error(w, "InternalError", http.StatusInternalServerError)
			return
		}
		var urole = dbModels.UserRole{}
		gormdbmodule.DB.Model(&dbModels.UserRole{}).Where("userid = ?", u.Userid).Find(&urole)
		if urole.RoleID != 1 {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}
