"use strict";
(() => {
var exports = {};
exports.id = 329;
exports.ids = [329];
exports.modules = {

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 2254:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 4492:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 5815:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/test/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST),
  dynamic: () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6519);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3488);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(2023);
// EXTERNAL MODULE: ./node_modules/file-type/core.js + 10 modules
var core = __webpack_require__(1477);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
;// CONCATENATED MODULE: ./src/app/api/test/route.ts




/*
export const config = {
  api: {
    bodyParser: false
  }
}
*/ const dynamic = "force-dynamic";
async function POST(req) {
    console.log("\n======== Route Handler ========\n");
    const formData = await req.formData();
    const successfullySavedFiles = [];
    const alreadyExistedFiles = [];
    let unableToSaveFiles = 0;
    try {
        console.log(Object.fromEntries(formData));
        const saveFile = async function(file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const trustedFileType = await (0,core/* fileTypeFromBuffer */.pM)(buffer);
            const dir = external_path_default().join("/sdcard", "uploads", trustedFileType.ext);
            if (!external_fs_default().existsSync(dir)) {
                external_fs_default().mkdirSync(dir, {
                    recursive: true
                });
            }
            let fileName = external_path_default().join(dir, file.name);
            if (!fileName.endsWith("." + trustedFileType.ext)) {
                fileName = fileName + "." + trustedFileType.ext;
            }
            if (!external_fs_default().existsSync(fileName)) {
                external_fs_default().writeFileSync(fileName, buffer);
                successfullySavedFiles.push(fileName);
                return fileName;
            } else {
                alreadyExistedFiles.push(fileName);
                throw {
                    message: "already existed"
                };
            }
        };
        const totalSubmitedFilesArrayPromise = [];
        while(true){
            let file = formData.get(`file_${totalSubmitedFilesArrayPromise.length}`);
            if (!file) break;
            totalSubmitedFilesArrayPromise.push(saveFile(file));
        }
        if (totalSubmitedFilesArrayPromise.length === 0) {
            throw {
                message: "No file found"
            };
        }
        (await Promise.allSettled(totalSubmitedFilesArrayPromise)).forEach((x)=>{
            if (x.status === "rejected" && x.reason.message !== "already existed") {
                unableToSaveFiles++;
            }
        });
        return next_response/* default */.Z.json({
            message: "Submited",
            type: "router handler",
            totalSubmitedFiles: totalSubmitedFilesArrayPromise.length,
            successfullySavedFiles,
            alreadyExistedFiles,
            unableToSaveFiles
        });
    } catch (e) {
        console.log(e);
        return next_response/* default */.Z.json({
            error: true,
            type: "router handler",
            message: e.message,
            successfullySavedFiles,
            alreadyExistedFiles,
            unableToSaveFiles
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Ftest%2Froute&name=app%2Fapi%2Ftest%2Froute&pagePath=private-next-app-dir%2Fapi%2Ftest%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ftest-next%2Fsrc%2Fapp&appPaths=%2Fapi%2Ftest%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/test/route","pathname":"/api/test","filename":"route","bundlePath":"app/api/test/route"},"resolvedPagePath":"/data/data/com.termux/files/home/test-next/src/app/api/test/route.ts","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/test/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [318,451,644], () => (__webpack_exec__(5815)));
module.exports = __webpack_exports__;

})();