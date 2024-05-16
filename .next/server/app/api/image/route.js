"use strict";
(() => {
var exports = {};
exports.id = 649;
exports.ids = [649];
exports.modules = {

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

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

/***/ 1761:
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

// NAMESPACE OBJECT: ./src/app/api/image/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6519);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3488);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(2023);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ./node_modules/random/dist/random.module.js
var random_module = __webpack_require__(7916);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: ./node_modules/file-type/core.js + 10 modules
var core = __webpack_require__(1477);
;// CONCATENATED MODULE: ./src/app/api/image/route.ts





async function GET(req) {
    try {
        const urlObj = new URL(req.url);
        const hasDownload = urlObj.searchParams.has("download");
        const dir1 = external_path_default().join("/sdcard", "Xender", "image");
        const dir2 = external_path_default().join("/sdcard", "Pictures", "facebook");
        const dir3 = external_path_default().join("/sdcard", "WhatsApp", "Media", "WhatsApp Images");
        const filterDir = (dir)=>external_fs_default().readdirSync(dir).filter((x)=>/.+\.(jpg|png|svg)$/i.test(x)).map((x)=>external_path_default().join(dir, x));
        const imageDirs = filterDir(dir1).concat(filterDir(dir2), filterDir(dir3));
        const choosenImageDir = random_module/* default */.ZP.choice(imageDirs);
        if (!choosenImageDir) throw {
            message: "no image in imageDirs"
        };
        const readStream = async (stream)=>{
            const chunks = [];
            let totalChunksBytes = 0;
            const minimumRequiredChunksBytes = 2 ** 10 * 5 //5KB
            ;
            for await (const chunk of stream){
                chunks.push(chunk);
                totalChunksBytes += chunk.length;
                if (totalChunksBytes >= minimumRequiredChunksBytes) break;
            }
            return Buffer.concat(chunks);
        };
        const buffer = await readStream(external_fs_default().createReadStream(choosenImageDir));
        const trustedImageMeta = await (0,core/* fileTypeFromBuffer */.pM)(buffer);
        // console.log(trustedImageMeta)
        if (!("ext" in trustedImageMeta)) throw {
            message: "bad trustedImageMeta"
        };
        if (!/^(jpg|jpeg|png|svg)$/i.test(trustedImageMeta.ext)) {
            throw {
                message: choosenImageDir + " is not image"
            };
        }
        const stream = external_fs_default().createReadStream(choosenImageDir);
        return new next_response/* default */.Z(stream, {
            headers: {
                "Content-Type": trustedImageMeta.mime,
                "Cache-Control": "private, max-age=" + 30,
                // "Cache-Control": "public, must-revalidate",
                // "Cache-Control": "no-cache",
                ...hasDownload ? {
                    "Content-Disposition": `attachment; filename=${choosenImageDir.match(/[^\/\\]+$/).toString()}`
                } : {}
            },
            status: 200
        });
    } catch (e) {
        console.log(e.message);
        return new next_response/* default */.Z(e.message);
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fimage%2Froute&name=app%2Fapi%2Fimage%2Froute&pagePath=private-next-app-dir%2Fapi%2Fimage%2Froute.ts&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ftest-next%2Fsrc%2Fapp&appPaths=%2Fapi%2Fimage%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/image/route","pathname":"/api/image","filename":"route","bundlePath":"app/api/image/route"},"resolvedPagePath":"/data/data/com.termux/files/home/test-next/src/app/api/image/route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/image/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [318,451,644,916], () => (__webpack_exec__(1761)));
module.exports = __webpack_exports__;

})();