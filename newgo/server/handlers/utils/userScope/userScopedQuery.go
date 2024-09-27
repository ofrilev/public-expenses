package userscope

import (
	"gorm.io/gorm"
)

func UserScopedQuery(db *gorm.DB, userID int, tableName string) *gorm.DB {
	return db.Table(tableName).Where("user_id = ?", userID)
}
