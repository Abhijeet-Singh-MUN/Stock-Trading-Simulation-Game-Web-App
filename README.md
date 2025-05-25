## CS3100 term project part 3

# Architecture Document

## Overview
This architecture document provides an overview of the implementation of the client-side application, including file structure, adherence to software design principles, usage of websockets, buttons, and user interactions. The client-side application is designed to interact with a server-side application to facilitate stock trading.

## File Structure
The client-side application follows a structured file organization:

- **HTML Files:** Located in the public directory, representing different pages of the client-side application, such as `dashboard.html`, `login.html`, `register.html`, etc.
- **JavaScript Files:** Corresponding JavaScript files are also stored in the public directory. Each HTML file has an associated JavaScript file responsible for handling client-side logic and interactions.
- **CSS Files:** Stylesheets are stored in the public directory as well, under the `styles.css` file.

## Modularity and Decoupling
The client-side codebase emphasizes modularity and decoupling:

- **Single Responsibility Principle (SRP):** Each module or function has a single responsibility, such as handling form submissions, managing WebSocket connections, etc.
- **Open/Closed Principle (OCP):** The code is designed to be open for extension but closed for modification. New features can be added without modifying existing code.
- **Liskov Substitution Principle (LSP):** Interfaces and abstractions are used where applicable to ensure that objects can be substituted with instances of their subtypes.
- **Interface Segregation Principle (ISP):** Interfaces are tailored to specific use cases to minimize dependencies.

## Usage of Websockets
The client-side application utilizes websockets for real-time communication with the server:

- Websockets are implemented using the native WebSocket API in JavaScript.
- A WebSocket connection is established with the server, allowing bidirectional communication.
- The client listens for incoming messages from the server and sends messages using the `sendMessage()` function defined in `websocket.js`.

## Buttons and User Interactions
Buttons are used to trigger various actions in the client-side application:

- Buttons are used to submit forms (login, register, etc.), buy or sell stocks, create or join games, etc.
- Event listeners are attached to these buttons to handle user interactions, ensuring that actions are performed in response to user input.

## Conclusion
The client-side application is designed to be modular, maintainable, and extensible. It adheres to software design principles such as SOLID and emphasizes decoupling and modularity to facilitate ease of development and maintenance. By utilizing websockets and buttons, it provides a seamless user experience for stock trading interactions.

