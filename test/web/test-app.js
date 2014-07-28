
var path = require('path')

var seneca = require('seneca')()
seneca.use('../../ng-web.js')

seneca.add('role:foo,cmd:bar',function(args,done){
  done(null,{zed:1,bar:args.bar})
})

seneca.act('role:web',{use:{
  prefix: '/api/',
  pin:    {role:'foo',cmd:'*'},
  map:    {
    bar: {GET:true, POST:true}
  }
}})

var express    = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use( bodyparser.json() )
app.use( seneca.export('web') )
app.use( express.static( path.join(__dirname,'public') ) )

app.listen(3000)
