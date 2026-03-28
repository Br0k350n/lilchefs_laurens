/**
 * Google Apps Script endpoint for Little Chef Academy waitlist submissions.
 *
 * 1) Attach this script to the Google Sheet that should store waitlist data.
 * 2) Deploy as a Web App (Execute as: Me, Who has access: Anyone).
 * 3) Replace WAITLIST_ENDPOINT in the HTML with your Web App URL.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Waitlist')
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Waitlist');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submitted At',
        'Parent Name',
        'Parent Email',
        'Child Name',
        'Child Age',
        'Interest'
      ]);
    }

    const payload = JSON.parse(e.postData.contents || '{}');

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.parentName || '',
      payload.parentEmail || '',
      payload.childName || '',
      payload.childAge || '',
      payload.interest || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
