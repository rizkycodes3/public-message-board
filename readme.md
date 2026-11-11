# Public Message Board

A simple full-stack message board where users can post messages publicly by entering their name and message. Submitted messages are stored in MongoDB and displayed on the page, with an option to delete a message.

## Features

- Submit a message with a name.
- View messages posted to the board.
- Delete a message.
- Persist messages in MongoDB.

## Tech Stack

- **Frontend:** React, Axios, Sonner
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## Getting Started

1. Install the dependencies for the frontend and backend.
2. Add the MongoDB connection string to the backend `.env` file:

   ```env
   URL_DB=your_mongodb_connection_string
   ```

3. Start the backend server. It listens on port `3001`.
4. Start the React frontend using the development script configured in your frontend project.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/v1/api` | Retrieve all messages. |
| POST | `/v1/api` | Create a message. Requires `name` and `message`. |
| DELETE | `/v1/api/:id` | Delete a message by its MongoDB ID. |

## Purpose

This project demonstrates the fundamentals of building a full-stack application: connecting a React frontend to an Express REST API and using MongoDB to store user-submitted messages.
