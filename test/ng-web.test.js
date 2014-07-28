/* Copyright (c) 2014 Richard Rodger */
"use strict";

// mocha ng-web.test.js

var util = require('util')

var seneca  = require('seneca')

var assert  = require('assert')

var si = seneca()
si.use( '../ng-web' )



describe('ng-web', function() {
  
  it('happy', function(fin) {
    assert.ok(si.hasplugin('ng-web'))
    fin()
  })

})

