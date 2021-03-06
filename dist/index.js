'use strict';

// -------------------------------------------
// API: Cache to and Restore from localStorage
// -------------------------------------------
module.exports = function offline(ripple) {
  if (!client || !window.localStorage) return;
  log('creating');
  load(ripple);
  ripple.on('change.cache', debounce(1000)(cache(ripple)));
  return ripple;
};

var load = function load(ripple) {
  return group('loading cache', function (d) {
    return (parse(localStorage.ripple) || []).map(ripple);
  });
};

var cache = function cache(ripple) {
  return function (res) {
    log('cached');
    var cachable = values(clone(ripple.resources)).filter(not(header('cache', 'no-store')));

    cachable.filter(header('content-type', 'application/javascript')).map(function (d) {
      return d.body = str(ripple.resources[d.name].body);
    });

    localStorage.ripple = str(cachable);
  };
};

var debounce = require('utilise/debounce'),
    header = require('utilise/header'),
    client = require('utilise/client'),
    values = require('utilise/values'),
    clone = require('utilise/clone'),
    parse = require('utilise/parse'),
    group = require('utilise/group'),
    not = require('utilise/not'),
    str = require('utilise/str'),
    log = require('utilise/log')('[ri/offline]'),
    err = require('utilise/err')('[ri/offline]');