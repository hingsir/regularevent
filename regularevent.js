var RegularEvent = function() {
  this._events = {};
  this._revents = {};
  this._regulars = {};
};

RegularEvent.prototype.addListener = function(event, listener) {
  // event can be string, regular expression. (or function?)
  var listeners, re;

  if(!listener instanceof Function)
    throw TypeError('listener must be a function');

  if (event instanceof RegExp) {
    re = event.toString()
    if(!this._revents[re]) {
      this._revents[re] = [];
      this._regulars[re] = event;
    }
    listeners = this._revents[re];
  }
  else {
    listeners = this._events[event] = this._events[event] || [];
  }

  listeners.push(listener);
  return this;
};

RegularEvent.prototype.on = RegularEvent.prototype.addListener;

RegularEvent.prototype.once = function(event, listener) {
  if(!listener instanceof Function)
    throw TypeError('listener must be a function');

  var fired = false;
  function go() {
    this.removeListener(event, go);
    if(!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }
  return this.on(event, go);
};

RegularEvent.prototype.removeListener = function(event, listener) {
  var list, re;
  if(event instanceof RegExp) {
    re = event.toString();
    list = this._revents[re];
  }
  else {
    list = this._events[event];
  }
  if(!list) return this;
  if(1 === list.length && list[0] == listener)
    return this.removeAllListeners(event);

  for(var i = 0; i < list.length; i++) {
    if(list[i] == listener) {
      list.splice(i, 1);
      return this;
    }
  }
  return this;
};

RegularEvent.prototype.removeAllListeners = function(event) {
  var re;
  if(event instanceof RegExp) {
    re = event.toString();
    delete this._revents[re];
    delete this._regulars[re];
  }
  else {
    delete this._events[event];
  }
  return this;
};

RegularEvent.prototype.emit = function(event) {
  var args, self = this, listeners = this._events[event] || [];
  var handlers = Object.keys(this._regulars).filter(function(regular) {
    return self._regulars[regular].test(event);
  }).map(function(regular) {
    return self._revents[regular];
  });
  listeners = listeners.concat.apply(listeners, handlers);
  if(0 === listeners.length) return 0;
  args = [].slice.call(arguments, 1);
  listeners.forEach(function(listener) {
    listener.apply(self, args);
  });
  return listeners.length;
};

module.exports = RegularEvent;
