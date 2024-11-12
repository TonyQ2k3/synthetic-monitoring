// Import environment variables
const example_env = require('../environments/production.example');

// Define test case
context("GET /post", () => {
    it("gets a list of all jsonplaceholder posts", () => {
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