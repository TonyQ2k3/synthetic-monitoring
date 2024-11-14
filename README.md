# Automated Synthetic Monitoring Server
API Testing and Browser Testing automatically, using [Cypress](https://www.cypress.io), [ExpressJS](https://expressjs.com) and [Mongoose](https://mongoosejs.com)

## ⓘ About
This app creates an ExpressJS server, which runs a cronjob that executes all Cypress tests at set intervals (default is every minute). 

At the end of the testing process, a report will be generated and saved into a MongoDB database. Result of the latest report will be returned using a REST API.

The server also support generating tests via POST requests as well.

## 🛠️ Installation
1. Clone this repo
2. Run `npm install` to install dependencies
3. Create `.env` file at the root app folder
```
CRON_SCHEDULE=*/1 * * * *
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
```
4. Add your test cases to [cypress/e2e/](./cypress/e2e/). Guide on how to write these tests can be found [here](https://learn.cypress.io/advanced-cypress-concepts/integration-and-api-tests).
5. Run the app with `npm start`

## 👉 Usage
1. To get result on the latest test, make a GET request to the root route (e.g. `http://localhost:8080`)
2. To create a test, make a POST request to the /create route (e.g. `http://localhost:8080/create`). The body of the request should include the raw JS script for a test. Example body [here](./cypress/examples/test.example.cy.js).

## 📝 References
+ Cypress tests are written in syntaxes similar to [Chai](https://www.chaijs.com) - a popular assertion library for NodeJS
+ Example report JSON can be found [here](./cypress/examples/report.example.json)
+ Example raw Cypress result (pre-formatted) can be found [here](./cypress/examples/result_raw.example.json)