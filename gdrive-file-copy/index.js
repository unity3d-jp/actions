const actions = require('@actions/core');
const {google} = require('googleapis');
const fs = require('fs');
const archiver = require('archiver');

/** Google Service Account credentials  encoded in base64 */
const credentials = actions.getInput('credentials', {required: true});

/** Local path to the file/folder to upload */
const fileId = actions.getInput('fileId', {required: true});

/** Optional name for the new file */
const targetFileName = actions.getInput('targetFileName', {required: false});

const credentialsJSON = JSON.parse(Buffer.from(credentials, 'base64').toString());
const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(credentialsJSON.client_email, null, credentialsJSON.private_key, scopes);
const drive = google.drive({version: 'v3', auth});

/* Creates a copy of a file and applies any requested updates with patch semantics. Folders cannot be copied. 
 * https://developers.google.com/drive/api/v3/reference/files/copy 
*/
 
async function copyFile() {
    actions.info('Copying file: ' + fileId);
    drive.files.copy({
        requestBody: {
            id: fileId,
            name: `${targetFileName || ""}`,
        },
        supportsAllDrives: true
    }).then(
        (response) => {
            const copiedFileId = response.data.id;
            actions.info('File copied successfully to: ' + copiedFileId);

            actions.setOutput("copiedfileId", copiedFileId);
            actions.setOutput("copiedfileName", response.data.name);
            actions.setOutput("driveId", response.data.driveId);
        }
    ).catch(
        e => {
            actions.error('Copy failed');
            throw e;
        }
    );
}

copyFile().catch(e => actions.setFailed(e));
