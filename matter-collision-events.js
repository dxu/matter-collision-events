(function() {
  var MatterCollisionEvents = {
    name: 'matter-collision-events',
    version: '0.0.0',
    for: 'matter-js@^0.12.0',
    install: function(matter) {
      matter.after('Engine.create', function() {
        matter.Events.on(this, 'collisionStart', function(event) {
          event.pairs.map(function(pair) {
            matter.Events.trigger(pair.bodyA, 'onCollide', { pair : pair });
            matter.Events.trigger(pair.bodyB, 'onCollide', { pair : pair });
            pair.bodyA.onCollide && pair.bodyA.onCollide(pair)
            pair.bodyB.onCollide && pair.bodyB.onCollide(pair)
          });
        });

        matter.Events.on(this, 'collisionActive', function(event) {
          event.pairs.map(function(pair) {
            matter.Events.trigger(pair.bodyA, 'onCollideActive', { pair : pair });
            matter.Events.trigger(pair.bodyB, 'onCollideActive', { pair : pair });
            pair.bodyA.onCollideActive && pair.bodyA.onCollideActive(pair)
            pair.bodyB.onCollideActive && pair.bodyB.onCollideActive(pair)
          });
        });

        matter.Events.on(this, 'collisionEnd', function(event) {
          event.pairs.map(function(pair) {
            matter.Events.trigger(pair.bodyA, 'onCollideEnd', { pair : pair });
            matter.Events.trigger(pair.bodyB, 'onCollideEnd', { pair : pair });
            pair.bodyA.onCollideEnd && pair.bodyA.onCollideEnd(pair)
            pair.bodyB.onCollideEnd && pair.bodyB.onCollideEnd(pair)
          });
        });
      });
    },
  };
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = MatterCollisionEvents;
    }
    exports.MatterCollisionEvents = MatterCollisionEvents;
  } else {
    this.MatterCollisionEvents = MatterCollisionEvents;
  }
})()
