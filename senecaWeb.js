;(function(window){

  function web( options ) {
    return function($http) {

      var default_fail = options.fail || function( data ) {
        console.error(data)
      }

      var default_win = options.win || function( data ) {
        console.log(data)
      }
      
      var prefix = options.prefix || ''

      return {
        call: function(method,suffix,data,win,fail) {
          win  = win  || default_win
          fail = fail || default_fail

          $http({
            method: method,
            url:    prefix+suffix,
            data:   data,
            cache:  false
          }).success(function(data){
            win(data,{method:method,suffix:suffix,prefix:prefix})

          }).error(function(info){
            fail(info,{method:method,suffix:suffix,prefix:prefix})
          })
        },

        get: function(suffix,win,fail) {
          this.call('GET',suffix,null,win,fail)
        }
      }

    }
  }


  function pubsub() {
    return function() {
      var cache = {}

      return {
        pub: function(topic, args) { 
	  cache[topic] && _.each(cache[topic], function(sub) {
            console.log( topic+'('+JSON.stringify(args)+') -> '+this.name)
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
