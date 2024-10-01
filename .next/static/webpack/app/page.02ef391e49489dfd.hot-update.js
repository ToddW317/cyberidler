"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/components/BlackMarket.tsx":
/*!****************************************!*\
  !*** ./app/components/BlackMarket.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BlackMarket: function() { return /* binding */ BlackMarket; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ \"(app-pages-browser)/./node_modules/@swc/helpers/esm/_sliced_to_array.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _game_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../game/store */ \"(app-pages-browser)/./game/store.ts\");\n\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\nvar BlackMarket = function() {\n    var _gameState_blackMarket, _blackMarketRef_current;\n    _s();\n    var gameState = (0,_game_store__WEBPACK_IMPORTED_MODULE_2__.useGameStore)();\n    var illegalGoodsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(gameState.illegalGoods || []);\n    var blackMarketRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(gameState.blackMarket);\n    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), 2), selectedGood = _useState[0], setSelectedGood = _useState[1];\n    var _useState1 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0), 2), quantity = _useState1[0], setQuantity = _useState1[1];\n    var _useState2 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0), 2), price = _useState2[0], setPrice = _useState2[1];\n    var _useState3 = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_3__._)((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(((_gameState_blackMarket = gameState.blackMarket) === null || _gameState_blackMarket === void 0 ? void 0 : _gameState_blackMarket.orders) || []), 2), orders = _useState3[0], setOrders = _useState3[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        var _gameState_blackMarket;\n        illegalGoodsRef.current = gameState.illegalGoods || [];\n        blackMarketRef.current = gameState.blackMarket;\n        setOrders(((_gameState_blackMarket = gameState.blackMarket) === null || _gameState_blackMarket === void 0 ? void 0 : _gameState_blackMarket.orders) || []);\n    }, [\n        gameState.illegalGoods,\n        gameState.blackMarket\n    ]);\n    var handleCreateOrder = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function() {\n        if (selectedGood && quantity > 0 && price > 0) {\n            var good = illegalGoodsRef.current.find(function(g) {\n                return g.id === selectedGood;\n            });\n            if (good) {\n                gameState.createBlackMarketOrder({\n                    sellerId: \"player\",\n                    resourceType: good.name,\n                    quantity: quantity,\n                    pricePerUnit: price,\n                    riskFactor: good.riskFactor\n                });\n                setSelectedGood(null);\n                setQuantity(0);\n                setPrice(0);\n            }\n        }\n    }, [\n        selectedGood,\n        quantity,\n        price,\n        gameState\n    ]);\n    var handleFulfillOrder = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function(orderId) {\n        gameState.fulfillBlackMarketOrder(orderId);\n    }, [\n        gameState\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"p-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-2xl font-bold mb-4\",\n                children: \"Black Market\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: [\n                    \"Reputation: \",\n                    ((_blackMarketRef_current = blackMarketRef.current) === null || _blackMarketRef_current === void 0 ? void 0 : _blackMarketRef_current.reputation.toFixed(2)) || \"0.00\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: \"text-xl font-semibold mb-2\",\n                        children: \"Create Order\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                        value: selectedGood || \"\",\n                        onChange: function(e) {\n                            return setSelectedGood(e.target.value);\n                        },\n                        className: \"block w-full p-2 mb-2 border rounded\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                value: \"\",\n                                children: \"Select an illegal good\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 11\n                            }, _this),\n                            illegalGoodsRef.current.map(function(good) {\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: good.id,\n                                    children: good.name\n                                }, good.id, false, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 56,\n                                    columnNumber: 13\n                                }, _this);\n                            })\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 49,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"number\",\n                        value: quantity,\n                        onChange: function(e) {\n                            return setQuantity(Number(e.target.value));\n                        },\n                        placeholder: \"Quantity\",\n                        className: \"block w-full p-2 mb-2 border rounded\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"number\",\n                        value: price,\n                        onChange: function(e) {\n                            return setPrice(Number(e.target.value));\n                        },\n                        placeholder: \"Price per unit\",\n                        className: \"block w-full p-2 mb-2 border rounded\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleCreateOrder,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"Create Black Market Order\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-6\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: \"text-xl font-semibold mb-2\",\n                        children: \"Active Orders\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, _this),\n                    orders.map(function(order) {\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"border p-4 rounded mb-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Resource: \",\n                                        order.resourceType\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 13\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Quantity: \",\n                                        order.quantity\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 86,\n                                    columnNumber: 13\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Price per unit: \",\n                                        order.pricePerUnit\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    children: [\n                                        \"Risk factor: \",\n                                        order.riskFactor\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 88,\n                                    columnNumber: 13\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: function() {\n                                        return handleFulfillOrder(order.id);\n                                    },\n                                    className: \"bg-yellow-500 text-white px-4 py-2 rounded mt-2\",\n                                    children: \"Fulfill Order\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                                    lineNumber: 89,\n                                    columnNumber: 13\n                                }, _this)\n                            ]\n                        }, order.id, true, {\n                            fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                            lineNumber: 84,\n                            columnNumber: 11\n                        }, _this);\n                    })\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\User\\\\Documents\\\\GitHub\\\\cyberidler\\\\app\\\\components\\\\BlackMarket.tsx\",\n        lineNumber: 43,\n        columnNumber: 5\n    }, _this);\n};\n_s(BlackMarket, \"3hvNpx/aBq6ChSLWiBRUgh4AXss=\", false, function() {\n    return [\n        _game_store__WEBPACK_IMPORTED_MODULE_2__.useGameStore\n    ];\n});\n_c = BlackMarket;\nvar _c;\n$RefreshReg$(_c, \"BlackMarket\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL0JsYWNrTWFya2V0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ3hCO0FBRXpDLElBQU1NLGNBQXdCO1FBUUVDLHdCQWlDakJDOztJQXhDcEIsSUFBTUQsWUFBWUYseURBQVlBO0lBQzlCLElBQU1JLGtCQUFrQkwsNkNBQU1BLENBQUNHLFVBQVVHLFlBQVksSUFBSSxFQUFFO0lBQzNELElBQU1GLGlCQUFpQkosNkNBQU1BLENBQUNHLFVBQVVJLFdBQVc7SUFFbkQsSUFBd0NWLFlBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBZ0IsV0FBekRXLGVBQWlDWCxjQUFuQlksa0JBQW1CWjtJQUN4QyxJQUFnQ0EsYUFBQUEsK0RBQUFBLENBQUFBLCtDQUFRQSxDQUFDLFFBQWxDYSxXQUF5QmIsZUFBZmMsY0FBZWQ7SUFDaEMsSUFBMEJBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQyxRQUE1QmUsUUFBbUJmLGVBQVpnQixXQUFZaEI7SUFDMUIsSUFBNEJBLGFBQUFBLCtEQUFBQSxDQUFBQSwrQ0FBUUEsQ0FBQ00sRUFBQUEseUJBQUFBLFVBQVVJLFdBQVcsY0FBckJKLDZDQUFBQSx1QkFBdUJXLE1BQU0sS0FBSSxFQUFFLE9BQWpFQSxTQUFxQmpCLGVBQWJrQixZQUFhbEI7SUFFNUJFLGdEQUFTQSxDQUFDO1lBR0VJO1FBRlZFLGdCQUFnQlcsT0FBTyxHQUFHYixVQUFVRyxZQUFZLElBQUksRUFBRTtRQUN0REYsZUFBZVksT0FBTyxHQUFHYixVQUFVSSxXQUFXO1FBQzlDUSxVQUFVWixFQUFBQSx5QkFBQUEsVUFBVUksV0FBVyxjQUFyQkosNkNBQUFBLHVCQUF1QlcsTUFBTSxLQUFJLEVBQUU7SUFDL0MsR0FBRztRQUFDWCxVQUFVRyxZQUFZO1FBQUVILFVBQVVJLFdBQVc7S0FBQztJQUVsRCxJQUFNVSxvQkFBb0JuQixrREFBV0EsQ0FBQztRQUNwQyxJQUFJVSxnQkFB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LnRzeD9jODQzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VHYW1lU3RvcmUgfSBmcm9tICcuLi8uLi9nYW1lL3N0b3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCBCbGFja01hcmtldDogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgY29uc3QgZ2FtZVN0YXRlID0gdXNlR2FtZVN0b3JlKCk7XHJcbiAgY29uc3QgaWxsZWdhbEdvb2RzUmVmID0gdXNlUmVmKGdhbWVTdGF0ZS5pbGxlZ2FsR29vZHMgfHwgW10pO1xyXG4gIGNvbnN0IGJsYWNrTWFya2V0UmVmID0gdXNlUmVmKGdhbWVTdGF0ZS5ibGFja01hcmtldCk7XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZEdvb2QsIHNldFNlbGVjdGVkR29vZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbcXVhbnRpdHksIHNldFF1YW50aXR5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtwcmljZSwgc2V0UHJpY2VdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW29yZGVycywgc2V0T3JkZXJzXSA9IHVzZVN0YXRlKGdhbWVTdGF0ZS5ibGFja01hcmtldD8ub3JkZXJzIHx8IFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlsbGVnYWxHb29kc1JlZi5jdXJyZW50ID0gZ2FtZVN0YXRlLmlsbGVnYWxHb29kcyB8fCBbXTtcclxuICAgIGJsYWNrTWFya2V0UmVmLmN1cnJlbnQgPSBnYW1lU3RhdGUuYmxhY2tNYXJrZXQ7XHJcbiAgICBzZXRPcmRlcnMoZ2FtZVN0YXRlLmJsYWNrTWFya2V0Py5vcmRlcnMgfHwgW10pO1xyXG4gIH0sIFtnYW1lU3RhdGUuaWxsZWdhbEdvb2RzLCBnYW1lU3RhdGUuYmxhY2tNYXJrZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ3JlYXRlT3JkZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoc2VsZWN0ZWRHb29kICYmIHF1YW50aXR5ID4gMCAmJiBwcmljZSA+IDApIHtcclxuICAgICAgY29uc3QgZ29vZCA9IGlsbGVnYWxHb29kc1JlZi5jdXJyZW50LmZpbmQoZyA9PiBnLmlkID09PSBzZWxlY3RlZEdvb2QpO1xyXG4gICAgICBpZiAoZ29vZCkge1xyXG4gICAgICAgIGdhbWVTdGF0ZS5jcmVhdGVCbGFja01hcmtldE9yZGVyKHtcclxuICAgICAgICAgIHNlbGxlcklkOiAncGxheWVyJyxcclxuICAgICAgICAgIHJlc291cmNlVHlwZTogZ29vZC5uYW1lLFxyXG4gICAgICAgICAgcXVhbnRpdHksXHJcbiAgICAgICAgICBwcmljZVBlclVuaXQ6IHByaWNlLFxyXG4gICAgICAgICAgcmlza0ZhY3RvcjogZ29vZC5yaXNrRmFjdG9yLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFNlbGVjdGVkR29vZChudWxsKTtcclxuICAgICAgICBzZXRRdWFudGl0eSgwKTtcclxuICAgICAgICBzZXRQcmljZSgwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFtzZWxlY3RlZEdvb2QsIHF1YW50aXR5LCBwcmljZSwgZ2FtZVN0YXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUZ1bGZpbGxPcmRlciA9IHVzZUNhbGxiYWNrKChvcmRlcklkOiBzdHJpbmcpID0+IHtcclxuICAgIGdhbWVTdGF0ZS5mdWxmaWxsQmxhY2tNYXJrZXRPcmRlcihvcmRlcklkKTtcclxuICB9LCBbZ2FtZVN0YXRlXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNFwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLTRcIj5CbGFjayBNYXJrZXQ8L2gyPlxyXG4gICAgICA8cD5SZXB1dGF0aW9uOiB7YmxhY2tNYXJrZXRSZWYuY3VycmVudD8ucmVwdXRhdGlvbi50b0ZpeGVkKDIpIHx8ICcwLjAwJ308L3A+XHJcbiAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTRcIj5cclxuICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LXNlbWlib2xkIG1iLTJcIj5DcmVhdGUgT3JkZXI8L2gzPlxyXG4gICAgICAgIDxzZWxlY3RcclxuICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZEdvb2QgfHwgJyd9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkR29vZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayB3LWZ1bGwgcC0yIG1iLTIgYm9yZGVyIHJvdW5kZWRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYW4gaWxsZWdhbCBnb29kPC9vcHRpb24+XHJcbiAgICAgICAgICB7aWxsZWdhbEdvb2RzUmVmLmN1cnJlbnQubWFwKChnb29kKSA9PiAoXHJcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtnb29kLmlkfSB2YWx1ZT17Z29vZC5pZH0+e2dvb2QubmFtZX08L29wdGlvbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICB2YWx1ZT17cXVhbnRpdHl9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1YW50aXR5KE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJRdWFudGl0eVwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayB3LWZ1bGwgcC0yIG1iLTIgYm9yZGVyIHJvdW5kZWRcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgIHZhbHVlPXtwcmljZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJpY2UoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlByaWNlIHBlciB1bml0XCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHctZnVsbCBwLTIgbWItMiBib3JkZXIgcm91bmRlZFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDcmVhdGVPcmRlcn1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXJlZC01MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgQ3JlYXRlIEJsYWNrIE1hcmtldCBPcmRlclxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNlwiPlxyXG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgbWItMlwiPkFjdGl2ZSBPcmRlcnM8L2gzPlxyXG4gICAgICAgIHtvcmRlcnMubWFwKChvcmRlcikgPT4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e29yZGVyLmlkfSBjbGFzc05hbWU9XCJib3JkZXIgcC00IHJvdW5kZWQgbWItNFwiPlxyXG4gICAgICAgICAgICA8cD5SZXNvdXJjZToge29yZGVyLnJlc291cmNlVHlwZX08L3A+XHJcbiAgICAgICAgICAgIDxwPlF1YW50aXR5OiB7b3JkZXIucXVhbnRpdHl9PC9wPlxyXG4gICAgICAgICAgICA8cD5QcmljZSBwZXIgdW5pdDoge29yZGVyLnByaWNlUGVyVW5pdH08L3A+XHJcbiAgICAgICAgICAgIDxwPlJpc2sgZmFjdG9yOiB7b3JkZXIucmlza0ZhY3Rvcn08L3A+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVGdWxmaWxsT3JkZXIob3JkZXIuaWQpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXllbGxvdy01MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZCBtdC0yXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIEZ1bGZpbGwgT3JkZXJcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59OyJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VHYW1lU3RvcmUiLCJCbGFja01hcmtldCIsImdhbWVTdGF0ZSIsImJsYWNrTWFya2V0UmVmIiwiaWxsZWdhbEdvb2RzUmVmIiwiaWxsZWdhbEdvb2RzIiwiYmxhY2tNYXJrZXQiLCJzZWxlY3RlZEdvb2QiLCJzZXRTZWxlY3RlZEdvb2QiLCJxdWFudGl0eSIsInNldFF1YW50aXR5IiwicHJpY2UiLCJzZXRQcmljZSIsIm9yZGVycyIsInNldE9yZGVycyIsImN1cnJlbnQiLCJoYW5kbGVDcmVhdGVPcmRlciIsImdvb2QiLCJmaW5kIiwiZyIsImlkIiwiY3JlYXRlQmxhY2tNYXJrZXRPcmRlciIsInNlbGxlcklkIiwicmVzb3VyY2VUeXBlIiwibmFtZSIsInByaWNlUGVyVW5pdCIsInJpc2tGYWN0b3IiLCJoYW5kbGVGdWxmaWxsT3JkZXIiLCJvcmRlcklkIiwiZnVsZmlsbEJsYWNrTWFya2V0T3JkZXIiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsInAiLCJyZXB1dGF0aW9uIiwidG9GaXhlZCIsImgzIiwic2VsZWN0IiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJvcHRpb24iLCJtYXAiLCJpbnB1dCIsInR5cGUiLCJOdW1iZXIiLCJwbGFjZWhvbGRlciIsImJ1dHRvbiIsIm9uQ2xpY2siLCJvcmRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/BlackMarket.tsx\n"));

/***/ })

});