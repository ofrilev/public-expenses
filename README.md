# Expenses App  
A powerful solution for managing and tracking your expenses over time.

## Overview  
The **Expenses** app is a multi-service platform that helps users seamlessly manage, view, and analyze their expenses. It provides a full-stack system with backend services, web scraping, and a user-friendly single-page application (SPA) for managing finances.

## Services

### 1. **Server**  
- Exposes a **REST API** with token-based authentication for secure access to user data.

### 2. **MainSwitch**  
- Acts as the central entry point, handling routing between services and authenticating requests with tokens.

### 3. **Lambda-Scraper**  
- A web scraper that runs locally or in AWS Lambda, automatically downloads the latest `.xlsx` expense file, and uploads it to an S3 bucket for further processing.

### 4. **Go-Lambda**  
- A job that retrieves the latest file from S3 and updates the expenses database by comparing new entries with the existing data.

### 5. **Client**  
- A single-page application (SPA) providing an intuitive interface to view and manage your expenses. Key features include:
  - Expense summary and insights.
  - Monthly progress tracking and management.
  - Detailed expense tables.

## Upcoming Features
- **Registration, Login & Quiz Services**: In-progress development of services for user onboarding, authentication, and a personalized quiz to enhance the user experience.
