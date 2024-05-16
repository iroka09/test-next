exports.id = 700;
exports.ids = [700];
exports.modules = {

/***/ 3381:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2927, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7850))

/***/ }),

/***/ 7850:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ReduxProvider)
});

// EXTERNAL MODULE: external "next/dist/compiled/react-experimental/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6931);
// EXTERNAL MODULE: external "next/dist/compiled/react-experimental"
var react_experimental_ = __webpack_require__(7640);
// EXTERNAL MODULE: ./node_modules/react-redux/dist/react-redux.mjs
var react_redux = __webpack_require__(1368);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs + 4 modules
var redux_toolkit_modern = __webpack_require__(2049);
// EXTERNAL MODULE: ./src/components/redux/userSlice.ts
var userSlice = __webpack_require__(6180);
// EXTERNAL MODULE: ./node_modules/js-cookie/dist/js.cookie.mjs
var js_cookie = __webpack_require__(7270);
;// CONCATENATED MODULE: ./src/components/redux/store.ts



const loadInitialState = ()=>{
    alert("loadInitialState");
};
const testMiddleware = (store)=>(next)=>(action)=>{
            console.log("testMiddleware");
            return next(action);
        };
const makeStore = ()=>(0,redux_toolkit_modern/* configureStore */.xC)({
        reducer: {
            user: userSlice/* default */.ZP
        }
    });
const store = (0,redux_toolkit_modern/* configureStore */.xC)({
    reducer: {
        user: userSlice/* default */.ZP
    },
    ...globalThis.document && {
        preloadedState: loadInitialState(),
        middleware: (defaultOnes)=>{
            return defaultOnes().concat(testMiddleware);
        }
    }
});
store.subscribe(async ()=>{
    try {
        if (window.hydrated !== true) return;
        const result = js_cookie/* default */.Z.set("redux-state", JSON.stringify(store.getState()), {
            path: "/",
            sameSite: "strict",
            secure: false,
            expires: 1
        });
        console.log("store.subscribe(): ", js_cookie/* default */.Z.get());
    } catch (e) {
        console.warn("store.subscribe(): ", e);
    }
});
/* harmony default export */ const redux_store = (store);

// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9483);
;// CONCATENATED MODULE: ./src/components/ReduxProvider.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





console.log("outside component=" + Math.random());
/* harmony default export */ function ReduxProvider({ initialStoreState: state, children }) {
    const mainStore = (()=>{
        if (!globalThis.document) {
            const _store = makeStore();
            if (state?.user) {
                _store.dispatch((0,userSlice/* changeName */.eu)(state.user.name));
                _store.dispatch((0,userSlice/* changeAge */.yJ)(state.user.age));
            }
            return _store;
        }
        if (!globalThis.hydrated && state?.user) {
            redux_store.dispatch((0,userSlice/* changeName */.eu)(state.user.name));
            redux_store.dispatch((0,userSlice/* changeAge */.yJ)(state.user.age));
        }
        return redux_store;
    })();
    const pathname = (0,navigation.usePathname)();
    (0,react_experimental_.useEffect)(()=>{
        window.hydrated = true;
        window.eruda?.init();
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_redux/* Provider */.zt, {
        store: mainStore,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: pathname
            }),
            children
        ]
    });
}


/***/ }),

/***/ 6180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   eu: () => (/* binding */ changeName),
/* harmony export */   yJ: () => (/* binding */ changeAge)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2049);

const themeSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__/* .createSlice */ .oM)({
    name: "user",
    initialState: {
        name: "unknown",
        age: "unknown"
    },
    reducers: {
        changeName (state, { payload }) {
            state.name = payload;
        },
        changeAge (state, { payload }) {
            state.age = payload;
        }
    }
});
const { changeName, changeAge } = themeSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (themeSlice.reducer);


/***/ }),

/***/ 1318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react-experimental/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6931);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1913);
;// CONCATENATED MODULE: ./src/components/ReduxProvider.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/data/data/com.termux/files/home/test-next/src/components/ReduxProvider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const ReduxProvider = (__default__);
// EXTERNAL MODULE: ./node_modules/next/script.js
var script = __webpack_require__(9663);
var script_default = /*#__PURE__*/__webpack_require__.n(script);
// EXTERNAL MODULE: ./node_modules/next/headers.js
var headers = __webpack_require__(6997);
// EXTERNAL MODULE: ./src/styles/global.css
var global = __webpack_require__(1063);
;// CONCATENATED MODULE: ./src/app/layout.tsx





const metadata = {
    title: "Testing Redux"
};
const fetchData = async ()=>{
    try {
        const storedData = JSON.parse((0,headers.cookies)().get("redux-state")?.value);
        if (Object.keys(storedData).length === 0) {
            throw {
                message: "incomplete records"
            };
        }
        return storedData;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
/* harmony default export */ async function layout({ children }) {
    const data = await fetchData();
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(ReduxProvider, {
                    initialStoreState: data,
                    children: children
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((script_default()), {
                    src: "/static/eruda.js",
                    strategy: "beforeInteractive"
                })
            ]
        })
    });
}


/***/ }),

/***/ 2819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3785);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 1063:
/***/ (() => {



/***/ })

};
;