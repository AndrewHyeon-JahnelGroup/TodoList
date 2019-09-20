Jahnel Group Forward Motion Project #1: ToDo List
====================
Table of Contents
---------------------
### 1. Stack (MERN)
### 2. Archtecture and Wireframes
### 3. Prerequisites
### 4. Setup
------------------------

1. Stack(MERN)
---------------

This TodoList application was built using MongoDB, Express, React, and Node.

MongoDB: I chose to use MongoDB since the datapoints being stored in my database have very little relational information (task to user is one-to-many with no overlap between users for tasks). It is more efficient to use MongoDB here due to faster lookup times and ease of use compared to a SQL based database.

Express: Server framework to handle REST API requests to database. Passport.js was used in conjunction with the Auth0 authentication api service to handle user authentication and cookies/sessions.

React: React provided a lightweight framework to configure the frontend client. The NextJS library for React lets us serve static files from the server with ease instead of having to deal with ejs/jsx/jade partials.

Node: Server I/O handling and package manager

2. Architecture and Wireframes
------------------------------------

Architecture Diagram
![App Architecture Diagram](/images/archdi.jpeg)

Database Schema



![Database Schema](/images/dbschema.jpeg)

3. Prerequisites
-------------

You will need to install Node and MongoDB. To check if you have the correct packages type 'node -v' and 'mongod -version'. This will tell you if you have the library installed and the version you have.

Windows
-------
Node: Download and run the Windows installer for Node.js from https://nodejs.org/en/download/. This should install the latest version of Node and npm.
MongoDB: Download and run the windows installer for MongoDB community server from https://www.mongodb.com/download-center/community

Mac
---
Node: In bash, run 'brew install node'
MongoDB: In bash, run 'brew install mongodb'


4. Setup
-----------------

1. Clone the repo
2. Run 'npm install' in bash/cmd inside the root todolist directory to install dependencies
3. Run 'mongo' in bash/cmd to spin up a MongoDB server.
4. Run 'mongod' in bash/cmd to open up a command line interface to query your database
5. Start the app by running the 'npm run dev' command in cmd/bash
6. Run tests by running the 'npm run test' command in cmd/bash
