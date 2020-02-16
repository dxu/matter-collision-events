# matter-collision-events

matter-collision-events is a [Matter.js](https://github.com/liabru/matter-js) plugin that adds per-body collision events.

## Installing

`npm install matter-collision-events`

## Usage

Refer to [the official guide on using plugins](https://github.com/liabru/matter-js/wiki/Using-plugins) for step-by-step instructions. `matter-collision-events` can be included in the browser or imported via modules.

### Browser

To install the plugin in the browser:

```js
Matter.use('matter-collision-events');
```

### Modules

To install the plugin using ES6 imports:

```js
import { MatterCollisionEvents } from 'matter-collision-events';

Matter.use(MatterCollisionEvents);
```

## Events

This plugin triggers three new events on Matter.Body:

  1. `onCollide`
  2. `onCollideEnd`
  3. `onCollideActive`

These events correspond to the Matter.js events `collisionStart`, `collisionActive`, and `collisionEnd`, respectively. You can listen to these events via [`Matter.Events`](http://brm.io/matter-js/docs/classes/Events.html#method_on).

## Methods

This plugin also extends Matter.Body with three convenience functions:

  1. `Matter.Body.onCollide(callback)`
  2. `Matter.Body.onCollideEnd(callback)`
  3. `Matter.Body.onCollideActive(callback)`

You can register event callbacks by providing a function of type `( pair: `[`Matter.Pair`](http://brm.io/matter-js/docs/classes/Pair.html)`) => void`:

Example usage can be found under the `docs` folder, which contains [a basic example of its usage](/docs/examples/basic.js).

## Demo

[View the demo here.](https://dxu.github.io/matter-collision-events)

## License

MIT