## Some images
![Log in](https://github.com/user-attachments/assets/39b8c98e-370e-482d-adea-c9c8c81adb75)
![Home page 01](https://github.com/user-attachments/assets/597b9219-57fa-4839-ad2e-e99e6145722d)
![Notifications 01](https://github.com/user-attachments/assets/76147019-d658-45b1-a12c-f5d06283c8ed)

![Statements 01](https://github.com/user-attachments/assets/c3322111-8930-4116-a5f5-7a33c7480cf6)
![Profile](https://github.com/user-attachments/assets/f49f72a3-21f6-4586-b707-52b50dde5fa0)


## CS3100 term project part 2 

# Project Name: Stock Trading Game


- Since, the additional two features i developed weren't using http calls, they didn't satisfy assignment requirements so i created additonal ones
- i'd like you to use them for the purpose of invigilating.

- **1st list/group of feautures - unittests are written for player routes and the routes are as follows :** 
- // Route for getting recent games
- router.get('/recent-games', getRecentGames);

- // Route for getting game details by gameId
- router.get('/game-details/:gameId', getGameDetails);

- // Route for getting competitor portfolio details by playerId
- router.get('/competitor-portfolio/:playerId', getPlayerCompetitorPortfolio);


- **2nd feature- unittests are written for gameRoutes and the route is as follows :**

- // Route for changing game settings
- router.post('/changeSettings', changeGameSettings);


All other unittest and features are decoupled and written in a way that they are self explanatory, there are lots of additional mini
features i have written that do not have to be concerned in terms of invigilation, but i put a lot of effort in it, so i don't mind some bonus points. i do beleive i've done awesome work, and am proud of it. Thankyou for your time, to observe my work. Please use package.json, i've used lots of things not used in the course, okay maybe not really except cron and sinon.



---
## Attributions

| ChatGPT | using for explaining concepts, helping with debugging etc.|
|google and youtube | to see tutorials and learn small minor things in terms of coding principles like decoupling, unittesting etc.| 


## Description

This project is a web application for simulating a stock trading game. Players can register, create games, join games, buy and sell stocks, and view their portfolio. The application utilizes Express.js for the backend, MongoDB as the database, and integrates with the Polygon API for fetching real-time stock data.

---

## Folder Structure

- **the models, controllers, routes and tests are under the server directory**
- **config.mjs:** Contains configuration variables such as MongoDB URI and API keys.
- **models/:** Contains Mongoose models for Player, Game, and Trade.
- **controllers/:** Contains controller functions for handling various routes.
- **routes/:** Contains route definitions for different endpoints.
- **tests/:** Contains test files for testing routes and controllers using Mocha, Chai, and Supertest.
- **app.mjs:** Entry point for the Express application.
- **README.md:** Documentation file explaining the project structure, functionality, and how to set up and run the project.

---

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd stock-trading-game`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root directory and add the necessary configuration variables.
5. Start the server: `npm start`

---

## Routes

1. **Auth Routes (/api/auth):**
   - `POST /register`: Register a new player.
   - `POST /login`: Authenticate a player.

2. **Game Routes (/api/game):**
   - `POST /create`: Create a new game.
   - `POST /join`: Join an existing game.
   - `POST /leave`: Leave a game.

3. **Trade Routes (/api/trade):**
   - `POST /buy`: Buy stocks.
   - `POST /sell`: Sell stocks.

---

## Controllers

1. **Auth Controller (authController.mjs):**
   - `register`: Register a new player.
   - `login`: Authenticate a player.

2. **Game Controller (gameController.mjs):**
   - `createGame`: Create a new game.
   - `joinGame`: Join an existing game.
   - `leaveGame`: Leave a game.

3. **Trade Controller (tradeController.mjs):**
   - `buyStock`: Buy stocks.
   - `sellStock`: Sell stocks.

- routing and control of those routes is decoupled for better control and to adhere to common soft dev practices.
---

## Models

- Among other features(there are many like allowing multiples players to join a game through use of game ID, using player id
- as an authetication token between client and server(for end part of project) etc. ), a couple are mentioned under player model
- these feautures represent the player in general are therefore, of great significance.

1. **Player Model (Player.mjs):**
   - Represents a player in the game.
   - Includes fields such as playerId, username, password, startingAmount, currentAmount, recentGames, and portfolio.
   - allows for saving players last known state for games, allows to rejoin from where player left off.
   - allows for a list of recent games, and the ability to rejoin them as they are identified through GameID,
   - these recent games is a list of gameID objects containing lastKnownState, wins/loss, date of creation of game.

2. **Game Model (Game.mjs):**
   - Represents a game in the system.
   - Includes fields such as gameId, name, startTime, durationHours, startingAmount, and players.

3. **Trade Model (Trade.mjs):**
   - Represents a trade made by a player.
   - Includes fields such as playerId, stockSymbol, quantity, pricePerShare, and type (BUY or SELL).

---

## Testing

- Testing is implemented using Mocha, Chai, and Supertest.
- Test files are located in the `tests/` directory.
- Tests cover routes and controllers to ensure proper functionality.

---

## Additional Notes

- The project uses Express.js for the backend and MongoDB as the database.
- Real-time stock data is unavailable, so avg of 1 day stock data is fetched from the Polygon API for buying and selling stocks.
- Players can create games, join games, buy and sell stocks, view their portfolio, and leave games and rejoin with saved progress.
- Authentication is implemented using JSON Web Tokens (JWT).
- The code is modularized and follows a clean folder structure for easy navigation and maintenance.

---
