package gormdbmodule

import (
	// "database/sql"
	"fmt"

	"os"

	"log"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDotEnv() {
	// Check if the AWS Lambda environment variable exists
	if _, exists := os.LookupEnv("AWS_LAMBDA_FUNCTION_NAME"); !exists {
		// We're not in AWS Lambda, load the .env file
		err := godotenv.Load("/Users/ofri.levkowitz/expenses/newgo/.env")
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

}

func CreateConnection() (*gorm.DB, error) {
	initDotEnv()
	connStr := fmt.Sprintf("user=postgres.vancvzgqrypvfumnwasl password=%s host=aws-0-eu-central-1.pooler.supabase.com port=5432 dbname=postgres", os.Getenv("supabase__db_password"))
	// connStr := fmt.Sprintf("postgres://postgres.vancvzgqrypvfumnwasl:%s@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",os.Getenv("supabase__db_password"))
	// connStr := fmt.Sprintf("host=%s user=%s password=%s dbname=postgres port=5432 sslmode=disable",os.Getenv("supabase_host") ,os.Getenv("supabase_db_name"), os.Getenv("supabase__db_password"))
	// db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
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
