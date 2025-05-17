# Css-SlideCentral

The CSS/SlideCentral is a dynamic web application designed to allow teachers to enter in activities and events at the school to be displayed for students with various interests. This app aims to provide an easier solution for students and teachers alike to view school activities, and for club sponsors to upload their upcoming activities to garner a larger amount of participation. The application centers all the school activities around a hub, contrast to the various methods of communication we have in 2025.

## Getting Started

These instructions will guide you on how to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

To make this work you need to download the latest versions of [Visual Studio Code](https://code.visualstudio.com/download), [Git](https://git-scm.com/downloads), and [Node.js](https://nodejs.org/en) if you do not have it downloaded already.

## Dependencies
* @mui/material
* @mui/joy
* @mui/system
* @mui/x-date-pickers
* @react-oauth/google
* @mui/icons-material
* react-router-dom
* react-scripts

Dependencies must be installed with npm syntax

### Installation

1. Open Visual Studio Code and clone the repository on a local computer.
2. Open the repository when prompted.
3. Split your terminal into two separate terminals for running the server and client respectively.
4. Run  `cd server` and `cd client` in each terminal respectively to change directory.
5. Run `npm update` in the client terminal to update all dependencies.
6. Once the installation is complete, run `node server.js` in the server and run `npm start` in the client to start the application.

## Usage

Once the application is running, it will direct you to the Home Page. Here, you can access various functions if you log in with your google account

NOTE: YOU NEED TO LOG IN WITH YOUR SCHOOL GOOGLE ACCOUNT TO ACCESS ALL FEATURES

### Login Installation

You will need Google Auth secrets from the server .env from Dr. Miller to access the authorization.

## Data Storage

The application uses a SQL database for data storage of the schedules, activities, and Google Authentication IDs.

### Database Installation

You will need database secrets from the server .env from Dr. Miller to access the SQL database.

## Contributing

Authors: Isaac Liu, Arnav Vedavyas, Jinan Parves, Michael Antipov
Client: Mrs. Samantha Szopinski
Mentor: Mr. Bill Stenzel
Teacher: Dr. Derek Miller
