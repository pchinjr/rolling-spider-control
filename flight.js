'use strict';

var Drone = require('rolling-spider');
var temporal = require('temporal');
var d = new Drone(process.env.UUID);

d.connect(function () {
  d.setup(function () {
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    console.log('Connected to drone', d.name);

    temporal.queue([
      {
        delay: 5000,
        task: function () {
          console.log('Getting ready for takeOff!');
          d.takeOff();
          d.flatTrim();
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('Time to land');
          d.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('Getting ready for takeOff!');
          d.takeOff();
          d.flatTrim();
        }
      },
      {
        delay: 5000,
        task: function () {
          console.log('Time to land');
          d.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});