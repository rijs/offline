// -------------------------------------------
// API: Pre-applies Scoped CSS [css=name]
// -------------------------------------------
export default function offline(ripple){
  if (!client || !window.localStorage) return;
  log('creating')
  load(ripple)
  ripple.on('change.cache', debounce(1000)(cache(ripple)))
  return ripple
}

function load(ripple) {
  group('loading cache', function(){
    (parse(localStorage.ripple) || [])
      .forEach(silent(ripple))
  })
}

function cache(ripple){
  return function(res){
    log('cached')
    var cachable = values(clone(ripple.resources))
          .filter(not(header('cache-control', 'no-store')))

    cachable
      .filter(header('content-type', 'application/javascript'))
      .map(d => d.body = str(ripple.resources[d.name].body) )

    localStorage.ripple = str(cachable)
  }
}

function silent(ripple) {
  return res => (res.headers.silent = true, ripple(res))
}

import debounce from 'utilise/debounce'
import header from 'utilise/header'
import client from 'utilise/client'
import values from 'utilise/values'
import clone from 'utilise/clone'
import parse from 'utilise/parse'
import group from 'utilise/group'
import proxy from 'utilise/proxy'
import not from 'utilise/not'
import str from 'utilise/str'
import key from 'utilise/key'
import log from 'utilise/log'
import err from 'utilise/err'
import is from 'utilise/is'
log = log('[ri/offline]')
err = err('[ri/offline]')