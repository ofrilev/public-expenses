package dbModels

import "time"

type Expense struct {
	ID           int64     `gorm:"primaryKey;autoIncrement"`
	BusinessName string    `gorm:"column:business_name;size:50"`
	Amount       int       `gorm:"column:amount;default:0"`
	Date         time.Time `gorm:"type:date"` // Explicitly set column type to date
	CardNumber   int       `gorm:"column:card_number"`
	CategoryID   int       `gorm:"column:category"`
	Special      int       `gorm:"column:special;default:0"`
	UserId       int64     `gorm:"foreignKey:UserID;column:user_id"`
	// User         User      `gorm:"foreignKey:UserID"`
}
