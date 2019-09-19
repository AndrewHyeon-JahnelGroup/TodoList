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

Express: Server framework to handle REST API requests to database. Passport.js was used in conjunction with Redis to handle user authentication and cookies/sessions.

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

You will need to install Node, npm, and MongoDB

4. Setup
-----------------

1. Clone the repo
2. Run 'npm install' in bash/cmd inside the root todolist directory to install dependencies
3. Run 'mongo' and 'mongod' commands from the command line to turn on mongodb
5. Start the app by running 'npm run dev'
