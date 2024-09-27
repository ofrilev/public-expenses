package models

type ClientCategories struct {
	ID       int    `gorm:"primaryKey;autoIncrement" json:"id"`
	Category string `gorm:"size:50" json:"name"`
	ParentID *int   `gorm:"column:parent" json:"parent"`
}
