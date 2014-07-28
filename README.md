seneca-ng-web - a [Seneca](http://senecajs.org) plugin
======================================================

## Seneca Angular Web Plugin

This plugin provides an [Angular](http://angularjs.org) API for Seneca. It provides:

   * An Angular service for web API requests
   * An Angular service for simple client-side pubsub events


[![Build Status](https://travis-ci.org/rjrodger/seneca-ng-web.png?branch=master)](https://travis-ci.org/rjrodger/seneca-ng-wb)

[![NPM](https://nodei.co/npm/seneca-ng-web.png)](https://nodei.co/npm/seneca-ng-web/)
[![NPM](https://nodei.co/npm-dl/seneca-ng-web.png)](https://nodei.co/npm-dl/seneca-ng-web/)

For a gentle introduction to Seneca itself, see the
[senecajs.org](http://senecajs.org) site.

If you're using this plugin module, feel free to contact me on twitter if you
have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

Current Version: 0.1.1

Tested on: Seneca 0.5.20, Node 0.10.29


## Quick Example

In your server-side Node.js app, load this plugin using:

```js
var seneca = require('seneca')()

seneca.use('ng-web')
```

Then in your HTML, load the Seneca client-side initialisation script:

```html
    <script src="/seneca/init.js"></script>
```

And in your client-side angular code, use it like so:

```js

angular
  .module('fooModule')
  .service('fooAPI',      seneca.ng.web({prefix:'/api/1.0/'}))
  .service('fooPubSub',   seneca.ng.pubsub())
  .controller('fooBar',function( $scope, fooAPI, fooPubSub ) {

    // load a resource from /api/1.0/foo
    fooAPI.get('foo',function(data){
      fooPubSub.pub('foo-loaded',[data])
    })

    fooPubSub.sub('foo-loaded',function(data){
      $scope.data = data
    })
  })
```

## Web API

This is a convenience API for web requests. Use this to make requests against URL end points you have defined with [seneca-web](http://github.com/rjrodger/seneca-web).


## PubSub API

This provides a simple publish/subscribe service for custom events within your Angular app. This avoids perfomance issues with `$rootScope`, and avoids Angular scoping issues in general. That means you can use it for arbitrary event-based communication between any Angular object types.

