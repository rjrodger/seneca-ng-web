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

### Construction

Construct a new instance of an Angular service using
`seneca.ng.web()`. This returns an Angular service function of the
form `function( $http ) { ... }`. You can create as many separate
instances as you like.

You can pass in an options object to customize the service. In this
example, all request URLs are prefixed with `/foo/bar/`.

```js
angularModuleObject.service('serviceName', seneca.ng.web({
  prefix: '/foo/bar/'
}))
```

The available options are:

* `prefix` - URL path prefix; optional, default: ''
* `fail` - generic failure function, called when request fails; optional; default: console.log
* `win` - generic success function, called when request returns successfully; optional; default: console.log

The generic `win` and `fail` functions can be overridden for each API call.



### Methods

* [`get`](#wa-get) - perform a GET request


---------------------------------------

<a name="wa-get" />
### _web-service_.get( suffix?, win?, fail? )

Perform a GET request. Responses are not cached, so a new network
request is generated each time. The `suffix` is concatenated to the
`options.prefix` value as a string. Forward slashes are _not_
automatically inserted.

__Arguments__

* `suffix` - Suffix string to append to `options.prefix` to form full URL path; _optional_.
* `win` - Success callback; signature: `win( data, details )`; _optional_.
  ** `data` -  result object provided by [Angular $http](https://docs.angularjs.org/api/ng/service/$http).
  ** `details` - details object describing the orginal request:
    *** `method` - HTTP method
    *** `prefix` - URL path prefix used
    *** `suffix` - URL path suffix used




## PubSub API

This provides a simple publish/subscribe service for custom events within your Angular app. This avoids perfomance issues with `$rootScope`, and avoids Angular scoping issues in general. That means you can use it for arbitrary event-based communication between any Angular object types.

