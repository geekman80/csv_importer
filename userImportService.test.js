// test/userImportService.test.js
const fs = require('fs');
const path = require('path');
const { parseCSV, getEmails } = require('./services/userImportService');

describe('CSV Parsing and Email Extraction', () => {
  const sampleCSV = `name,email\nAlice,alice@example.com\nBob,bob@example.com\nCharlie,\nDave,dave@example.com\n,\n`;
  const tempPath = path.join(__dirname, 'temp.csv');

  beforeAll(() => {
    fs.writeFileSync(tempPath, sampleCSV);
  });

  afterAll(() => {
    fs.unlinkSync(tempPath);
  });

  test('should parse valid users and skip malformed rows', () => {
    const users = parseCSV(tempPath);
    expect(users.length).toBe(3); // Skips blank and malformed rows
    expect(users[0]).toEqual({ name: 'Alice', email: 'alice@example.com' });
  });

  test('should return lowercase emails and skip undefined', () => {
    const users = parseCSV(tempPath);
    const emails = getEmails(users);
    expect(emails).toEqual([
      'alice@example.com',
      'bob@example.com',
      'dave@example.com'
    ]);
  });
});