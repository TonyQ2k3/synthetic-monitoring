# Automated Synthetic Monitoring Server
API Testing and Browser Testing automatically, using [Cypress](https://www.cypress.io), [ExpressJS](https://expressjs.com) and [Mongoose](https://mongoosejs.com)

## About
This app creates an ExpressJS server, which runs a cronjob that executes all Cypress tests at set intervals (default is every minute). 

At the end of the testing process, a report will be generated and saved into a MongoDB database. Result of the latest report will be returned using a REST API.

## Installation
1. Clone this repo
2. Run `npm install` to install dependencies
3. Create `.env` file at the root app folder
```
MONGO_URI=<Database URI>
PORT=8080
```
4. Add your test cases to [cypress/e2e/](./cypress/e2e/). Guide on how to write these tests can be found [here](https://learn.cypress.io/advanced-cypress-concepts/integration-and-api-tests).
5. Run the app with `npm start`