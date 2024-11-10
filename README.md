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

Auth page
![of7im](https://github.com/user-attachments/assets/c1a7aafa-92d4-46dd-98c6-37f203e3ad00)
Main dashboard
![Screenshot 2024-11-10 at 13 04 18](https://github.com/user-attachments/assets/7cd23448-fcb2-46d8-a2d2-768efe475779)
Monthly progress
![Screenshot 2024-11-10 at 13 16 15](https://github.com/user-attachments/assets/f535892c-2706-4b11-b2c1-c77c2bf4b5ed)
Unknown business modal
![Screenshot 2024-11-10 at 12 32 01](https://github.com/user-attachments/assets/76a06b85-0bde-44d6-9018-ec2d45e22155)

