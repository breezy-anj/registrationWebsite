import { google } from 'googleapis';

export async function appendToSheet(data: any[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId || spreadsheetId === '<FILL_THIS_IN>') {
    console.warn('Google Sheet ID is not configured. Skipping sheets integration.');
    return;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', // Adjust if sheet name is different
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [data],
      },
    });
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    // Don't throw here to avoid crashing the whole registration process if sheets fail
  }
}
