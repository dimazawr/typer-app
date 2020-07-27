# Typer App

## Description 

Typer is a chatting app, where user can choose a username and a create room or join the existing one.

https://chat-typer-app.herokuapp.com/

## Installation 

`npm install`

### Run development server

In the project root directory open the terminal and run:

 `npm run dev`

## Overview

The app based on websocket protocol and use socket.io client on both backend and frontend. Server side is build on Node.js and Express.js. Client side is a React app, which uses Redux as a state managment, React Router for routing and React-hook-form to handle forms data.

Client side of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Technologies used:

##### Backend

* Node.js
* Express.js
* socket.io
* moment.js
* shortid

##### Frontend

* React
* Redux
* React Router
* React-hook-form
* Bootstrap 4