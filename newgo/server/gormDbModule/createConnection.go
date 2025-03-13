package gormdbmodule

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func CreateConnection() (*gorm.DB, error) {
	pass := os.Getenv("supabase__db_password")
	connStr := "user=postgres.vancvzgqrypvfumnwasl password=" + pass + " sslmode=require host=aws-0-eu-central-1.pooler.supabase.com port=5432 dbname=postgres"
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  connStr,
		PreferSimpleProtocol: true, // Disables implicit prepared statement usage
	}), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
		return nil, err
	}

	return db, nil
}
