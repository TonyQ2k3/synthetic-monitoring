const { toZonedTime, format } = require('date-fns-tz');


module.exports = function monitorReportStatus(results) {
    let runs = []
    let reportTests = [];
    let formattedResult = {};
  
    //if this is not the first run
    //use the results data to do simple formating
    if (results?.runs?.length) {
        results.runs.forEach((run) => {
            run.tests.length &&
            run.tests.forEach((test) => {
                const type = test.title[0];
                const zone = test.title[1];
                const title = test.title[2];
                const state = test.state;
                const duration = test.duration;
                const testBody = test.body;
                reportTests.push({ title, type, zone, state, duration, testBody });
            });
            // Destructure stats object
            let {
                tests, passes, pending, failures, start, end, duration
            } = run.reporterStats;
            // Create new date objects
            start = new Date(start);
            end = new Date(end);
            // Convert to Ho Chi Minh timezone
            start = convertUtcToHoChiMinh(start);
            end = convertUtcToHoChiMinh(end);

            runs.push({
                name: run.spec.fileName,
                fileName: run.spec.relative,
                stats: { tests, passes, pending, failures, start, end, duration },
                reportTests
            });
            reportTests = [];
        });
  
      // Create custom test result object
        formattedResult = {
            totalSuites: results.totalSuites,
            totalTests: results.totalTests,
            totalFailed: results.totalFailed,
            totalPassed: results.totalPassed,
            totalPending: results.totalPending,
            totalSkipped: results.totalSkipped,
            duration: {
                startedAt: results.startedTestsAt,
                endedAt: results.endedTestsAt,
                totalDuration: results.totalDuration,
            },
            runs,
        };
    }
  
    return formattedResult;
};

function convertUtcToHoChiMinh(utcTimestamp) {
    // Define the timezone for Ho Chi Minh City
    const hoChiMinhTimezone = 'Asia/Saigon';
  
    // Convert the UTC timestamp to Ho Chi Minh timezone
    const formattedDate = format(utcTimestamp, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: hoChiMinhTimezone });
  
    return formattedDate;
}