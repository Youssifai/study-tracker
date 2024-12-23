"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/todos/[id]/route";
exports.ids = ["app/api/todos/[id]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftodos%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftodos%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_joey_Downloads_Projects_studytracker_app_api_todos_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/todos/[id]/route.ts */ \"(rsc)/./app/api/todos/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/todos/[id]/route\",\n        pathname: \"/api/todos/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/todos/[id]/route\"\n    },\n    resolvedPagePath: \"/Users/joey/Downloads/Projects/studytracker/app/api/todos/[id]/route.ts\",\n    nextConfigOutput,\n    userland: _Users_joey_Downloads_Projects_studytracker_app_api_todos_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/todos/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ0b2RvcyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0b2RvcyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdG9kb3MlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmpvZXklMkZEb3dubG9hZHMlMkZQcm9qZWN0cyUyRnN0dWR5dHJhY2tlciUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZqb2V5JTJGRG93bmxvYWRzJTJGUHJvamVjdHMlMkZzdHVkeXRyYWNrZXImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDdUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkeXRyYWNrZXIvP2JkNGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2pvZXkvRG93bmxvYWRzL1Byb2plY3RzL3N0dWR5dHJhY2tlci9hcHAvYXBpL3RvZG9zL1tpZF0vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3RvZG9zL1tpZF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90b2Rvcy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS90b2Rvcy9baWRdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2pvZXkvRG93bmxvYWRzL1Byb2plY3RzL3N0dWR5dHJhY2tlci9hcHAvYXBpL3RvZG9zL1tpZF0vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdG9kb3MvW2lkXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftodos%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    debug: true,\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                try {\n                    if (!credentials?.email || !credentials?.password) {\n                        throw new Error(\"Missing credentials\");\n                    }\n                    const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email\n                        }\n                    });\n                    if (!user) {\n                        throw new Error(\"User not found\");\n                    }\n                    const isPasswordValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_3__.compare)(credentials.password, user.passwordHash);\n                    if (!isPasswordValid) {\n                        throw new Error(\"Invalid password\");\n                    }\n                    return {\n                        id: user.id,\n                        email: user.email,\n                        name: user.name\n                    };\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n            }\n            return session;\n        }\n    }\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBaUM7QUFDaUM7QUFDNUI7QUFDSDtBQWE1QixNQUFNSSxjQUErQjtJQUMxQ0MsT0FBTztJQUNQQyxXQUFXO1FBQ1RMLDJFQUFtQkEsQ0FBQztZQUNsQk0sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUk7b0JBQ0YsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7d0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtvQkFDbEI7b0JBRUEsTUFBTUMsT0FBTyxNQUFNYiwrQ0FBTUEsQ0FBQ2EsSUFBSSxDQUFDQyxVQUFVLENBQUM7d0JBQ3hDQyxPQUFPOzRCQUNMUixPQUFPRCxZQUFZQyxLQUFLO3dCQUMxQjtvQkFDRjtvQkFFQSxJQUFJLENBQUNNLE1BQU07d0JBQ1QsTUFBTSxJQUFJRCxNQUFNO29CQUNsQjtvQkFFQSxNQUFNSSxrQkFBa0IsTUFBTWYsaURBQU9BLENBQUNLLFlBQVlJLFFBQVEsRUFBRUcsS0FBS0ksWUFBWTtvQkFFN0UsSUFBSSxDQUFDRCxpQkFBaUI7d0JBQ3BCLE1BQU0sSUFBSUosTUFBTTtvQkFDbEI7b0JBRUEsT0FBTzt3QkFDTE0sSUFBSUwsS0FBS0ssRUFBRTt3QkFDWFgsT0FBT00sS0FBS04sS0FBSzt3QkFDakJGLE1BQU1RLEtBQUtSLElBQUk7b0JBQ2pCO2dCQUNGLEVBQUUsT0FBT2MsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLGVBQWVBO29CQUM3QixPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RFLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUNuQ0MsT0FBTztRQUNMQyxRQUFRO1FBQ1JULE9BQU87SUFDVDtJQUNBVSxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVsQixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmtCLE1BQU1iLEVBQUUsR0FBR0wsS0FBS0ssRUFBRTtnQkFDbEJhLE1BQU14QixLQUFLLEdBQUdNLEtBQUtOLEtBQUs7WUFDMUI7WUFDQSxPQUFPd0I7UUFDVDtRQUNBLE1BQU1WLFNBQVEsRUFBRUEsT0FBTyxFQUFFVSxLQUFLLEVBQUU7WUFDOUIsSUFBSVYsUUFBUVIsSUFBSSxFQUFFO2dCQUNoQlEsUUFBUVIsSUFBSSxDQUFDSyxFQUFFLEdBQUdhLE1BQU1iLEVBQUU7Z0JBQzFCRyxRQUFRUixJQUFJLENBQUNOLEtBQUssR0FBR3dCLE1BQU14QixLQUFLO1lBQ2xDO1lBQ0EsT0FBT2M7UUFDVDtJQUNGO0FBQ0YsRUFBRTtBQUVGLE1BQU1XLFVBQVVsQyxnREFBUUEsQ0FBQ0k7QUFDa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHVkeXRyYWNrZXIvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm5leHQtYXV0aFwiIHtcbiAgaW50ZXJmYWNlIFNlc3Npb24ge1xuICAgIHVzZXI6IHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgICBlbWFpbDogc3RyaW5nO1xuICAgICAgbmFtZT86IHN0cmluZztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGRlYnVnOiB0cnVlLFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgY3JlZGVudGlhbHNcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgbm90IGZvdW5kXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKTtcblxuICAgICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBhc3N3b3JkXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkF1dGggZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBlcnJvcjogJy9sb2dpbicsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4uZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nO1xuICAgICAgICBzZXNzaW9uLnVzZXIuZW1haWwgPSB0b2tlbi5lbWFpbCBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9XG4gIH0sXG59O1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9OyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwicHJpc21hIiwiY29tcGFyZSIsImF1dGhPcHRpb25zIiwiZGVidWciLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwicGFzc3dvcmRIYXNoIiwiaWQiLCJlcnJvciIsImNvbnNvbGUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/todos/[id]/route.ts":
/*!*************************************!*\
  !*** ./app/api/todos/[id]/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/api/auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\n\nasync function PATCH(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user?.email) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Unauthorized\", {\n                status: 401\n            });\n        }\n        const data = await request.json();\n        const todo = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.todo.update({\n            where: {\n                id: params.id\n            },\n            data: {\n                completed: data.completed\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(todo);\n    } catch (error) {\n        console.error(\"Error updating todo:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Failed to update todo\", {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_app_api_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user?.email) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Unauthorized\", {\n                status: 401\n            });\n        }\n        // First verify that the todo belongs to the user\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n            where: {\n                email: session.user.email\n            }\n        });\n        if (!user) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"User not found\", {\n                status: 404\n            });\n        }\n        const todo = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.todo.findUnique({\n            where: {\n                id: params.id\n            }\n        });\n        if (!todo) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Todo not found\", {\n                status: 404\n            });\n        }\n        if (todo.userId !== user.id) {\n            return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Unauthorized\", {\n                status: 401\n            });\n        }\n        // Delete the todo\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.todo.delete({\n            where: {\n                id: params.id\n            }\n        });\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(null, {\n            status: 204\n        });\n    } catch (error) {\n        console.error(\"Error deleting todo:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(\"Failed to delete todo\", {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RvZG9zL1tpZF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEyQztBQUNFO0FBQ29CO0FBQzNCO0FBRS9CLGVBQWVJLE1BQ3BCQyxPQUFnQixFQUNoQixFQUFFQyxNQUFNLEVBQThCO0lBRXRDLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1OLDJEQUFnQkEsQ0FBQ0MscUVBQVdBO1FBQ2xELElBQUksQ0FBQ0ssU0FBU0MsTUFBTUMsT0FBTztZQUN6QixPQUFPLElBQUlULHFEQUFZQSxDQUFDLGdCQUFnQjtnQkFBRVUsUUFBUTtZQUFJO1FBQ3hEO1FBRUEsTUFBTUMsT0FBTyxNQUFNTixRQUFRTyxJQUFJO1FBQy9CLE1BQU1DLE9BQU8sTUFBTVYsK0NBQU1BLENBQUNVLElBQUksQ0FBQ0MsTUFBTSxDQUFDO1lBQ3BDQyxPQUFPO2dCQUFFQyxJQUFJVixPQUFPVSxFQUFFO1lBQUM7WUFDdkJMLE1BQU07Z0JBQUVNLFdBQVdOLEtBQUtNLFNBQVM7WUFBQztRQUNwQztRQUVBLE9BQU9qQixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDQztJQUMzQixFQUFFLE9BQU9LLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBTyxJQUFJbEIscURBQVlBLENBQUMseUJBQXlCO1lBQUVVLFFBQVE7UUFBSTtJQUNqRTtBQUNGO0FBRU8sZUFBZVUsT0FDcEJmLE9BQWdCLEVBQ2hCLEVBQUVDLE1BQU0sRUFBOEI7SUFFdEMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sMkRBQWdCQSxDQUFDQyxxRUFBV0E7UUFDbEQsSUFBSSxDQUFDSyxTQUFTQyxNQUFNQyxPQUFPO1lBQ3pCLE9BQU8sSUFBSVQscURBQVlBLENBQUMsZ0JBQWdCO2dCQUFFVSxRQUFRO1lBQUk7UUFDeEQ7UUFFQSxpREFBaUQ7UUFDakQsTUFBTUYsT0FBTyxNQUFNTCwrQ0FBTUEsQ0FBQ0ssSUFBSSxDQUFDYSxVQUFVLENBQUM7WUFDeENOLE9BQU87Z0JBQUVOLE9BQU9GLFFBQVFDLElBQUksQ0FBQ0MsS0FBSztZQUFDO1FBQ3JDO1FBRUEsSUFBSSxDQUFDRCxNQUFNO1lBQ1QsT0FBTyxJQUFJUixxREFBWUEsQ0FBQyxrQkFBa0I7Z0JBQUVVLFFBQVE7WUFBSTtRQUMxRDtRQUVBLE1BQU1HLE9BQU8sTUFBTVYsK0NBQU1BLENBQUNVLElBQUksQ0FBQ1EsVUFBVSxDQUFDO1lBQ3hDTixPQUFPO2dCQUFFQyxJQUFJVixPQUFPVSxFQUFFO1lBQUM7UUFDekI7UUFFQSxJQUFJLENBQUNILE1BQU07WUFDVCxPQUFPLElBQUliLHFEQUFZQSxDQUFDLGtCQUFrQjtnQkFBRVUsUUFBUTtZQUFJO1FBQzFEO1FBRUEsSUFBSUcsS0FBS1MsTUFBTSxLQUFLZCxLQUFLUSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJaEIscURBQVlBLENBQUMsZ0JBQWdCO2dCQUFFVSxRQUFRO1lBQUk7UUFDeEQ7UUFFQSxrQkFBa0I7UUFDbEIsTUFBTVAsK0NBQU1BLENBQUNVLElBQUksQ0FBQ1UsTUFBTSxDQUFDO1lBQ3ZCUixPQUFPO2dCQUFFQyxJQUFJVixPQUFPVSxFQUFFO1lBQUM7UUFDekI7UUFFQSxPQUFPLElBQUloQixxREFBWUEsQ0FBQyxNQUFNO1lBQUVVLFFBQVE7UUFBSTtJQUM5QyxFQUFFLE9BQU9RLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBTyxJQUFJbEIscURBQVlBLENBQUMseUJBQXlCO1lBQUVVLFFBQVE7UUFBSTtJQUNqRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3R1ZHl0cmFja2VyLy4vYXBwL2FwaS90b2Rvcy9baWRdL3JvdXRlLnRzP2YxNDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUnO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBBVENIKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogeyBpZDogc3RyaW5nIH0gfVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCdVbmF1dGhvcml6ZWQnLCB7IHN0YXR1czogNDAxIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCB0b2RvID0gYXdhaXQgcHJpc21hLnRvZG8udXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkOiBwYXJhbXMuaWQgfSxcbiAgICAgIGRhdGE6IHsgY29tcGxldGVkOiBkYXRhLmNvbXBsZXRlZCB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHRvZG8pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHRvZG86JywgZXJyb3IpO1xuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCdGYWlsZWQgdG8gdXBkYXRlIHRvZG8nLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBERUxFVEUoXG4gIHJlcXVlc3Q6IFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IGlkOiBzdHJpbmcgfSB9XG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5lbWFpbCkge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoJ1VuYXV0aG9yaXplZCcsIHsgc3RhdHVzOiA0MDEgfSk7XG4gICAgfVxuXG4gICAgLy8gRmlyc3QgdmVyaWZ5IHRoYXQgdGhlIHRvZG8gYmVsb25ncyB0byB0aGUgdXNlclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGVtYWlsOiBzZXNzaW9uLnVzZXIuZW1haWwgfSxcbiAgICB9KTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoJ1VzZXIgbm90IGZvdW5kJywgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2RvID0gYXdhaXQgcHJpc21hLnRvZG8uZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGFyYW1zLmlkIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIXRvZG8pIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKCdUb2RvIG5vdCBmb3VuZCcsIHsgc3RhdHVzOiA0MDQgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRvZG8udXNlcklkICE9PSB1c2VyLmlkKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZSgnVW5hdXRob3JpemVkJywgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgdGhlIHRvZG9cbiAgICBhd2FpdCBwcmlzbWEudG9kby5kZWxldGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHBhcmFtcy5pZCB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDIwNCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyB0b2RvOicsIGVycm9yKTtcbiAgICByZXR1cm4gbmV3IE5leHRSZXNwb25zZSgnRmFpbGVkIHRvIGRlbGV0ZSB0b2RvJywgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiUEFUQ0giLCJyZXF1ZXN0IiwicGFyYW1zIiwic2Vzc2lvbiIsInVzZXIiLCJlbWFpbCIsInN0YXR1cyIsImRhdGEiLCJqc29uIiwidG9kbyIsInVwZGF0ZSIsIndoZXJlIiwiaWQiLCJjb21wbGV0ZWQiLCJlcnJvciIsImNvbnNvbGUiLCJERUxFVEUiLCJmaW5kVW5pcXVlIiwidXNlcklkIiwiZGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/todos/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0dWR5dHJhY2tlci8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&page=%2Fapi%2Ftodos%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftodos%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjoey%2FDownloads%2FProjects%2Fstudytracker&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();