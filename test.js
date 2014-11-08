require('should');
var RegularEvent = require('./index');
var re = new RegularEvent();

var callme = function() {
  function call(name) {
    call.arr.push(name);
  };
  call.arr = [];
  return call;
};
var fun1 = callme();
var fun2 = callme();
var fun3 = callme();
var fun4 = callme();
var fun5 = callme();
var fun6 = callme();
var fun7 = callme();

function clear() {
  fun1.arr = [];
  fun2.arr = [];
  fun3.arr = [];
  fun4.arr = [];
  fun5.arr = [];
  fun6.arr = [];
}

describe('addListener in string', function() {
  it('has current count of function', function() {
    re.on('event1', fun1);
    re.on('event1', fun1);
    re.on('event1', fun2);
    re.on('event2', fun2);
    re.on('event2', fun3);
    re._events.event1.should.length(3);
    re._events.event2.should.length(2);
  });
});

describe('addListener in regular expression', function() {
  it('has current count of function', function() {
    re.on(/event/, fun4);
    re.on(/event/, fun4);
    re.on(/event/, fun5);
    re.on(/ev/, fun5);
    re.on(/ev/, fun6);
    re._revents['/event/'].should.length(3);
    re._regulars['/event/'].should.ok;
    re._revents['/ev/'].should.length(2);
    re._regulars['/ev/'].should.ok;
  });
});

describe('emit events and get run', function() {
  it('call listener the right time', function() {
    re.emit('ev', 1);
    re.emit('event', 2);
    re.emit('event1', 3);
    re.emit('event2', 4);
    re.emit('eve', 5);
    fun1.arr.should.eql([3, 3]);
    fun2.arr.should.eql([3, 4]);
    fun3.arr.should.eql([4]);
    fun4.arr.should.eql([2, 2, 3, 3, 4, 4]);
    fun5.arr.should.eql([1, 2, 2, 3, 3, 4, 4, 5]);
    fun6.arr.should.eql([1, 2, 3, 4, 5]);
  });
});

describe('removeListener', function() {
  before(clear);
  it('call listener the right time', function() {
    re.removeListener('event1', fun1);
    re.removeListener('event2', fun3);
    re.removeListener('event2', fun7);
    re.removeListener(/event/, fun7);
    re.removeListener(/event/, fun4);
    re.removeListener(/ev/, fun5);
    re.emit('ev', 1);
    re.emit('event', 2);
    re.emit('event1', 3);
    re.emit('event2', 4);
    re.emit('eve', 5);
    fun1.arr.should.eql([3]);
    fun2.arr.should.eql([3, 4]);
    fun3.arr.should.eql([]);
    fun4.arr.should.eql([2, 3, 4]);
    fun5.arr.should.eql([2, 3, 4]);
    fun6.arr.should.eql([1, 2, 3, 4, 5]);
  });
});

describe('removeAllListeners', function() {
  before(clear);
  it('no fun will be called', function() {
    re.removeAllListeners('event1');
    re.removeAllListeners('event2');
    re.removeAllListeners(/event/);
    re.removeAllListeners(/ev/);
    re.emit('ev', 1);
    re.emit('event', 2);
    re.emit('event1', 3);
    re.emit('event2', 4);
    re.emit('eve', 5);
    fun1.arr.should.eql([]);
    fun2.arr.should.eql([]);
    fun3.arr.should.eql([]);
    fun4.arr.should.eql([]);
    fun5.arr.should.eql([]);
    fun6.arr.should.eql([]);
  });
});

