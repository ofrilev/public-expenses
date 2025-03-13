package postmonthlyprogress

import (
	"server/dbModels"
	"server/gormDbModule"
)

func isProgressExist(mp dbModels.MonthlyProgress) bool {
	var totalItems int64
	gormdbmodule.DB.Table(dbModels.TableNames.MonthlyProgressTable).Where("date = ? AND category = ? AND user_id = ?", mp.Date, mp.CategoryID, mp.UserId).Count(&totalItems)
	return totalItems > 0
}
