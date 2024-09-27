# lambda-user-datascraper
A job that run daily to take each user's last expenses for his bank with its creds

# Deploy to Aws workflow:
#notice for the `.tsconfig` together with `package.json `
1. write the ts code, entry point in `index.ts`. such there is an export to the handler(event) with outside params.
make sure that the  handler() invokation is comitted before upload the lambda. And vice versa when running locally
2. **Run `bun run build`**
3. **Run `./zip-to-lambda.sh`**
4. upload the zip to Aws lambda
5. notice for new depandancies to be inclue in an Aws layer