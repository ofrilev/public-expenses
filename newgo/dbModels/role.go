package dbModels

type Role struct {
	ID       int    `gorm:"primaryKey;autoIncrement"`
	RoleName string `gorm:"column:role_name"`
}
