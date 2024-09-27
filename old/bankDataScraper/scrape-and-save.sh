#!/usr/bin/env bash

bun_path=/usr/local/bin/bun
go_path=/usr/local/bin/go 
notifier=/usr/local/bin/terminal-notifier

# Load environment variables from .env
source /Users/ofri.levkowitz/expenses/go-lambda/.env

exec &>/Users/ofri.levkowitz/expenses/bankDataScraper/cronjob_script_log.txt

# Enter to scraper directory
cd /Users/ofri.levkowitz/expenses/go-lambda
# Run the Bun script
"$bun_path" run lambda-user-datascraper/src/index.ts

"$notifier" -title "BankDataScraper" -subtitle "Daily scraper" -message "Completed"


if [ $? -eq 0 ]; then
    echo "Bun script executed successfully. Running Go script..."
    
# Change to the directory containing the Go project
cd /Users/ofri.levkowitz/expenses/go-lambda/handleNewScrape

# Run the Go script
./bootstrap
else
    echo "Bun script failed. Not running Go script."
fi
now=$(date)
"$notifier" -title "BankDataScraper" -subtitle "Current Date" -message "$now"
