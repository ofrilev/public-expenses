package getmonthlyprogress

import (
	"newgo/dbModels"
	gormdbmodule "newgo/gormDbModule"
	userscope "newgo/server/handlers/utils/userScope"
	"time"
)

func GetCurrentAmount(d time.Time, c int, userid int) int {
	var ex = []dbModels.Expense{}
	var s = 0
	userscope.UserScopedQuery(gormdbmodule.DB, userid, dbModels.TableNames.ExpensesTable).Where("date >= ? AND category = ?", d, c).Find(&ex)
	for _, e := range ex {
		s += e.Amount
	}
	return s
}
