var Matter = require('matter-js');


var MatterCollisionEvents = {
  name: 'matter-collision-events',
  version: '0.1.5',
  for: 'matter-js@^0.12.0',
  install: function(matter) {
    // add the onCollide, onCollideEnd, and onCollideActive callback handlers
    // to the native Matter.Body created

    function triggerRecursively(body, eventName, pair) {
      matter.Events.trigger(body, eventName, { pair : pair });
      body._mceOC &&
        body._mceOC(pair)

      if (body.parent !== undefined && body.parent !== body) {
        triggerRecursively(body.parent, eventName, pair);
	  }
	}

    function sendEvent(pair, eventName) {
      triggerRecursively(pair.bodyA, eventName, pair);
      triggerRecursively(pair.bodyB, eventName, pair);
    }

    var create = matter.Body.create;
    matter.Body.create = function() {
      var body = create.apply(null, arguments);
      body.onCollide = function(cb) { body._mceOC = cb; }
      body.onCollideEnd = function(cb) { body._mceOCE = cb; }
      body.onCollideActive = function(cb) { body._mceOCA = cb; }
      return body;
    }
    matter.after('Engine.create', function() {
      matter.Events.on(this, 'collisionStart', function(event) {
        event.pairs.map(function(pair) {
          sendEvent(pair, 'onCollide');
        });
      });

      matter.Events.on(this, 'collisionActive', function(event) {
        event.pairs.map(function(pair) {
          sendEvent(pair, 'onCollideActive');
        });
      });

      matter.Events.on(this, 'collisionEnd', function(event) {
        event.pairs.map(function(pair) {
          sendEvent(pair, 'onCollideEnd');
        });
      });
    });
  },
};

Matter.Plugin.register(MatterCollisionEvents);

module.exports.MatterCollisionEvents = MatterCollisionEvents;
