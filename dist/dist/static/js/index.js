/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconsole.log('index js loaded');\n\n/*\n\nimport {AppView} from \"./components/app/app-view\";\nimport {SpyneApp, ViewStream, ChannelsBaseData} from 'spynejs';\nimport {ChannelData500px} from './channels/channel-data-500px';\n\nconst css = require(\"./../scss/main.scss\");\n\n\n\nconst spyneConfig = {\n\n    channels: {\n\n        WINDOW: {\n            mediqQueries: {\n                \"test\" : \"(max-width: 500px)\",\n                \"newTest\" : \"(max-width: 800px)\"\n            }\n        },\n\n        ROUTE: {\n            type: 'slash', /!* \"slash\", \"query\" *!/\n            isHash: false,\n            isHidden: false,\n            routes: {\n                'route': {\n                    'keyword': 'pageId',\n                    'home': '',\n                    'page-one': {\n                        'route': {\n                            'keyword': 'imageNum',\n                            'route': {\n                                'keyword': 'author'\n                            },\n                        },\n                    },\n                    'page-two': {\n                        'route': {\n                            'keyword': 'photogNum'\n                        },\n                    },\n                    'page-.*' : {\n                        'route': {\n                            'keyword': 'randomNum'\n                        }\n                    }\n                },\n\n            },\n\n        },\n    },\n\n};\n\n//console.log(\"CHANNEL CONFIG \",spyneConfig);\n\n\n\nconst spyneApp = new SpyneApp(spyneConfig);\nconst mapFn = (data)=>{\n    const updates  = (img)=> {\n        img.description = img.description === null\n            ? img.name\n            : img.description;\n        img['perpsectiveNum'] = String((img.height / img.width)*100+\"%\");\n        return img;\n    };\n    data.photos = R.map(updates, data.photos);\n    return data.photos;\n};\nconst pixData = {\n    dataUrl : \"https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5\",\n    name : 'ChannelData500px',\n    map: mapFn\n};\n\n//spyneApp.registerChannel('ChannelData500px', new ChannelData500px());\nspyneApp.registerDataChannel(new ChannelsBaseData(pixData));\n\nconst App = new AppView({\n    el: document.getElementById('example-app')\n});\n\nconst Rx = require('rxjs');\nconst R = require(\"ramda\");\nwindow.R = R;\nwindow.Rx = Rx;\n*/\n\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ })

/******/ });