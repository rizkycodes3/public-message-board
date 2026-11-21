# Public Message Board

A simple full-stack web application where anyone can post messages organized by topics. Think of it as a lightweight, public bulletin board — no accounts, no authentication, just an open space to share thoughts.

## Purpose

The goal of this project is to provide a straightforward platform for posting and browsing public messages. Messages are grouped under topics (e.g., "Announcements", "Feedback", "General"), making it easy to categorize and find conversations.

## Features

- Create & delete topics — organize messages into categories. Topics in use cannot be deleted.
- Post & delete messages — share a message under a chosen topic, with your name attached.
- Filter messages — narrow down by author name or topic.
- Pagination — browse messages five at a time.
- Validation & error handling — duplicate topics, missing fields, and invalid references are rejected with clear feedback.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Sonner
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## Getting Started

1. Clone the repository and install dependencies for both the client and server.
2. Configure the server — create a .env file with your MongoDB connection string:

   ```env
   URL_DB=your_mongodb_connection_string
   ```

3. SRun the backend on port `3001`:
   ```bash
   node server.js
   ```
4. Run the frontend and open the app in your browser.

## API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/v1/api/topic`       | List all topics   |
| POST   | `/v1/api/topic`       | Create a topic    |
| DELETE | `/v1/api/topic/:id`   | Delete a topic    |
| GET    | `/v1/api/message`     | List all messages |
| POST   | `/v1/api/message`     | Create a message  |
| DELETE | `/v1/api/message/:id` | Delete a message  |

## Notes

- This is a learning/demo project. It has no authentication, so anyone can post or delete content.
- Messages reference topics by ID; deleting a topic with existing messages is blocked to keep data consistent.
