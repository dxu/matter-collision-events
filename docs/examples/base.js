function generateExample(bodies) {
  return function() {
    console.log('hello')
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies;

    const engine = Matter.Engine.create();

    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        showVelocity: true,
        wireframes: false,
      },
    });

    World.add(engine.world, bodies);

    // run the engine
    Engine.run(engine);
    Engine.update(engine);
    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function() {
        Matter.render.stop(render);
        Matter.render.stop(runner);
      },
    }
  }
}
