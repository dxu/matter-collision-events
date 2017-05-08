(function() {
  var colors = ['#006BA6', '#0496FF', '#FFBC42', '#D81159', '#8F2D56'];
  var Bodies = Matter.Bodies;
  Matter.use('matter-collision-events');

  var boxA = Bodies.rectangle(400, 200, 80, 80, {
    velocity: {
      x: 12,
      y: 10,
    }
  });

  var boxB = Bodies.rectangle(450, 50, 80, 80);

  boxA.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  boxB.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];

  boxB.onCollide(function(pair) {
    console.log('BoxB got hit!', pair);
		pair.bodyA.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
		pair.bodyB.render.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  });

  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  window.basicBodies = [boxA, boxB, ground];
})()
