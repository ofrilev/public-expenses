package downloadNewScrapedFile

import (
	"fmt"
	"go-lambda/aws"
	"log"
	"os"
)

func DownloadNewScrapedFile() {
	s3Client, err := aws.Init()
	if err != nil {
		log.Fatalf("Failed to get s3Client with err: %v", err)
	}
	bucketName := os.Getenv("aws_scrape_bucket_name")
	userName := os.Getenv("user_name")

	if bucketName == "" {
		fmt.Println("Bucket name is required")
		return
	}

	if userName == "" {
		fmt.Println("User name is required")
		return
	}
	userDirPath := userName + "-scrape_dir"
	// aws.IsBucketExist(s3Client, bucketName, userDirPath)
	// Check if the directory exists
	if aws.DirectoryExists(s3Client, bucketName, userDirPath) {
		fmt.Println("Directory exists")
		err := aws.DownloadLatestFileFromS3(s3Client, bucketName, userDirPath)
		if err != nil {
			log.Fatalf("Unable to download lates file with error: %v", err)
		}
	} else {
		fmt.Println("Directory does not exist")
		os.Exit(1)
	}
}
