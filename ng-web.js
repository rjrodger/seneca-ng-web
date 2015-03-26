/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict";


var fs   = require('fs')
var path = require('path')

var _   = require('underscore')
var nid = require('nid')



module.exports = function( options ) {
  var seneca = this
  var plugin = 'ng-web'


  options = seneca.util.deepextend({

  },options)
  

  seneca.add({init:plugin},function(args,done){
    var seneca = this

    fs.readFile( path.join(__dirname,'/senecaWeb.js'),{encoding:'utf8'},function(err,content){
      if( err ) return done(err);

      seneca.act({role:'web',set:'source',title:'ng-web',source:content})

      done();
    })
  })

  return {
    name: plugin
  }
}
