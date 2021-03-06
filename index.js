// -------------------------------------------
// API: Cache to and Restore from localStorage
// -------------------------------------------
module.exports = function offline(ripple){
  if (!client || !window.localStorage) return;
  log('creating')
  load(ripple)
  ripple.on('change.cache', debounce(1000)(cache(ripple)))
  return ripple
}

const load = ripple => group('loading cache', d => 
  (parse(localStorage.ripple) || [])
    .map(ripple))

const cache = ripple => res => {
  log('cached')
  const cachable = values(clone(ripple.resources))
    .filter(not(header('cache', 'no-store')))

  cachable
    .filter(header('content-type', 'application/javascript'))
    .map(d => d.body = str(ripple.resources[d.name].body) )

  localStorage.ripple = str(cachable)
}

const debounce = require('utilise/debounce')
    , header = require('utilise/header')
    , client = require('utilise/client')
    , values = require('utilise/values')
    , clone = require('utilise/clone')
    , parse = require('utilise/parse')
    , group = require('utilise/group')
    , not = require('utilise/not')
    , str = require('utilise/str')
    , log = require('utilise/log')('[ri/offline]')
    , err = require('utilise/err')('[ri/offline]')