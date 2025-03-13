package dbModels

import "time"

type MonthlyProgress struct {
	ID         int       `gorm:"primaryKey;autoIncrement"`
	Date       time.Time `gorm:"type:date"`       // Ensure the type matches the PostgreSQL 'date' type
	Amount     int       `gorm:"default:0"`       // Matches the PostgreSQL default
	CategoryID int       `gorm:"column:category"` // Matches the 'category' column in PostgreSQL
	UserId     int64     `gorm:"foreignKey:UserID;column:user_id"`
}
