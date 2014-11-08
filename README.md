regularevent
============

regular expression in event

a simple event system accept regular expressions

```javascript
var RegularEvent = require('regularevent');

var re = new RegularEvent();

re.on(/endOf/, console.log);

re.emit('endOfDay', 'go to sleep');
re.emit('endOfWeek', 'have a nice weekend');
re.emit('endOfWrold', 'yeah!!');
// all above will trigger the listen
```
