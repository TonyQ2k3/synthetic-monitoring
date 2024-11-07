module.exports = function monitorReportStatus(results) {
    const tests = [];
    let formattedResult = { runs: [] };
  
    //if this is not the first run
    //use the results data to do simple formating
    if (results?.runs?.length) {
        results.runs.forEach((run) => {
            run.tests.length &&
            run.tests.forEach((test) => {
                const title = test.title[0];
                const description = test.title[1];
                const state = test.state;
                const duration = test.duration;
                const testBody = test.body;
                tests.push({ title, description, state, duration, testBody });
            });
        });
  
      // Create custom test result object
        formattedResult = {
            lastRun: {
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
                tests,
            },
        };
    }
  
    return formattedResult;
  };