package authmiddleWare

import (
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
)

func UserHasApiPermission(u dbModels.User) bool {
	var tu dbModels.User
	res := gormdbmodule.DB.Find(&tu, "userId=?", u.Userid)
	res.Scan(&tu)
	if tu.Userid > 0 {
		if tu.Name == u.Name {
			n := checkUserRole(u.Userid)
			//1 for adming 2 for guest
			if n > 0 {
				return true
			}

		}
	}
	return false
}
func checkUserRole(uid int) int {
	var ur dbModels.UserRole
	res := gormdbmodule.DB.Find(&ur, "userId=?", uid)
	res.Scan(&ur)
	return ur.RoleID
}
