(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// API: Pre-applies Scoped CSS [css=name]
// -------------------------------------------
module.exports = offline;

function offline(ripple) {
  if (!client || !window.localStorage) {
    return;
  }log("creating");
  load(ripple);
  ripple.on("change.cache", debounce(1000)(cache(ripple)));
  return ripple;
}

function load(ripple) {
  group("loading cache", function () {
    (parse(localStorage.ripple) || []).forEach(silent(ripple));
  });
}

function cache(ripple) {
  return function (res) {
    log("cached");
    var cachable = values(clone(ripple.resources)).filter(not(header("cache-control", "no-store")));

    cachable.filter(header("content-type", "application/javascript")).map(function (d) {
      return d.body = str(ripple.resources[d.name].body);
    });

    localStorage.ripple = str(cachable);
  };
}

function silent(ripple) {
  return function (res) {
    return (res.headers.silent = true, ripple(res));
  };
}

var debounce = _interopRequire(require("utilise/debounce"));

var header = _interopRequire(require("utilise/header"));

var client = _interopRequire(require("utilise/client"));

var values = _interopRequire(require("utilise/values"));

var clone = _interopRequire(require("utilise/clone"));

var parse = _interopRequire(require("utilise/parse"));

var group = _interopRequire(require("utilise/group"));

var proxy = _interopRequire(require("utilise/proxy"));

var not = _interopRequire(require("utilise/not"));

var str = _interopRequire(require("utilise/str"));

var key = _interopRequire(require("utilise/key"));

var log = _interopRequire(require("utilise/log"));

var err = _interopRequire(require("utilise/err"));

var is = _interopRequire(require("utilise/is"));

log = log("[ri/offline]");
err = err("[ri/offline]");
},{"utilise/client":2,"utilise/clone":3,"utilise/debounce":4,"utilise/err":5,"utilise/group":6,"utilise/header":7,"utilise/is":8,"utilise/key":9,"utilise/log":10,"utilise/not":53,"utilise/parse":54,"utilise/proxy":55,"utilise/str":56,"utilise/values":57}],2:[function(require,module,exports){
module.exports = require('client')
},{"client":11}],3:[function(require,module,exports){
module.exports = require('clone')
},{"clone":12}],4:[function(require,module,exports){
module.exports = require('debounce')
},{"debounce":17}],5:[function(require,module,exports){
module.exports = require('err')
},{"err":19}],6:[function(require,module,exports){
module.exports = require('group')
},{"group":23}],7:[function(require,module,exports){
module.exports = require('header')
},{"header":26}],8:[function(require,module,exports){
module.exports = require('is')
},{"is":28}],9:[function(require,module,exports){
module.exports = require('key')
},{"key":29}],10:[function(require,module,exports){
module.exports = require('log')
},{"log":33}],11:[function(require,module,exports){
module.exports = typeof window != 'undefined'
},{}],12:[function(require,module,exports){
var parse = require('parse')
  , str = require('str')
  , is = require('is')

module.exports = function clone(d) {
  return !is.fn(d) 
       ? parse(str(d))
       : d
}

},{"is":13,"parse":14,"str":15}],13:[function(require,module,exports){
module.exports = is
is.fn     = isFunction
is.str    = isString
is.num    = isNumber
is.obj    = isObject
is.lit    = isLiteral
is.bol    = isBoolean
is.truthy = isTruthy
is.falsy  = isFalsy
is.arr    = isArray
is.null   = isNull
is.def    = isDef
is.in     = isIn

function is(v){
  return function(d){
    return d == v
  }
}

function isFunction(d) {
  return typeof d == 'function'
}

function isBoolean(d) {
  return typeof d == 'boolean'
}

function isString(d) {
  return typeof d == 'string'
}

function isNumber(d) {
  return typeof d == 'number'
}

function isObject(d) {
  return typeof d == 'object'
}

function isLiteral(d) {
  return typeof d == 'object' 
      && !(d instanceof Array)
}

function isTruthy(d) {
  return !!d == true
}

function isFalsy(d) {
  return !!d == false
}

function isArray(d) {
  return d instanceof Array
}

function isNull(d) {
  return d === null
}

function isDef(d) {
  return typeof d !== 'undefined'
}

function isIn(set) {
  return function(d){
    return  set.indexOf 
         ? ~set.indexOf(d)
         :  d in set
  }
}
},{}],14:[function(require,module,exports){
module.exports = function parse(d){
  return d && JSON.parse(d)
}
},{}],15:[function(require,module,exports){
var is = require('is') 

module.exports = function str(d){
  return d === 0 ? '0'
       : !d ? ''
       : is.fn(d) ? '' + d
       : is.obj(d) ? JSON.stringify(d)
       : String(d)
}
},{"is":16}],16:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],17:[function(require,module,exports){
var is = require('is')

module.exports = function debounce(d){
  var pending, wait = is.num(d) ? d : 100

  return is.fn(d) 
       ? next(d)
       : next

  function next(fn){
    return function(){
      var ctx = this, args = arguments
      pending && clearTimeout(pending)
      pending = setTimeout(function(){ fn.apply(ctx, args) }, wait)
    }
  }
  
}
},{"is":18}],18:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],19:[function(require,module,exports){
var owner = require('owner')
  , to = require('to')

module.exports = function err(prefix){
  return function(d){
    if (!owner.console || !console.error.apply) return d;
    var args = to.arr(arguments)
    args.unshift(prefix.red ? prefix.red : prefix)
    return console.error.apply(console, args), d
  }
}
},{"owner":20,"to":22}],20:[function(require,module,exports){
(function (global){
module.exports = require('client') ? /* istanbul ignore next */ window : global
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"client":21}],21:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],22:[function(require,module,exports){
module.exports = { 
  arr : toArray
}

function toArray(d){
  return Array.prototype.slice.call(d, 0)
}
},{}],23:[function(require,module,exports){
var client = require('client')
  , owner = require('owner')

module.exports = function group(prefix, fn){
  if (!owner.console) return fn()
  if (!console.groupCollapsed) polyfill()
  console.groupCollapsed(prefix)
  fn()
  console.groupEnd(prefix)
}

function polyfill() {
  console.groupCollapsed = console.groupEnd = function(d){
    console.log('*****', d, '*****')
  }
}
},{"client":11,"owner":24}],24:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"client":25,"dup":20}],25:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],26:[function(require,module,exports){
var has = require('has')

module.exports = function header(header, value) {
  var getter = arguments.length == 1
  return function(d){ 
    return !d                      ? null
         : !has(d, 'headers')      ? null
         : !has(d.headers, header) ? null
         : getter                  ? d['headers'][header]
                                   : d['headers'][header] == value
  }
}
},{"has":27}],27:[function(require,module,exports){
module.exports = function has(o, k) {
  return k in o
}
},{}],28:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],29:[function(require,module,exports){
var is = require('is')
  , str = require('str')

module.exports = function key(k, v){ 
  var set = arguments.length > 1
    , keys = str(k).split('.')
    , root = keys.shift()

  return function deep(o){
    var masked = {}
    return !o ? undefined 
         : !k ? o
         : is.arr(k) ? (k.map(copy), masked)
         : o[k] || !keys.length ? (set ? ((o[k] = is.fn(v) ? v(o[k]) : v), o)
                                       :   o[k])
                                : (set ? key(keys.join('.'), v)(o[root] ? o[root] : (o[root] = {}))
                                       : key(keys.join('.'))(o[root]))

    function copy(d){
      key(d, key(d)(o))(masked)
    }
  }
}
},{"is":30,"str":31}],30:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],31:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"is":32}],32:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],33:[function(require,module,exports){
var is = require('is')
  , to = require('to')
  , owner = require('owner')

module.exports = function log(prefix){
  return function(d){
    if (!owner.console || !console.log.apply) return d;
    is.arr(arguments[2]) && (arguments[2] = arguments[2].length)
    var args = to.arr(arguments)
    args.unshift(prefix.grey ? prefix.grey : prefix)
    return console.log.apply(console, args), d
  }
}
},{"is":34,"owner":35,"to":37}],34:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],35:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"client":36,"dup":20}],36:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],37:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],38:[function(require,module,exports){
module.exports = function not(fn){
  return function(){
    return !fn.apply(this, arguments)
  }
}
},{}],39:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],40:[function(require,module,exports){
var is = require('is')

module.exports = function proxy(fn, ret, ctx){ 
  return function(){
    var result = fn.apply(ctx || this, arguments)
    return is.fn(ret) ? ret(result) : ret || result
  }
}
},{"is":41}],41:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],42:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"is":43}],43:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],44:[function(require,module,exports){
var keys = require('keys')
  , from = require('from')

module.exports = function values(o) {
  return !o ? [] : keys(o).map(from(o))
}
},{"from":45,"keys":52}],45:[function(require,module,exports){
var datum = require('datum')
  , key = require('key')

module.exports = from
from.parent = fromParent

function from(o){
  return function(k){
    return key(k)(o)
  }
}

function fromParent(k){
  return datum(this.parentNode)[k]
}
},{"datum":46,"key":48}],46:[function(require,module,exports){
var sel = require('sel')

module.exports = function datum(node){
  return sel(node).datum()
}
},{"sel":47}],47:[function(require,module,exports){
module.exports = function sel(){
  return d3.select.apply(this, arguments)
}
},{}],48:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"dup":29,"is":49,"str":50}],49:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],50:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15,"is":51}],51:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}],52:[function(require,module,exports){
module.exports = function keys(o) {
  return Object.keys(o || {})
}
},{}],53:[function(require,module,exports){
module.exports = require('not')
},{"not":38}],54:[function(require,module,exports){
module.exports = require('parse')
},{"parse":39}],55:[function(require,module,exports){
module.exports = require('proxy')
},{"proxy":40}],56:[function(require,module,exports){
module.exports = require('str')
},{"str":42}],57:[function(require,module,exports){
module.exports = require('values')
},{"values":44}]},{},[1]);
