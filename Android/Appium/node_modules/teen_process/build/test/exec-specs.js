require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _2 = require('..');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _helpers = require('./helpers');

var _appiumSupport = require('appium-support');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('exec', function () {
  it('should work with arguments like spawn', function callee$1$0() {
    var cmd, args, _ref, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = 'ls';
          args = [__dirname];
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, args));

        case 4:
          _ref = context$2$0.sent;
          stdout = _ref.stdout;
          stderr = _ref.stderr;
          code = _ref.code;

          stdout.should.contain("exec-specs.js");
          stderr.should.equal("");
          code.should.equal(0);

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should throw an error if command does not exist', function callee$1$0() {
    var cmd, err;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = 'doesnoteexist';
          err = undefined;
          context$2$0.prev = 2;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd));

        case 5:
          context$2$0.next = 10;
          break;

        case 7:
          context$2$0.prev = 7;
          context$2$0.t0 = context$2$0['catch'](2);

          err = context$2$0.t0;

        case 10:
          should.exist(err);
          err.message.should.include('not found');

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[2, 7]]);
  });

  it('should throw an error with a bad exit code', function callee$1$0() {
    var cmd, err;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("bad_exit");
          err = undefined;
          context$2$0.prev = 2;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd));

        case 5:
          context$2$0.next = 10;
          break;

        case 7:
          context$2$0.prev = 7;
          context$2$0.t0 = context$2$0['catch'](2);

          err = context$2$0.t0;

        case 10:
          should.exist(err);
          err.stdout.trim().should.equal("foo");
          err.stderr.trim().should.equal("bar");
          err.code.should.equal(1);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[2, 7]]);
  });

  it('should work with spaces in arguments', function callee$1$0() {
    var cmd, echo1, echo2, _ref2, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo");
          echo1 = "my name is bob";
          echo2 = "lol";
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1, echo2]));

        case 5:
          _ref2 = context$2$0.sent;
          stdout = _ref2.stdout;
          stderr = _ref2.stderr;
          code = _ref2.code;

          stdout.trim().should.equal(echo1);
          stderr.trim().should.equal(echo2);
          code.should.equal(0);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should work with backslashes in arguments', function callee$1$0() {
    var cmd, echo1, echo2, _ref3, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo");
          echo1 = "my\\ name\\ is\\ bob";
          echo2 = "lol";
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1, echo2]));

        case 5:
          _ref3 = context$2$0.sent;
          stdout = _ref3.stdout;
          stderr = _ref3.stderr;
          code = _ref3.code;

          stdout.trim().should.equal(echo1);
          stderr.trim().should.equal(echo2);
          code.should.equal(0);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should work with spaces in commands', function callee$1$0() {
    var cmd, echo1, echo2, _ref4, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo with space");
          echo1 = "bobbob";
          echo2 = "lol";
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1, echo2]));

        case 5:
          _ref4 = context$2$0.sent;
          stdout = _ref4.stdout;
          stderr = _ref4.stderr;
          code = _ref4.code;

          stdout.trim().should.equal(echo1);
          stderr.trim().should.equal(echo2);
          code.should.equal(0);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should work with spaces in commands and arguments', function callee$1$0() {
    var cmd, echo1, echo2, _ref5, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo with space");
          echo1 = "my name is bob";
          echo2 = "lol";
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1, echo2]));

        case 5:
          _ref5 = context$2$0.sent;
          stdout = _ref5.stdout;
          stderr = _ref5.stderr;
          code = _ref5.code;

          stdout.trim().should.equal(echo1);
          stderr.trim().should.equal(echo2);
          code.should.equal(0);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should respect cwd', function callee$1$0() {
    var cmd, echo1, echo2, cwd, _ref6, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = _appiumSupport.system.isWindows() ? "echo.bat" : "./echo.sh";
          echo1 = "my name is bob";
          echo2 = "lol";
          cwd = _path2['default'].dirname((0, _helpers.getFixture)("echo"));
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1, echo2], { cwd: cwd }));

        case 6:
          _ref6 = context$2$0.sent;
          stdout = _ref6.stdout;
          stderr = _ref6.stderr;
          code = _ref6.code;

          stdout.trim().should.equal(echo1);
          stderr.trim().should.equal(echo2);
          code.should.equal(0);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should respect env', function callee$1$0() {
    var cmd, env, _ref7, stdout, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("env");
          env = { FOO: "lolol" };
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [], { env: env }));

        case 4:
          _ref7 = context$2$0.sent;
          stdout = _ref7.stdout;
          code = _ref7.code;

          stdout.trim().should.equal(env.FOO + ' ' + env.FOO);
          code.should.equal(0);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should allow a timeout parameter', function callee$1$0() {
    var cmd, args, err;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = "sleep";
          args = ["10"];
          err = undefined;
          context$2$0.prev = 3;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, args, { timeout: 500 }));

        case 6:
          context$2$0.next = 11;
          break;

        case 8:
          context$2$0.prev = 8;
          context$2$0.t0 = context$2$0['catch'](3);

          err = context$2$0.t0;

        case 11:
          should.exist(err);
          err.message.should.contain("timed out");
          err.message.should.contain(cmd);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[3, 8]]);
  });

  it('should allow large amounts of output', function callee$1$0() {
    var _ref8, stdout;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(10000);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _2.exec)((0, _helpers.getFixture)("bigbuffer.js")));

        case 3:
          _ref8 = context$2$0.sent;
          stdout = _ref8.stdout;

          stdout.length.should.be.above(512 * 1024);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  it('should ignore output if requested', function callee$1$0() {
    var cmd, echo1, _ref9, stdout, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo.sh");
          echo1 = "my name is bob";
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1], { ignoreOutput: true }));

        case 4:
          _ref9 = context$2$0.sent;
          stdout = _ref9.stdout;
          code = _ref9.code;

          stdout.should.equal("");
          code.should.equal(0);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should return a Buffer if requested', function callee$1$0() {
    var cmd, echo1, _ref10, stdout, stderr, code;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          cmd = (0, _helpers.getFixture)("echo.sh");
          echo1 = "my name is bob";
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _2.exec)(cmd, [echo1], { isBuffer: true }));

        case 4:
          _ref10 = context$2$0.sent;
          stdout = _ref10.stdout;
          stderr = _ref10.stderr;
          code = _ref10.code;

          _lodash2['default'].isString(stdout).should.be['false'];
          _lodash2['default'].isBuffer(stdout).should.be['true'];
          _lodash2['default'].isString(stderr).should.be['false'];
          _lodash2['default'].isBuffer(stderr).should.be['true'];
          code.should.equal(0);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('binary output', function () {
    var _this2 = this;

    var PNG_MAGIC = '89504e47';
    var PNG_MAGIC_LENGTH = 4;

    it('should allow binary output', function callee$2$0() {
      var _ref11, stdout, signature;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _2.exec)('cat', [(0, _helpers.getFixture)('screenshot.png')], { encoding: 'binary' }));

          case 2:
            _ref11 = context$3$0.sent;
            stdout = _ref11.stdout;

            _lodash2['default'].isString(stdout).should.be['true'];
            _lodash2['default'].isBuffer(stdout).should.be['false'];
            signature = new Buffer(stdout, 'binary').toString('hex', 0, PNG_MAGIC_LENGTH);

            signature.should.eql(PNG_MAGIC);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should allow binary output as Buffer', function callee$2$0() {
      var _ref12, stdout, signature;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _2.exec)('cat', [(0, _helpers.getFixture)('screenshot.png')], { encoding: 'binary', isBuffer: true }));

          case 2:
            _ref12 = context$3$0.sent;
            stdout = _ref12.stdout;

            _lodash2['default'].isString(stdout).should.be['false'];
            _lodash2['default'].isBuffer(stdout).should.be['true'];
            signature = stdout.toString('hex', 0, PNG_MAGIC_LENGTH);

            signature.should.eql(PNG_MAGIC);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });

    it('should allow binary output from timeout', function callee$2$0() {
      var stdout;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _2.exec)('cat', [(0, _helpers.getFixture)('screenshot.png')], { encoding: 'binary', timeout: 1 }));

          case 3:
            context$3$0.next = 10;
            break;

          case 5:
            context$3$0.prev = 5;
            context$3$0.t0 = context$3$0['catch'](0);
            stdout = context$3$0.t0.stdout;

            _lodash2['default'].isString(stdout).should.be['true'];
            _lodash2['default'].isBuffer(stdout).should.be['false'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2, [[0, 5]]);
    });

    it('should allow binary output as Buffer from timeout', function callee$2$0() {
      var stdout;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _2.exec)('cat', [(0, _helpers.getFixture)('screenshot.png')], { encoding: 'binary', timeout: 1, isBuffer: true }));

          case 3:
            context$3$0.next = 10;
            break;

          case 5:
            context$3$0.prev = 5;
            context$3$0.t0 = context$3$0['catch'](0);
            stdout = context$3$0.t0.stdout;

            _lodash2['default'].isString(stdout).should.be['false'];
            _lodash2['default'].isBuffer(stdout).should.be['true'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2, [[0, 5]]);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTTs7QUFDdkIsZ0NBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUNsQyxnQ0FBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDOzs7Ozs7O0tBRXRDLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsbURBQW1ELEVBQUU7VUFJaEQsTUFBTTs7Ozs7OzZDQUZKLGFBQUssS0FBSyxFQUFFLENBQUMseUJBQVcsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7Ozs7Ozs7O0FBRS9GLGtCQUFNLEdBQUcsZUFBSSxNQUFNOztBQUN2QixnQ0FBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDO0FBQ25DLGdDQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FFckMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZXhlYy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICcuLic7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IGdldEZpeHR1cmUgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgc3lzdGVtIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnZXhlYycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggYXJndW1lbnRzIGxpa2Ugc3Bhd24nLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9ICdscyc7XG4gICAgbGV0IGFyZ3MgPSBbX19kaXJuYW1lXTtcbiAgICBsZXQge3N0ZG91dCwgc3RkZXJyLCBjb2RlfSA9IGF3YWl0IGV4ZWMoY21kLCBhcmdzKTtcbiAgICBzdGRvdXQuc2hvdWxkLmNvbnRhaW4oXCJleGVjLXNwZWNzLmpzXCIpO1xuICAgIHN0ZGVyci5zaG91bGQuZXF1YWwoXCJcIik7XG4gICAgY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgY29tbWFuZCBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY21kID0gJ2RvZXNub3RlZXhpc3QnO1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGV4ZWMoY21kKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIgPSBlO1xuICAgIH1cbiAgICBzaG91bGQuZXhpc3QoZXJyKTtcbiAgICBlcnIubWVzc2FnZS5zaG91bGQuaW5jbHVkZSgnbm90IGZvdW5kJyk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igd2l0aCBhIGJhZCBleGl0IGNvZGUnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJiYWRfZXhpdFwiKTtcbiAgICBsZXQgZXJyO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBleGVjKGNtZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgc2hvdWxkLmV4aXN0KGVycik7XG4gICAgZXJyLnN0ZG91dC50cmltKCkuc2hvdWxkLmVxdWFsKFwiZm9vXCIpO1xuICAgIGVyci5zdGRlcnIudHJpbSgpLnNob3VsZC5lcXVhbChcImJhclwiKTtcbiAgICBlcnIuY29kZS5zaG91bGQuZXF1YWwoMSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgd29yayB3aXRoIHNwYWNlcyBpbiBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJlY2hvXCIpO1xuICAgIGxldCBlY2hvMSA9IFwibXkgbmFtZSBpcyBib2JcIjtcbiAgICBsZXQgZWNobzIgPSBcImxvbFwiO1xuICAgIGxldCB7c3Rkb3V0LCBzdGRlcnIsIGNvZGV9ID0gYXdhaXQgZXhlYyhjbWQsIFtlY2hvMSwgZWNobzJdKTtcbiAgICBzdGRvdXQudHJpbSgpLnNob3VsZC5lcXVhbChlY2hvMSk7XG4gICAgc3RkZXJyLnRyaW0oKS5zaG91bGQuZXF1YWwoZWNobzIpO1xuICAgIGNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBiYWNrc2xhc2hlcyBpbiBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJlY2hvXCIpO1xuICAgIGxldCBlY2hvMSA9IFwibXlcXFxcIG5hbWVcXFxcIGlzXFxcXCBib2JcIjtcbiAgICBsZXQgZWNobzIgPSBcImxvbFwiO1xuICAgIGxldCB7c3Rkb3V0LCBzdGRlcnIsIGNvZGV9ID0gYXdhaXQgZXhlYyhjbWQsIFtlY2hvMSwgZWNobzJdKTtcbiAgICBzdGRvdXQudHJpbSgpLnNob3VsZC5lcXVhbChlY2hvMSk7XG4gICAgc3RkZXJyLnRyaW0oKS5zaG91bGQuZXF1YWwoZWNobzIpO1xuICAgIGNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBzcGFjZXMgaW4gY29tbWFuZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJlY2hvIHdpdGggc3BhY2VcIik7XG4gICAgbGV0IGVjaG8xID0gXCJib2Jib2JcIjtcbiAgICBsZXQgZWNobzIgPSBcImxvbFwiO1xuICAgIGxldCB7c3Rkb3V0LCBzdGRlcnIsIGNvZGV9ID0gYXdhaXQgZXhlYyhjbWQsIFtlY2hvMSwgZWNobzJdKTtcbiAgICBzdGRvdXQudHJpbSgpLnNob3VsZC5lcXVhbChlY2hvMSk7XG4gICAgc3RkZXJyLnRyaW0oKS5zaG91bGQuZXF1YWwoZWNobzIpO1xuICAgIGNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBzcGFjZXMgaW4gY29tbWFuZHMgYW5kIGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY21kID0gZ2V0Rml4dHVyZShcImVjaG8gd2l0aCBzcGFjZVwiKTtcbiAgICBsZXQgZWNobzEgPSBcIm15IG5hbWUgaXMgYm9iXCI7XG4gICAgbGV0IGVjaG8yID0gXCJsb2xcIjtcbiAgICBsZXQge3N0ZG91dCwgc3RkZXJyLCBjb2RlfSA9IGF3YWl0IGV4ZWMoY21kLCBbZWNobzEsIGVjaG8yXSk7XG4gICAgc3Rkb3V0LnRyaW0oKS5zaG91bGQuZXF1YWwoZWNobzEpO1xuICAgIHN0ZGVyci50cmltKCkuc2hvdWxkLmVxdWFsKGVjaG8yKTtcbiAgICBjb2RlLnNob3VsZC5lcXVhbCgwKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXNwZWN0IGN3ZCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY21kID0gc3lzdGVtLmlzV2luZG93cygpID8gXCJlY2hvLmJhdFwiIDogXCIuL2VjaG8uc2hcIjtcbiAgICBsZXQgZWNobzEgPSBcIm15IG5hbWUgaXMgYm9iXCI7XG4gICAgbGV0IGVjaG8yID0gXCJsb2xcIjtcbiAgICBsZXQgY3dkID0gcGF0aC5kaXJuYW1lKGdldEZpeHR1cmUoXCJlY2hvXCIpKTtcbiAgICBsZXQge3N0ZG91dCwgc3RkZXJyLCBjb2RlfSA9IGF3YWl0IGV4ZWMoY21kLCBbZWNobzEsIGVjaG8yXSwge2N3ZH0pO1xuICAgIHN0ZG91dC50cmltKCkuc2hvdWxkLmVxdWFsKGVjaG8xKTtcbiAgICBzdGRlcnIudHJpbSgpLnNob3VsZC5lcXVhbChlY2hvMik7XG4gICAgY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmVzcGVjdCBlbnYnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJlbnZcIik7XG4gICAgbGV0IGVudiA9IHtGT086IFwibG9sb2xcIn07XG4gICAgbGV0IHtzdGRvdXQsIGNvZGV9ID0gYXdhaXQgZXhlYyhjbWQsIFtdLCB7ZW52fSk7XG4gICAgc3Rkb3V0LnRyaW0oKS5zaG91bGQuZXF1YWwoYCR7ZW52LkZPT30gJHtlbnYuRk9PfWApO1xuICAgIGNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGFsbG93IGEgdGltZW91dCBwYXJhbWV0ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IFwic2xlZXBcIjtcbiAgICBsZXQgYXJncyA9IFtcIjEwXCJdO1xuICAgIGxldCBlcnI7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGV4ZWMoY21kLCBhcmdzLCB7dGltZW91dDogNTAwfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyID0gZTtcbiAgICB9XG4gICAgc2hvdWxkLmV4aXN0KGVycik7XG4gICAgZXJyLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oXCJ0aW1lZCBvdXRcIik7XG4gICAgZXJyLm1lc3NhZ2Uuc2hvdWxkLmNvbnRhaW4oY21kKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBhbGxvdyBsYXJnZSBhbW91bnRzIG9mIG91dHB1dCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoZ2V0Rml4dHVyZShcImJpZ2J1ZmZlci5qc1wiKSk7XG4gICAgc3Rkb3V0Lmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoNTEyICogMTAyNCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgaWdub3JlIG91dHB1dCBpZiByZXF1ZXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNtZCA9IGdldEZpeHR1cmUoXCJlY2hvLnNoXCIpO1xuICAgIGxldCBlY2hvMSA9IFwibXkgbmFtZSBpcyBib2JcIjtcbiAgICBsZXQge3N0ZG91dCwgY29kZX0gPSBhd2FpdCBleGVjKGNtZCwgW2VjaG8xXSwge2lnbm9yZU91dHB1dDogdHJ1ZX0pO1xuICAgIHN0ZG91dC5zaG91bGQuZXF1YWwoXCJcIik7XG4gICAgY29kZS5zaG91bGQuZXF1YWwoMCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGEgQnVmZmVyIGlmIHJlcXVlc3RlZCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY21kID0gZ2V0Rml4dHVyZShcImVjaG8uc2hcIik7XG4gICAgbGV0IGVjaG8xID0gXCJteSBuYW1lIGlzIGJvYlwiO1xuICAgIGxldCB7c3Rkb3V0LCBzdGRlcnIsIGNvZGV9ID0gYXdhaXQgZXhlYyhjbWQsIFtlY2hvMV0sIHtpc0J1ZmZlcjogdHJ1ZX0pO1xuICAgIF8uaXNTdHJpbmcoc3Rkb3V0KS5zaG91bGQuYmUuZmFsc2U7XG4gICAgXy5pc0J1ZmZlcihzdGRvdXQpLnNob3VsZC5iZS50cnVlO1xuICAgIF8uaXNTdHJpbmcoc3RkZXJyKS5zaG91bGQuYmUuZmFsc2U7XG4gICAgXy5pc0J1ZmZlcihzdGRlcnIpLnNob3VsZC5iZS50cnVlO1xuICAgIGNvZGUuc2hvdWxkLmVxdWFsKDApO1xuICB9KTtcblxuICBkZXNjcmliZSgnYmluYXJ5IG91dHB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBQTkdfTUFHSUMgPSAnODk1MDRlNDcnO1xuICAgIGNvbnN0IFBOR19NQUdJQ19MRU5HVEggPSA0O1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBiaW5hcnkgb3V0cHV0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYygnY2F0JywgW2dldEZpeHR1cmUoJ3NjcmVlbnNob3QucG5nJyldLCB7ZW5jb2Rpbmc6ICdiaW5hcnknfSk7XG4gICAgICBfLmlzU3RyaW5nKHN0ZG91dCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBfLmlzQnVmZmVyKHN0ZG91dCkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgY29uc3Qgc2lnbmF0dXJlID0gbmV3IEJ1ZmZlcihzdGRvdXQsICdiaW5hcnknKS50b1N0cmluZygnaGV4JywgMCwgUE5HX01BR0lDX0xFTkdUSCk7XG4gICAgICBzaWduYXR1cmUuc2hvdWxkLmVxbChQTkdfTUFHSUMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBiaW5hcnkgb3V0cHV0IGFzIEJ1ZmZlcicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoJ2NhdCcsIFtnZXRGaXh0dXJlKCdzY3JlZW5zaG90LnBuZycpXSwge2VuY29kaW5nOiAnYmluYXJ5JywgaXNCdWZmZXI6IHRydWV9KTtcbiAgICAgIF8uaXNTdHJpbmcoc3Rkb3V0KS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICBfLmlzQnVmZmVyKHN0ZG91dCkuc2hvdWxkLmJlLnRydWU7XG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBzdGRvdXQudG9TdHJpbmcoJ2hleCcsIDAsIFBOR19NQUdJQ19MRU5HVEgpO1xuICAgICAgc2lnbmF0dXJlLnNob3VsZC5lcWwoUE5HX01BR0lDKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYWxsb3cgYmluYXJ5IG91dHB1dCBmcm9tIHRpbWVvdXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBleGVjKCdjYXQnLCBbZ2V0Rml4dHVyZSgnc2NyZWVuc2hvdC5wbmcnKV0sIHtlbmNvZGluZzogJ2JpbmFyeScsIHRpbWVvdXQ6IDF9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsZXQgc3Rkb3V0ID0gZXJyLnN0ZG91dDtcbiAgICAgICAgXy5pc1N0cmluZyhzdGRvdXQpLnNob3VsZC5iZS50cnVlO1xuICAgICAgICBfLmlzQnVmZmVyKHN0ZG91dCkuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBhbGxvdyBiaW5hcnkgb3V0cHV0IGFzIEJ1ZmZlciBmcm9tIHRpbWVvdXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBleGVjKCdjYXQnLCBbZ2V0Rml4dHVyZSgnc2NyZWVuc2hvdC5wbmcnKV0sIHtlbmNvZGluZzogJ2JpbmFyeScsIHRpbWVvdXQ6IDEsIGlzQnVmZmVyOiB0cnVlfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbGV0IHN0ZG91dCA9IGVyci5zdGRvdXQ7XG4gICAgICAgIF8uaXNTdHJpbmcoc3Rkb3V0KS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICAgIF8uaXNCdWZmZXIoc3Rkb3V0KS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
