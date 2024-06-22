# MIT Emeritus Project3 Full Stack

ok

## How To

server's Integrated Terminal:

- npm init -y
- npm i express mongoose dotenv cors mongodb axios

MongoDB Atlas:

- create cluster
- grab connection URI / follow instructions
- add URI to .env: `MONGODB_URI=<your_mongodb_uri>`
- add .env to server directory
- add .env to backend .gitignore
- go into cluster's security/network access: allow all
- go into cluster's security/database access: read and write

Express Server:

- create Express app.listen() + MongoDB Node connection in server.js

MongoDb Models and DAL:

- define MongoDB schemas in models directory
- DAL layer functions or classes
- declare entry point: "start": "node server/app.js",
- seed.js database

Begin:

- create `"proxy": "http://localhost:5001"` in client/package.json
- npm i inside both client and server directory int ts
- node seed.js the database
- npm start inside both int ts to launch
- serve static files from the React app in app.js: app.use(express.static(path.join(__dirname, '../client/build')));
- add script to server/package.json: "heroku-postbuild": "cd ../client && npm install && npm run build",

Deploy with Heroku CLI:

- heroku login
- heroku create
- git init
- heroku git:remote -a `<your-heroku-app-name>`
- git add .
- git commit -am "initial"
- git push heroku main
- heroku config:set `MONGODB_URI=<your_mongodb_uri>`
- heroku open

## Improvements

Created server/models folder:
Relationship Between DAL and Models
DAL: Focuses on database operations and connectivity. It uses Mongoose models (User, Transaction) to perform CRUD operations, ensuring separation of concerns.

Models Directory: Houses Mongoose schema definitions (user.js, transaction.js). These schemas define how data should be structured in MongoDB, including field types, validations, and methods.

Conclusion
By organizing your application this way:

Clarity: It becomes clear where to define schemas (models directory) and where to implement database operations (DAL).

Maintainability: Separating schemas from database operations improves code maintainability, readability, and reusability.

Scalability: This structure scales well as your application grows, making it easier to add new models or modify existing ones without disrupting other parts of the application.

app.js Responsibilities:
Server Setup: Configures Express server settings, middleware, and routes.
MongoDB Connection: Establishes a connection to MongoDB using MongoClient.
Route Handling: Defines HTTP routes (/account/create and /account/all) and delegates database operations to dal.js.
Server Start: Starts the server and listens on a specified port.

dal.js Responsibilities:
Database Connection Management: Manages the MongoDB connection (connectDB() function).
Database Operations: Defines functions (create() and all()) for interacting with the database (User model in this case).
Model Integration: Imports and utilizes Mongoose models (User and potentially Transaction) for structured data handling.
Error Handling: Catches and logs errors related to database operations or connections.
