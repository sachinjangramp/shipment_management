# Shipment Management

## Table of Contents

- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Navigate for API Documentation and Testing](#navigate-for-api-documentation-and-testing)
  - [Get Token to Test APIs](#get-token-to-test-apis)
  - [Necessary Information to Test APIs](#necessary-information-to-test-apis)
  

## Stack

- Node.js
- Express
- MySQL

## Getting Started

### Navigate for API Documentation and Testing

Deployment Link: [API Documentation](http://ec2-3-93-52-169.compute-1.amazonaws.com/)

This link will navigate to documentation created with Swagger UI

### Get Token to Test APIs

Sign with username: admin and password: admin
```bash
admin
```
You can get the token from the response header.

### Necessary Information to Test APIs

- User Creation:
  - A new user can be created by admin only.

- Role ID Definitions:
  - Admin User: Role ID 5
  - Regular User: Role ID 6

- Sender ID in Shipment Creation:
  - When creating a shipment, you can mention any `user_id` in the `sender_id` column.

- Email Notification on Shipment Status Update:
  - When the status of a shipment is successfully updated, an email notification will be sent to the user based on the `sender_id`.
