package main

import (
	"context"
	"fmt"
	dbutils "go-lambda/handleNewScrape/dbUtils"
	downloadNewScrapedFile "go-lambda/handleNewScrape/downloadNewScrapedFileFromS3"
	loadnewscrpaedfile "go-lambda/handleNewScrape/loadNewScrpaedFile"
	parsednewscrapefile "go-lambda/handleNewScrape/parsedNewScrapeFile"
	uploadnewscrapedfile "go-lambda/handleNewScrape/uploadNewScrapedFile"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
)

func initDotEnv() {
	// Check if the AWS Lambda environment variable exists
	if _, exists := os.LookupEnv("AWS_LAMBDA_FUNCTION_NAME"); !exists {
		// We're not in AWS Lambda, load the .env file
		err := godotenv.Load("/Users/ofri.levkowitz/expenses/go-lambda/.env")
		if err != nil {
			log.Fatalf("Error loading .env file: %v", err)
		}
	}

}

func myLambdaFunction(ctx context.Context, event events.S3Event) {

	initDotEnv()
	downloadNewScrapedFile.DownloadNewScrapedFile()

	f, err := loadnewscrpaedfile.LoadNewFile()
	if err != nil {
		log.Fatalf("Failed to load last scraped file from /tmp with err: %v", err)
	}
	fn := getFileName(f)
	le, err := dbutils.GetLastExpense()
	if err != nil {
		log.Fatalf("Failed to get last expense with err: %v", err)
	}
	pf, err := parsednewscrapefile.Parsednewscrapefile(f, fn, le)
	if err != nil {
		log.Fatalf("Failed to parsed last scraped file from with err: %v", err)
	}
	if len(pf) > 0 {
		var err = uploadnewscrapedfile.UploadNewScrapedFile(pf)
		if err != nil {
			log.Fatalf("Failed to update new scrape file with err: %v", err)
			return
		}
		log.Printf("Succeeded to update expenses, from date: %v", strings.Split(fn, "_")[0])
	} else {
		os.Exit(1)
	}
}
func main() {
	if _, exists := os.LookupEnv("AWS_LAMBDA_FUNCTION_NAME"); !exists {
		fmt.Println("running locally")
		myLambdaFunction(context.TODO(), events.S3Event{})

	} else {
		fmt.Println("running remotely")
		lambda.Start(myLambdaFunction)
	}

}
