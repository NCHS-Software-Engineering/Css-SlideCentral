# Css-SlideCentral

The CSS/SlideCentral is a dynamic web application designed to allow school staff to enter in activities and events at the school, while allowing students to discover events relevant to their interests. This app aims to provide an easier solution for students and teachers alike to view school activities, and for club sponsors to upload their upcoming activities to garner a larger amount of participation. The application centeralizes event visility and replaces the fragmented methods of club communication within NCHS.

## Getting Started

These instructions will guide you on how to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

To make this work you need to download the latest versions of [Visual Studio Code](https://code.visualstudio.com/download), [Git](https://git-scm.com/downloads), and [Node.js](https://nodejs.org/en) if you do not have it downloaded already.

## Client Dependencies
* @mui/material
* @react-oauth/google
* @mui/icons-material
* @mui/icons-material/Delete
* @mui/icons-material/Search
* react-router-dom
* react-scripts

## Server Dependencies
* express
* mysql2
* dotenv
* cors
Dependencies must be installed in the general and client directory with npm syntax

### Installation

1. Open Visual Studio Code and clone the repository on a local computer.
2. Open the repository when prompted.
3. Split your terminal into two separate terminals for running the server and client respectively.
4. Install Node.js in the server and npm in the client.
5. In the `server` directory, create a `.env` file with the following:
   * CLIENT_ID
   * CLIENT_SECRET
   * REDIRECT_URI
   * DB_HOST
   * DB_PORT
   * DB_USER
   * DB_PASS
   * DB_NAME
   * PORT
     You can find this information from Dr. Miller.
7. Run  `cd server` and `cd client` in each terminal respectively to change directory.
8. Run `npm update` in the client terminal to update all dependencies.
9. Once the installation is complete, run `node server.js` in the server and run `npm start` in the client to start the application. The app should open at http://localhost:3000

## Architecture Overview

- **Frontend (React):** UI, routing, and user interaction.
- **Backend (Node.js + Express):** API requests, login, and database operations.
- **Database (MySQL):** Stores event info and user data.
- **Auth (Google OAuth):** Users log in using their school Google accounts.

## Usage

Once the application is running, it will direct you to the Home Page. Here, you can access various functions if you log in with your google account

NOTE: YOU NEED TO LOG IN WITH YOUR SCHOOL GOOGLE ACCOUNT TO ACCESS ALL FEATURES

### Supported Platforms
- Windows 10/11
- macOS Monterey or later
- Raspberry Pi Raspberry Pi OS 11+

### Node.js Version
- Node.js v18.x or later

### npm Version
- npm version 9.x or later

### Login Installation

You will need Google Auth secrets from the server .env from Dr. Miller to access the authorization.


## Data Storage

The application uses a SQL database for data storage of the schedules, activities, and Google Authentication IDs.

## SQL Schema
![image](https://github.com/user-attachments/assets/5da10b68-615c-4db8-a8f9-c3cc40ed73b6)




All sql values can be inputted in the activity form                                
* activityType can be 3 different kinds of events (School Sports, Club Meetings, School Events)
* activityDate is the date of the activity
* slideshowStartDate and slideshowEndDate are the dates that will be displayed in the slideshow
* activityName is the title of the activity being submitted
* activityDesc is a brief description of the activity or event
* calendarDayOfWeek is the day(s) the event takes place
* calendarFrequency is how frequently the event takes place (daily, weekly, biweekly, etc)
* calendarTimeOfDay is when the event takes place (morning, afternoon)

### Database Installation

You will need database secrets from the server .env from Dr. Miller to access the SQL database.

## Known Issues

- Login fails for non-school Google accounts
- Mobile version not yet implemented
- CSS is not yet implemented
- The activity form is repetitive so you need to input the EXACT same day for each input

## Product Packlog

Remaining user stories can be found in the trello: https://trello.com/b/iuZKsvux/css-slidecentral

## Contributing

Authors: Isaac Liu, Arnav Vedavyas, Jinan Parves, Michael Antipov
Client: Mrs. Samantha Szopinski
Mentor: Mr. Bill Stenzel
Teacher: Dr. Derek Miller
