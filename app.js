// app.js

const path = require('path');
const { importUsers } = require('./services/userImportService');
const csvFilePath = path.join(__dirname, '/users.csv');

try {
    const emails = importUsers(csvFilePath);
    console.log("Imported emails:");
    console.log(emails);
} catch (err) {
    console.error("Failed to import users:", err);
}