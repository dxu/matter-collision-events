# matter-collision-events

matter-collision-events is a [Matter.js](https://github.com/liabru/matter-js) plugin that adds per-body collision events.

## Installing

`npm install matter-collision-events`

## Usage

`matter-collision-events` can be included in the browser or imported via module system. By including the file as a script in the browser, the plugin will be registered on `window` as `MatterCollisionEvents`

With Matter.js v0.12.0, you *must* call `Matter.Plugin.register(MatterCollisionEvents)` on the plugin itself before using. You can then call `Matter.use('matter-collision-events')` to mount the plugin itself for usage.

This plugin triggers three new events on Matter.Body:

  1. `onCollide`
  2. `onCollideEnd`
  3. `onCollideActive`

These events correspond to the Matter.js events `collisionStart`, `collisionActive`, and `collisionEnd`, respectively. You can listen to these events via [`Matter.Events`](http://brm.io/matter-js/docs/classes/Events.html#method_on).

This plugin also extends Matter.Body three convenience functions, of type `((pair: Matter.Pair) => void) => void`:

  1. `Matter.Body.onCollide(callback)`
  2. `Matter.Body.onCollideEnd(callback)`
  3. `Matter.Body.onCollideActive(callback)`

You can use them to register event callbacks, whose first argument is the [Matter.js collision pair](http://brm.io/matter-js/docs/classes/Pair.html) corresponding to the collision event.

Take a look at the included examples for usage.

## Examples

Example usage can be found in `index.html`.

1. `python -m SimpleHTTPServer 3000`
2. Navigate to `localhost:3000`
3. View the Developer Console.

## License

MIT
