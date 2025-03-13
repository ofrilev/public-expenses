package dbModels

type User struct {
	Userid    int    `gorm:"primaryKey;autoIncrement;column:userid"`
	Name      string `gorm:"size:100;not null"`
	Email     string `gorm:"size:50;not null;unique"`
	Password  string `gorm:"size:100;not null"`
	PublicKey string `gorm:"size:100;column:publickey"`
}
