RegularEvent
============

regular expression in event

[![Build Status](https://travis-ci.org/waksana/regularevent.svg)](https://travis-ci.org/waksana/regularevent)
[![NPM version](https://badge.fury.io/js/regularevent.png)](http://badge.fury.io/js/regularevent)

a simple event system accept regular expressions

```javascript
var RegularEvent = require('regularevent');

var re = new RegularEvent();

re.on(/endOf/, console.log);

re.emit('endOfDay', 'go to sleep');
re.emit('endOfWeek', 'have a nice weekend');
re.emit('endOfWorld', 'yeah!!');
// all above will trigger the listener
```
