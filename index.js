const express = require('express');
const helmet = require('helmet');
const CronJob = require('node-cron');
const cypress = require('cypress');
const monitorReportStatus = require('./utils/testResultFormatter');


const app = express();
app.use(helmet());

const PORT = 8080;
let CURRENT_SUMMARY = { runs: [] };

// Define a route for the root URL
app.get('/', (req, res) => {
  const result = monitorReportStatus(CURRENT_SUMMARY);
  res.status(200).json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



//Cron Job Scheduler - 1 min
try {
  const scheduledJobFunction = CronJob.schedule('*/1 * * * *', () => {
    runTestSuites();
  });
  scheduledJobFunction.start();
} catch (error) {}


async function runTestSuites() {
  try {
    runCypress();
  } catch (error) {
    console.error('[!] Something went wrong', error);
  }
}


function runCypress() {
  cypress
    .run()
    .then((result) => {
      if (result.failures) {
        console.error('[!] Test failed to be executed!');
        testResults = null;
        console.error(result.message);
        process.exit(result.failures);
      } 
      else {
        testResults = result;
      }
      CURRENT_SUMMARY = testResults;
    })
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;
    });
}