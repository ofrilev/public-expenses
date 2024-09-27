package dbModels

type Category struct {
	ID       int    `gorm:"<-:false;primaryKey;autoIncrement"`
	Category string `gorm:"column:category;size:50"`
	ParentID int    `gorm:"column:parent"` // Self-referencing foreign key
	UserId   int    `gorm:"column:user_id"`
}
