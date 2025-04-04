// services/userImportService.js

const fs = require('fs');
const path = require('path');

function parseCSV(filepath) {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const lines = raw.split('\n');

    const headers = lines[0].split(',');
    const users = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(',');

        const user = {};
        for (let j = 0; j < headers.length; j++) {
            user[headers[j]] = values[j];
        }

        users.push(user);
    }

    return users;
}

function getEmails(users) {
    return users.map(user => user.email.toLowercase());
}

function importUsers(csvFilePath) {
    const users = parseCSV(csvFilePath);
    const emails = getEmails(users);

    console.log(`Imported ${emails.length} users`);
    return emails;
}

module.exports = {
    parseCSV,
    getEmails,
    importUsers
};
