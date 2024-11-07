require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const CronJob = require('node-cron');
const cypress = require('cypress');
const mongoose = require('mongoose');
const monitorReportStatus = require('./utils/testResultFormatter');
const Report = require('./src/models/reportModel')


// Initialize the express app
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
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


app.get('/', (req, res) => {
  res.status(200).json(CURRENT_SUMMARY);
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
        console.error('[!] Test failed to be executed!');
        CURRENT_SUMMARY = {};
        console.error(result.message);
        process.exit(result.failures);
      } 
      else {
        CURRENT_SUMMARY = monitorReportStatus(result);
      }
    })
    .catch((err) => {
      console.error(err.message);
      CURRENT_SUMMARY = {};
    });
}