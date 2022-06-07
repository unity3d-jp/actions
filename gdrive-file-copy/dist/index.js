/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 264:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 889:
/***/ ((module) => {

module.exports = eval("require")("archiver");


/***/ }),

/***/ 342:
/***/ ((module) => {

module.exports = eval("require")("googleapis");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const actions = __nccwpck_require__(264);
const {google} = __nccwpck_require__(342);
const fs = __nccwpck_require__(147);
const archiver = __nccwpck_require__(889);

/** Google Service Account credentials  encoded in base64 */
const credentials = actions.getInput('credentials', {required: true});

/** Local path to the file/folder to upload */
const fileId = actions.getInput('fileId', {required: true});

/** Optional name for the new file */
const fileName = actions.getInput('fileName', {required: false});

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
            name: `${fileName || ""}`,
        },
        supportsAllDrives: true
    }).then(
        (response) => {
            const copiedFileId = response.data.id;
            actions.info('File copied successfully to: ' + copiedFileId);

            actions.setOutput("copiedfileId", copiedFileId);
            actions.setOutput("driveID", response.data.driveId);
        }
    ).catch(
        e => {
            actions.error('Copy failed');
            throw e;
        }
    );
}

copyFile().catch(e => actions.setFailed(e));

})();

module.exports = __webpack_exports__;
/******/ })()
;