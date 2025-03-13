package aws

import (
	"context"
	"fmt"
	"io"
	"log"
	"newgo/server/date"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	s3types "github.com/aws/aws-sdk-go-v2/service/s3/types"
)

func Init() (*s3.Client, error) {
	region := os.Getenv("aws_region")
	creds := credentials.NewStaticCredentialsProvider(
		os.Getenv("aws_access_key_id"),
		os.Getenv("aws_secret_access_key"),
		"",
	)
		cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion(region), // Replace with your desired region
	)
	if err != nil{
		return nil, err
	}
	//   Create S3 client
	return s3.NewFromConfig(cfg), nil
}

func DirectoryExists(s3Client *s3.Client, bucketName, userDirPath string) bool {
	result, err := s3Client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(bucketName),
	})
	if err != nil {
		log.Fatalf("Unable to list object, %v", err)
		return false
	}
	for _, object := range result.Contents {
		fmt.Println(*object.Key)
		if *object.Key == userDirPath {
			return true
		}
	}
	return false
}

func DownloadLatestFileFromS3(client *s3.Client, bucketName, userDirPath string) error {
	output, err := client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: &bucketName,
		Prefix: &userDirPath,
	})
	if err != nil {
		return fmt.Errorf("unable to list objects: %w", err)
	}

	var latestFile s3types.Object
	var latestTime time.Time
	// fileDate, err := date.TryParseDate(strings.Split(filepath.Base(*object.Key), "_")[0], "02-01-2006")

	for _, object := range output.Contents {
		str := strings.Split(*object.Key, "/")
		if len(str) > 1 && str[1] != "" {
			fileDate, err := date.TryParseDate(strings.Split(str[1], "_")[0], "02-01-2006")
			if err == nil && fileDate.After(latestTime) {
				latestTime = fileDate
				latestFile = object
			}
		}
	}

	if latestFile.Key == nil {
		return fmt.Errorf("no valid files found")
	}

	// Get the latest file from S3
	resp, err := client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: &bucketName,
		Key:    latestFile.Key,
	})
	if err != nil {
		return fmt.Errorf("unable to get object %s: %w", *latestFile.Key, err)
	}
	defer resp.Body.Close()

	// Create a file in the temp directory
	tmpFilePath := filepath.Join("/tmp", filepath.Base(*latestFile.Key))
	file, err := os.Create(tmpFilePath)
	if err != nil {
		return fmt.Errorf("unable to create file: %w", err)
	}
	defer file.Close()

	// Write the content to the file
	if _, err := io.Copy(file, resp.Body); err != nil {
		return fmt.Errorf("unable to write file: %w", err)
	}

	fmt.Printf("Latest file downloaded successfully: %s\n", tmpFilePath)

	return nil
}
