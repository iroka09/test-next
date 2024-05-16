"use strict";
(() => {
var exports = {};
exports.id = 155;
exports.ids = [155];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 2650:
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

// NAMESPACE OBJECT: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./src/app/favicon.ico?__next_metadata_route__
var favicon_next_metadata_route_namespaceObject = {};
__webpack_require__.r(favicon_next_metadata_route_namespaceObject);
__webpack_require__.d(favicon_next_metadata_route_namespaceObject, {
  GET: () => (GET),
  dynamic: () => (dynamic)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(6519);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3488);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
;// CONCATENATED MODULE: external "next/server"
const server_namespaceObject = require("next/server");
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ffavicon.ico%2Froute&isDynamic=0!./src/app/favicon.ico?__next_metadata_route__


const contentType = "image/x-icon"
const buffer = Buffer.from("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", 'base64'
  )

function GET() {
  return new server_namespaceObject.NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': "public, max-age=0, must-revalidate",
    },
  })
}

const dynamic = 'force-static'

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ffavicon.ico%2Froute&name=app%2Ffavicon.ico%2Froute&pagePath=private-next-app-dir%2Ffavicon.ico&appDir=%2Fdata%2Fdata%2Fcom.termux%2Ffiles%2Fhome%2Ftest-next%2Fsrc%2Fapp&appPaths=%2Ffavicon.ico&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/favicon.ico/route","pathname":"/favicon.ico","filename":"favicon","bundlePath":"app/favicon.ico/route"},"resolvedPagePath":"next-metadata-route-loader?page=%2Ffavicon.ico%2Froute&isDynamic=0!/data/data/com.termux/files/home/test-next/src/app/favicon.ico?__next_metadata_route__","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: favicon_next_metadata_route_namespaceObject,
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

    const originalPathname = "/favicon.ico/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [318,451], () => (__webpack_exec__(2650)));
module.exports = __webpack_exports__;

})();