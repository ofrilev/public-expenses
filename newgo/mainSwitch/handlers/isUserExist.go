package handlers

import (
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
)

func IsUserExist(u dbModels.User) bool {
	res := gormdbmodule.DB.First(&u, "email=? ", u.Email)
	res.Scan(&u)
	return u.Userid > 0
}
