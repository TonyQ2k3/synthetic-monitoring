const fs = require('fs');
const path = require('path');


const generateTestName = () => {
    const now = new Date();
    const dateString = now.toISOString().replace(/[:.]/g, '-'); // Format: YYYY-MM-DDTHH-MM-SS
    return `test_${dateString}.cy.js`; // Example: test_2023-11-08T10-45-30.js
}


const createTest = async (req, res) => {
    // Generate a unique name for the test
    const testName = generateTestName();
    const filePath = path.join(process.cwd(), 'cypress', 'e2e', testName);
    
    // Get the script from the request body
    const script = req.body;

    // Write script to the test file
    try {
        fs.writeFile(filePath, script, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error writing to file');
            }
            res.send(`Data saved to ${testName}`);
        });
    } catch(err) {
        res.status(500).send('Error writing to file');
        console.log(err);
    }
}

module.exports = {
    createTest
};