(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("matter-js"));
	else if(typeof define === 'function' && define.amd)
		define(["matter-js"], factory);
	else if(typeof exports === 'object')
		exports["MatterCollisionEvents"] = factory(require("matter-js"));
	else
		root["MatterCollisionEvents"] = factory(root["Matter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Matter = __webpack_require__(0);
var MatterCollisionEvents = {
  name: 'matter-collision-events',
  version: '0.1.5',
  for: 'matter-js@^0.12.0',
  install: function(matter) {
    // add the onCollide, onCollideEnd, and onCollideActive callback handlers
    // to the native Matter.Body created
    var create = matter.Body.create;
    matter.Body.create = function() {
      var body = create.apply(null, arguments);
      body.onCollide = function(cb) { body._mceOC = cb; }
      body.onCollideEnd = function(cb) { body._mceOCE = cb; }
      body.onCollideActive = function(cb) { body._mceOCA = cb; }
      return body;
    }
    matter.after('Engine.create', function() {
      matter.Events.on(this, 'collisionStart', function(event) {
        event.pairs.map(function(pair) {
          matter.Events.trigger(pair.bodyA, 'onCollide', { pair : pair });
          matter.Events.trigger(pair.bodyB, 'onCollide', { pair : pair });
          pair.bodyA._mceOC &&
            pair.bodyA._mceOC(pair)
          pair.bodyB._mceOC &&
            pair.bodyB._mceOC(pair)
        });
      });

      matter.Events.on(this, 'collisionActive', function(event) {
        event.pairs.map(function(pair) {
          matter.Events.trigger(
            pair.bodyA,
            'onCollideActive',
            { pair: pair }
          );
          matter.Events.trigger(
            pair.bodyB,
            'onCollideActive',
            { pair: pair }
          );
          pair.bodyA._mceOCA &&
            pair.bodyA._mceOCA(pair)
          pair.bodyB._mceOCA &&
            pair.bodyB._mceOCA(pair)
        });
      });

      matter.Events.on(this, 'collisionEnd', function(event) {
        event.pairs.map(function(pair) {
          matter.Events.trigger(pair.bodyA, 'onCollideEnd', { pair : pair });
          matter.Events.trigger(pair.bodyB, 'onCollideEnd', { pair : pair });
          pair.bodyA._mceOCE &&
            pair.bodyA._mceOCE(pair)
          pair.bodyB._mceOCE &&
            pair.bodyB._mceOCE(pair)
        });
      });
    });
  },
};

Matter.Plugin.register(MatterCollisionEvents);

module.exports.MatterCollisionEvents = MatterCollisionEvents;


/***/ })
/******/ ]);
});