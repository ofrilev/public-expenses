#!/usr/bin/env bash

bun_path=/usr/local/bin/bun

notifier=/usr/local/bin/terminal-notifier

# Load environment variables from .env
source /Users/ofri.levkowitz/expenses/bankDataScraper/.env

exec &>/Users/ofri.levkowitz/expenses/bankDataScraper/cronjob_script_log.txt

bun /Users/ofri.levkowitz/expenses/bankDataScraper/src/index.ts

"$notifier" -title "BankDataScraper" -subtitle "Daily scraper" -message "Completed"

now=$(date)
"$notifier" -title "BankDataScraper" -subtitle "Current Date" -message "$now"
