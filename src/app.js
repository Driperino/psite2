const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = 3500;

// Parse url-encoded html form body
app.use(bodyParser.urlencoded({ extended: true }));

// Parse json body
app.use(bodyParser.json());

// call html from public dir
app.use(express.static(path.join(__dirname, 'public')));

// Load sheets credentials from json key file
const credentials = require('./credentials/your-credentials.json');

// Configure Sheets API
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);
const sheets = google.sheets({ version: 'v4', auth });

// Form submissions
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;
  const spreadsheetId = '1Ku5DG71W_EFLRht0F71gneMkpqceDOHXniBhoX5W7pk'; // Google Sheets ID - NOT THE URL
  const range = 'Sheet1!A1:C1'; // sets starting point in the sheet

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: [[name, email, message]],
      },
    });

    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
