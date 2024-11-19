// Import environment variables
const example_env = require('../environments/production.example');

// Import utils
const { isTradingTime, isWorkingDay } = require('../utils/timeChecking');

// Grouping tests
describe("service-apis", () => { // type
    context("prodution-environment", () => { // zone
        it("Getting a list of all jsonplaceholder posts", () => { // test name
            cy.request({
                method: "GET", 
                url: "https://jsonplaceholder.typicode.com/posts"
            }).then((response) => {
                expect(response.status).to.eq(200);
                // Modify environment variable into a new value
                example_env.postList = response.body;
            })
        })
    })

    context("public-cluster", () => { // zone
        
        if (isTradingTime() && isWorkingDay()) { // Define a test case that only runs on weekdays, between 8:00 and 15:00
            it("Getting a list of all jsonplaceholder posts", () => { // test name
                cy.request({
                    method: "GET", 
                    url: "https://jsonplaceholder.typicode.com/posts"
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    // Modify environment variable into a new value
                    example_env.postList = response.body;
                })
            })
        }
    })
})


