require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var tp = _interopRequireWildcard(_teen_process);

var _libNodeDetector = require('../lib/node-detector');

var _libNodeDetector2 = _interopRequireDefault(_libNodeDetector);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
var expect = _chai2['default'].expect;

describe('NodeDetector', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs, tp: tp }, function (mocks, S) {
  it('retrieveInCommonPlaces - success', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(true));
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].retrieveInCommonPlaces());

        case 3:
          context$2$0.sent.should.equal('/usr/local/bin/node');

          (0, _appiumTestSupport.verify)(mocks);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('retrieveInCommonPlaces - failure', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.fs.expects('exists').twice().returns(_bluebird2['default'].resolve(false));
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].retrieveInCommonPlaces());

        case 3:
          context$2$0.t0 = context$2$0.sent;
          expect(context$2$0.t0).to.be.a('null');

          (0, _appiumTestSupport.verify)(mocks);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  // retrieveUsingSystemCall
  var testRetrieveWithScript = function testRetrieveWithScript(method) {
    if (method === 'retrieveUsingAppleScript') {
      _appiumSupport.system.isMac = function () {
        return true;
      };
    }
    it(method + ' - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(_bluebird2['default'].resolve({ stdout: '/a/b/c/d\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(true));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libNodeDetector2['default'][method]());

          case 4:
            context$3$0.sent.should.equal('/a/b/c/d');

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it(method + ' - failure - path not found ', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(_bluebird2['default'].resolve({ stdout: 'aaa not found\n', stderr: '' }));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libNodeDetector2['default'][method]());

          case 3:
            context$3$0.t0 = context$3$0.sent;
            expect(context$3$0.t0).to.be.a('null');

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it(method + ' - failure - path not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(_bluebird2['default'].resolve({ stdout: '/a/b/c/d\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(false));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libNodeDetector2['default'][method]());

          case 4:
            context$3$0.t0 = context$3$0.sent;
            expect(context$3$0.t0).to.be.a('null');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  };

  testRetrieveWithScript('retrieveUsingSystemCall');
  testRetrieveWithScript('retrieveUsingAppleScript');

  it('retrieveUsingAppiumConfigFile - success', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.fs.expects('exists').twice().returns(_bluebird2['default'].resolve(true));
          mocks.fs.expects('readFile').once().returns(_bluebird2['default'].resolve('{"node_bin": "/a/b/c/d"}'));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].retrieveUsingAppiumConfigFile());

        case 4:
          context$2$0.sent.should.equal('/a/b/c/d');

          (0, _appiumTestSupport.verify)(mocks);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('retrieveUsingAppiumConfigFile - failure - not json', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(true));
          mocks.fs.expects('readFile').once().returns(_bluebird2['default'].resolve('{node_bin: "/a/b/c/d"}'));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].retrieveUsingAppiumConfigFile());

        case 4:
          context$2$0.t0 = context$2$0.sent;
          expect(context$2$0.t0).to.be.a('null');

          (0, _appiumTestSupport.verify)(mocks);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('retrieveUsingAppiumConfigFile - failure - path does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(true));
          mocks.fs.expects('exists').once().returns(_bluebird2['default'].resolve(false));
          mocks.fs.expects('readFile').once().returns(_bluebird2['default'].resolve('{"node_bin": "/a/b/c/d"}'));
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].retrieveUsingAppiumConfigFile());

        case 5:
          context$2$0.t0 = context$2$0.sent;
          expect(context$2$0.t0).to.be.a('null');

          (0, _appiumTestSupport.verify)(mocks);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('checkForNodeBinary - success', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.NodeDetector = S.sandbox.mock(_libNodeDetector2['default']);
          mocks.NodeDetector.expects('retrieveInCommonPlaces').once().returns(null);
          mocks.NodeDetector.expects('retrieveUsingSystemCall').once().returns(null);
          mocks.NodeDetector.expects('retrieveUsingAppleScript').returns('/a/b/c/d');
          mocks.NodeDetector.expects('retrieveUsingAppiumConfigFile').never();
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].detect());

        case 7:
          context$2$0.sent.should.equal('/a/b/c/d');

          (0, _appiumTestSupport.verify)(mocks);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('checkForNodeBinary - failure', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.NodeDetector = S.sandbox.mock(_libNodeDetector2['default']);
          mocks.NodeDetector.expects('retrieveInCommonPlaces').once().returns(null);
          mocks.NodeDetector.expects('retrieveUsingSystemCall').once().returns(null);
          mocks.NodeDetector.expects('retrieveUsingAppleScript').once().returns(null);
          mocks.NodeDetector.expects('retrieveUsingAppiumConfigFile').once().returns(null);
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_libNodeDetector2['default'].detect());

        case 7:
          context$2$0.t0 = context$2$0.sent;
          expect(context$2$0.t0).to.be.a('null');

          (0, _appiumTestSupport.verify)(mocks);

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvbm9kZS1kZXRlY3Rvci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7b0JBRWlCLE1BQU07Ozs7NkJBQ0ksZ0JBQWdCOzs0QkFDdkIsY0FBYzs7SUFBdEIsRUFBRTs7K0JBQ1csc0JBQXNCOzs7O3dCQUNqQyxVQUFVOzs7O2lDQUNVLHFCQUFxQjs7QUFHdkQsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsa0NBQVUsRUFBQyxFQUFFLG1CQUFBLEVBQUUsRUFBRSxFQUFGLEVBQUUsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFFLENBQUMsRUFBSztBQUN6RCxJQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7QUFDckMsZUFBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLHNCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzsyQ0FDcEQsNkJBQWEsc0JBQXNCLEVBQUU7OzsyQkFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUI7O0FBQ3JDLHlDQUFPLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0dBQ2YsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxrQ0FBa0MsRUFBRTs7OztBQUNyQyxlQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsc0JBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OzJDQUNoRCw2QkFBYSxzQkFBc0IsRUFBRTs7OztBQUFsRCxnQkFBTSxpQkFBOEMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTs7QUFDbEUseUNBQU8sS0FBSyxDQUFDLENBQUM7Ozs7Ozs7R0FDZixDQUFDLENBQUM7OztBQUdILE1BQUksc0JB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LElBQUksQ0FBQyxDQUFDOzsyQ0FDcEUsNkJBQWEsTUFBTSxFQUFFOzs7O0FBQWxDLGdCQUFNLGlCQUE4QixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNOztBQUNsRCx5Q0FBTyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUNmLENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3Qvbm9kZS1kZXRlY3Rvci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCB7IGZzLCBzeXN0ZW0gfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgKiBhcyB0cCBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IE5vZGVEZXRlY3RvciBmcm9tICcuLi9saWIvbm9kZS1kZXRlY3Rvcic7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgeyB3aXRoTW9ja3MsIHZlcmlmeSB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG5cbmRlc2NyaWJlKCdOb2RlRGV0ZWN0b3InLCB3aXRoTW9ja3Moe2ZzLCB0cH0sIChtb2NrcywgUykgPT4ge1xuICBpdCgncmV0cmlldmVJbkNvbW1vblBsYWNlcyAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoQi5yZXNvbHZlKHRydWUpKTtcbiAgICAoYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlSW5Db21tb25QbGFjZXMoKSlcbiAgICAgIC5zaG91bGQuZXF1YWwoJy91c3IvbG9jYWwvYmluL25vZGUnKTtcbiAgICB2ZXJpZnkobW9ja3MpO1xuICB9KTtcblxuICBpdCgncmV0cmlldmVJbkNvbW1vblBsYWNlcyAtIGZhaWx1cmUnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykudHdpY2UoKS5yZXR1cm5zKEIucmVzb2x2ZShmYWxzZSkpO1xuICAgIGV4cGVjdChhd2FpdCBOb2RlRGV0ZWN0b3IucmV0cmlldmVJbkNvbW1vblBsYWNlcygpKS50by5iZS5hKCdudWxsJyk7XG4gICAgdmVyaWZ5KG1vY2tzKTtcbiAgfSk7XG5cbiAgLy8gcmV0cmlldmVVc2luZ1N5c3RlbUNhbGxcbiAgbGV0IHRlc3RSZXRyaWV2ZVdpdGhTY3JpcHQgPSAobWV0aG9kKSA9PiB7XG4gICAgaWYgKG1ldGhvZCA9PT0gJ3JldHJpZXZlVXNpbmdBcHBsZVNjcmlwdCcpIHtcbiAgICAgIHN5c3RlbS5pc01hYyA9ICgpID0+IHRydWU7XG4gICAgfVxuICAgIGl0KG1ldGhvZCArICcgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MudHAuZXhwZWN0cygnZXhlYycpLm9uY2UoKS5yZXR1cm5zKFxuICAgICAgICBCLnJlc29sdmUoe3N0ZG91dDogJy9hL2IvYy9kXFxuJywgc3RkZXJyOiAnJ30pKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKEIucmVzb2x2ZSh0cnVlKSk7XG4gICAgICAoYXdhaXQgTm9kZURldGVjdG9yW21ldGhvZF0oKSlcbiAgICAgICAgLnNob3VsZC5lcXVhbCgnL2EvYi9jL2QnKTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG5cbiAgICBpdChtZXRob2QgKyAnIC0gZmFpbHVyZSAtIHBhdGggbm90IGZvdW5kICcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgQi5yZXNvbHZlKHtzdGRvdXQ6ICdhYWEgbm90IGZvdW5kXFxuJywgc3RkZXJyOiAnJ30pKTtcbiAgICAgIGV4cGVjdChhd2FpdCBOb2RlRGV0ZWN0b3JbbWV0aG9kXSgpKS50by5iZS5hKCdudWxsJyk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KG1ldGhvZCArICcgLSBmYWlsdXJlIC0gcGF0aCBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoXG4gICAgICAgIEIucmVzb2x2ZSh7c3Rkb3V0OiAnL2EvYi9jL2RcXG4nLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoQi5yZXNvbHZlKGZhbHNlKSk7XG4gICAgICBleHBlY3QoYXdhaXQgTm9kZURldGVjdG9yW21ldGhvZF0oKSkudG8uYmUuYSgnbnVsbCcpO1xuICAgIH0pO1xuICB9O1xuXG4gIHRlc3RSZXRyaWV2ZVdpdGhTY3JpcHQoJ3JldHJpZXZlVXNpbmdTeXN0ZW1DYWxsJyk7XG4gIHRlc3RSZXRyaWV2ZVdpdGhTY3JpcHQoJ3JldHJpZXZlVXNpbmdBcHBsZVNjcmlwdCcpO1xuXG4gIGl0KCdyZXRyaWV2ZVVzaW5nQXBwaXVtQ29uZmlnRmlsZSAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykudHdpY2UoKS5yZXR1cm5zKEIucmVzb2x2ZSh0cnVlKSk7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygncmVhZEZpbGUnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgIEIucmVzb2x2ZSgne1wibm9kZV9iaW5cIjogXCIvYS9iL2MvZFwifScpKTtcbiAgICAoYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlVXNpbmdBcHBpdW1Db25maWdGaWxlKCkpXG4gICAgICAuc2hvdWxkLmVxdWFsKCcvYS9iL2MvZCcpO1xuICAgIHZlcmlmeShtb2Nrcyk7XG4gIH0pO1xuXG4gIGl0KCdyZXRyaWV2ZVVzaW5nQXBwaXVtQ29uZmlnRmlsZSAtIGZhaWx1cmUgLSBub3QganNvbicsIGFzeW5jICgpID0+IHtcbiAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyhCLnJlc29sdmUodHJ1ZSkpO1xuICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JlYWRGaWxlJykub25jZSgpLnJldHVybnMoXG4gICAgICBCLnJlc29sdmUoJ3tub2RlX2JpbjogXCIvYS9iL2MvZFwifScpKTtcbiAgICBleHBlY3QoYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlVXNpbmdBcHBpdW1Db25maWdGaWxlKCkpXG4gICAgICAudG8uYmUuYSgnbnVsbCcpO1xuICAgIHZlcmlmeShtb2Nrcyk7XG4gIH0pO1xuXG4gIGl0KCdyZXRyaWV2ZVVzaW5nQXBwaXVtQ29uZmlnRmlsZSAtIGZhaWx1cmUgLSBwYXRoIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKEIucmVzb2x2ZSh0cnVlKSk7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoQi5yZXNvbHZlKGZhbHNlKSk7XG4gICAgbW9ja3MuZnMuZXhwZWN0cygncmVhZEZpbGUnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgIEIucmVzb2x2ZSgne1wibm9kZV9iaW5cIjogXCIvYS9iL2MvZFwifScpKTtcbiAgICBleHBlY3QoYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlVXNpbmdBcHBpdW1Db25maWdGaWxlKCkpXG4gICAgICAudG8uYmUuYSgnbnVsbCcpO1xuICAgIHZlcmlmeShtb2Nrcyk7XG4gIH0pO1xuXG4gIGl0KCdjaGVja0Zvck5vZGVCaW5hcnkgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgIG1vY2tzLk5vZGVEZXRlY3RvciA9IFMuc2FuZGJveC5tb2NrKE5vZGVEZXRlY3Rvcik7XG4gICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ3JldHJpZXZlSW5Db21tb25QbGFjZXMnKS5vbmNlKCkucmV0dXJucyhudWxsKTtcbiAgICBtb2Nrcy5Ob2RlRGV0ZWN0b3IuZXhwZWN0cygncmV0cmlldmVVc2luZ1N5c3RlbUNhbGwnKS5vbmNlKCkucmV0dXJucyhudWxsKTtcbiAgICBtb2Nrcy5Ob2RlRGV0ZWN0b3IuZXhwZWN0cygncmV0cmlldmVVc2luZ0FwcGxlU2NyaXB0JykucmV0dXJucygnL2EvYi9jL2QnKTtcbiAgICBtb2Nrcy5Ob2RlRGV0ZWN0b3IuZXhwZWN0cygncmV0cmlldmVVc2luZ0FwcGl1bUNvbmZpZ0ZpbGUnKS5uZXZlcigpO1xuICAgIChhd2FpdCBOb2RlRGV0ZWN0b3IuZGV0ZWN0KCkpLnNob3VsZC5lcXVhbCgnL2EvYi9jL2QnKTtcbiAgICB2ZXJpZnkobW9ja3MpO1xuICB9KTtcblxuICBpdCgnY2hlY2tGb3JOb2RlQmluYXJ5IC0gZmFpbHVyZScsIGFzeW5jICgpID0+IHtcbiAgICBtb2Nrcy5Ob2RlRGV0ZWN0b3IgPSBTLnNhbmRib3gubW9jayhOb2RlRGV0ZWN0b3IpO1xuICAgIG1vY2tzLk5vZGVEZXRlY3Rvci5leHBlY3RzKCdyZXRyaWV2ZUluQ29tbW9uUGxhY2VzJykub25jZSgpLnJldHVybnMobnVsbCk7XG4gICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ3JldHJpZXZlVXNpbmdTeXN0ZW1DYWxsJykub25jZSgpLnJldHVybnMobnVsbCk7XG4gICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ3JldHJpZXZlVXNpbmdBcHBsZVNjcmlwdCcpLm9uY2UoKS5yZXR1cm5zKG51bGwpO1xuICAgIG1vY2tzLk5vZGVEZXRlY3Rvci5leHBlY3RzKCdyZXRyaWV2ZVVzaW5nQXBwaXVtQ29uZmlnRmlsZScpLm9uY2UoKS5yZXR1cm5zKG51bGwpO1xuICAgIGV4cGVjdChhd2FpdCBOb2RlRGV0ZWN0b3IuZGV0ZWN0KCkpLnRvLmJlLmEoJ251bGwnKTtcbiAgICB2ZXJpZnkobW9ja3MpO1xuICB9KTtcblxufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
