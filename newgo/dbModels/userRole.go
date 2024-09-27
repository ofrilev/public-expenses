package dbModels

type UserRole struct {
	UserID int  `gorm:"primaryKey;column:userid"` // Foreign key to User
	RoleID int  `gorm:"primaryKey;column:roleid"` // Foreign key to Role
	User   User `gorm:"foreignKey:UserID"`        // Define relationship with User
	Role   Role `gorm:"foreignKey:RoleID"`        // Define relationship with Role
}
