# JetSetter ✈️

## Table of Contents
- [Introduction](#introduction)
- [Learning Goals](#learning-goals)
- [Technologies](#technologies)
- [Illustration](#illustration)
- [Features](#features)
- [Set Up](#set-up)
- [Future Features](#future-features)
- [Reflection](#reflection)
- [Contributor](#contributor)
- [Project Specifications](#project-specifications)

## Introduction
JetSetter is a travel application that gets you set to jet! ✈️ This app allows users to track and manage their trips as well as create new trip requests that display to a user's personal dashboard.

## Learning Goals
- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application
- Prioritize accessibility of the application

## Technologies
- JavaScript
- Mocha/Chai
- CSS
- HTML
- Webpack
- Fetch API
- DayJS
- TDD
- Lighthouse (accessibility)
- Wave (accessibility)

## Illustration
https://user-images.githubusercontent.com/97919748/173928946-2f77f9be-cd18-4984-9bd8-3c6e8c8bdb32.mov

## Features
- When first arriving at the site, a user can login with their username and password
  - username: `traveler#` (where # is a number between 1 and 50 and references the id of the user - ***ex: traveler2***)
  - password: `traveler`
- Upon logging in, a user can view their personalized dashboard with all of their trips (past, upcoming, and pending) as well as the total amount they've spent on trips this past year
- A user is able to make a trip request by selecting departure date, duration, number of travelers, and choose from a list of destinations
- Upon making these selections, a user will see an estimated cost with a 10% travel agent fee for the trip
- Once the user submits the trip request, it will show on their dashboard under "pending"

## Set Up
- Clone down this repo, cd into the directory and run `npm install` then `npm start`; to run tests, run `npm test`
- In a separate directory, clone down [this repo](https://github.com/turingschool-examples/travel-tracker-api), cd into the directory and run `npm install` then `npm start`
- Lastly, copy and paste the link provided http://localhost:8080/ into your browser window to use the application

## Future Features
- Add functionality for a travel agent to log in with the ability to view and approve/deny users pending trips, as well as view total income generated this year

## Reflection
- This project was a massive undertaking! I learned the importance of planning, prioritizing, and timeboxing, especially when it comes to utilizing/experimenting with third party libraries. I lost a lot of time trying to figure out how to use glidejs! 
- This project illuminated the importance of breaking iterations down into smaller, more digestible pieces, and focusing on JUST one piece at a time. I found myself starting one task but then worrying 7 steps ahead about what might come after, rather than just focusing on the task at hand and making progress there.
- Connecting to the DOM is hard, but it is so rewarding to see once it DOES display what/how you want!
- Taking time to make sure you really understand the data and how it is structured will greatly help in the long run.
- Accessibility was a major focus of this project - I made the trip content on the dashboard fully tabbable and a user is able to utilize the scroll using the arrow keys as well.

## Contributor
- [Corinne Canavan](https://github.com/CorCanavan)
  - [LinkedIn](https://www.linkedin.com/in/corinnecanavan/)

## Project Specifications
- The spec for this project can be found [here](https://frontend.turing.edu/projects/travel-tracker.html).
