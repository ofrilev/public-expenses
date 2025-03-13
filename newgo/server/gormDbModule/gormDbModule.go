package gormdbmodule

import (
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB // Global DB connection
var err error

func checkDBConnection(db *gorm.DB) error {
	// Perform a no-op query to check database connectivity
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Ping()
}
func Init() *gorm.DB {
	DB, err = CreateConnection()

	if err != nil {
		log.Fatal(err)
	}
	err := checkDBConnection(DB)
	if err != nil {
		log.Fatal(err)
	}
	return DB

}
