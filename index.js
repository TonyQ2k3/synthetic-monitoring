require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const CronJob = require('node-cron');
const cypress = require('cypress');
const mongoose = require('mongoose');
const monitorReportStatus = require('./utils/testResultFormatter');
const Report = require('./src/models/reportModel');
const { createTest } = require('./src/controllers/testController');


// Initialize the express app
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());

const PORT = 8080;
let CURRENT_SUMMARY = {};



// Connect database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log('Connected to Database');
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));

// Handle GET request
app.get('/', (req, res) => {
  res.status(200).json(CURRENT_SUMMARY);
});
// Handle POST request
app.post('/create', createTest);




//////////////////////// Cron Job Scheduler /////////////////////////

// Validate the cron syntax
const cronJobSchedule = process.env.CRON_SCHEDULE;
const validCronSyntax = CronJob.validate(cronJobSchedule);
try {
  if (!validCronSyntax) {
    console.log('[!] Invalid cron syntax! Please check the cron schedule in the .env file');
  }
  else {
    const scheduledJobFunction = CronJob.schedule(cronJobSchedule, () => {
      runTestSuites();
    });
    scheduledJobFunction.start();
  }
} catch (error) {}


async function runTestSuites() {
  try {
    // Run the cypressTest
    runCypress();

    // Save the result to MongoDB
    if (Object.keys(CURRENT_SUMMARY).length != 0) {
      const report = new Report(CURRENT_SUMMARY);
      report.save()
      .catch(err => {
        console.log('[!] Something went wrong', err);
      });
    }
  } catch (error) {
    console.error('[!] Something went wrong', error);
  }
}


function runCypress() {
  cypress
    .run()
    .then((result) => {
      if (result.failures) {
        // If the test fails, log the error message and reset CURRENT_SUMMARY
        CURRENT_SUMMARY = {};
        console.error('[!] Test failed to be executed!');
        console.error(result.message);
      } 
      else {
        // If the test is successful, format the result and update CURRENT_SUMMARY
        CURRENT_SUMMARY = monitorReportStatus(result);
      }
    })
    .catch((err) => {
      console.error(err.message);
      CURRENT_SUMMARY = {};
    });
}