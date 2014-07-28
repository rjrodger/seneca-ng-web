;(function(window){

  function web( options ) {
    options = options || {}

    return function($http) {

      var default_fail = options.fail || function( data ) {
        console.error(data)
      }

      var default_win = options.win || function( data ) {
        console.log(data)
      }
      
      var prefix = options.prefix || ''

      return {
        call: function(method,suffix,data,callopts,win,fail) {
          method   = (null==method ? 'GET' : (''+method).toUpperCase())
          suffix   = (null==suffix ? '' : (''+suffix))
          callopts = (null==callopts ? {} : callopts)
          win      = win  || default_win
          fail     = fail || default_fail

          httpopts = Object.create(callopts)
          httpopts.method = null == httpopts.method ? method        : httpopts.method
          httpopts.url    = null == httpopts.url    ? prefix+suffix : httpopts.url
          httpopts.cache  = null == httpopts.cache  ? false         : httpopts.cache
          httpopts.data   = null == httpopts.data   ? data          : httpopts.data

          console.log(httpopts)

          $http(httpopts)
            .success(function(data,status,headers,config){
              win(data,{
                method:method,
                suffix:suffix,
                prefix:prefix,
                status:status,
                headers:headers,
                config:config
              })

            }).error(function(data,status,headers,config){
              fail(data,{
                method:method,
                suffix:suffix,
                prefix:prefix,
                status:status,
                headers:headers,
                config:config
              })
            })
        },

        get: function(suffix,win,fail) {
          this.call('GET',suffix,null,null,win,fail)
        },

        post: function(suffix,data,win,fail) {
          this.call('POST',suffix,data,null,win,fail)
        },

        put: function(suffix,data,win,fail) {
          this.call('PUT',suffix,data,null,win,fail)
        },

        delete: function(suffix,win,fail) {
          this.call('DELETE',suffix,null,null,win,fail)
        }
      }

    }
  }


  function pubsub() {
    return function() {
      var cache = {}

      return {
        pub: function(topic, args) { 
	  cache[topic] && cache[topic].forEach(function(sub) {
            //console.log( topic+'('+JSON.stringify(args)+') -> '+this.name)
	    sub.apply(null, args || []);
	  })
        },
        
        sub: function(topic, callback) {
	  if(!cache[topic]) {
	    cache[topic] = [];
	  }
	  cache[topic].push(callback);
	  return [topic, callback]; 
        },
        
        unsub: function(topic) {
	  cache[topic] && $.each(cache[topic], function(i){
	    cache[t].splice(i, 1);
	  })
        }
      }
    }
  }


  if( window.seneca ) {
    window.seneca.ng = {
      pubsub: pubsub,
      web:    web
    }
  }

})(window);
