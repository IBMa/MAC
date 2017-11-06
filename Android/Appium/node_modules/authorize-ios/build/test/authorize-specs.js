'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _libAuthorize = require('../lib/authorize');

var _libAuthorize2 = _interopRequireDefault(_libAuthorize);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumXcode = require('appium-xcode');

var _appiumXcode2 = _interopRequireDefault(_appiumXcode);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var sandbox = null;
var SANDBOX = _Symbol();
var mocks = {};
var libs = { teen_process: teen_process, xcode: _appiumXcode2['default'], path: _path2['default'] };

describe('Authorize test', function () {
  beforeEach(function () {
    sandbox = _sinon2['default'].sandbox.create();
    mocks[SANDBOX] = sandbox;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(_lodash2['default'].pairs(libs)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var key = _step$value[0];
        var value = _step$value[1];

        mocks[key] = sandbox.mock(value);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should throw an error', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects('exec').once().withExactArgs('DevToolsSecurity', ['--enable']).throws('Error');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap((0, _libAuthorize2['default'])().should.eventually.be.rejectedWith('Error'));

        case 3:
          mocks[SANDBOX].verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('should pass all mocks', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects('exec').atLeast(3);

          mocks.xcode.expects('getPath').once().returns('xcodeDir/Applications/Xcode.app/Contents/Developer');

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libAuthorize2['default'])());

        case 4:
          mocks[SANDBOX].verify();

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYXV0aG9yaXplLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBQXNCLGtCQUFrQjs7Ozs0QkFDVixjQUFjOztJQUFoQyxZQUFZOzsyQkFDTixjQUFjOzs7O29CQUNmLE1BQU07Ozs7cUJBQ0wsT0FBTzs7OztvQkFDUixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztzQkFDL0IsUUFBUTs7OztBQUd0QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztBQUNuQixJQUFJLE9BQU8sR0FBRyxTQUFRLENBQUM7QUFDdkIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsSUFBSSxJQUFJLEdBQUcsRUFBQyxZQUFZLEVBQVosWUFBWSxFQUFFLEtBQUssMEJBQUEsRUFBRSxJQUFJLG1CQUFBLEVBQUMsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLFlBQUs7QUFDOUIsWUFBVSxDQUFDLFlBQU07QUFDZixXQUFPLEdBQUcsbUJBQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2pDLFNBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7Ozs7OztBQUN6Qix3Q0FBeUIsb0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyw0R0FBRTs7O1lBQTlCLEdBQUc7WUFBRSxLQUFLOztBQUNsQixhQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUNsQzs7Ozs7Ozs7Ozs7Ozs7O0dBQ0YsQ0FBQyxDQUFDOztBQUVILFdBQVMsQ0FBQyxZQUFNO0FBQ2QsV0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ25CLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsdUJBQXVCLEVBQUU7Ozs7QUFDMUIsZUFBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7OzJDQUNwRyxnQ0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7OztBQUM1RCxlQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7R0FDekIsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyx1QkFBdUIsRUFBRTs7OztBQUMxQixlQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTlDLGVBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxvREFBb0QsQ0FBQyxDQUFDOzs7MkNBRTlGLGdDQUFXOzs7QUFDakIsZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0dBQ3pCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2F1dGhvcml6ZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhdXRob3JpemUgZnJvbSAnLi4vbGliL2F1dGhvcml6ZSc7XG5pbXBvcnQgKiBhcyB0ZWVuX3Byb2Nlc3MgZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB4Y29kZSBmcm9tICdhcHBpdW0teGNvZGUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBzYW5kYm94ID0gbnVsbDtcbmxldCBTQU5EQk9YID0gU3ltYm9sKCk7XG5sZXQgbW9ja3MgPSB7fTtcbmxldCBsaWJzID0ge3RlZW5fcHJvY2VzcywgeGNvZGUsIHBhdGh9O1xuXG5kZXNjcmliZSgnQXV0aG9yaXplIHRlc3QnLCAoKSA9PntcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgbW9ja3NbU0FOREJPWF0gPSBzYW5kYm94O1xuICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBfLnBhaXJzKGxpYnMpKSB7XG4gICAgICBtb2Nrc1trZXldID0gc2FuZGJveC5tb2NrKHZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkud2l0aEV4YWN0QXJncygnRGV2VG9vbHNTZWN1cml0eScsIFsnLS1lbmFibGUnXSkudGhyb3dzKCdFcnJvcicpO1xuICAgIGF3YWl0IGF1dGhvcml6ZSgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnRXJyb3InKTtcbiAgICBtb2Nrc1tTQU5EQk9YXS52ZXJpZnkoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBwYXNzIGFsbCBtb2NrcycsIGFzeW5jICgpID0+IHtcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpLmF0TGVhc3QoMyk7XG5cbiAgICBtb2Nrcy54Y29kZS5leHBlY3RzKCdnZXRQYXRoJykub25jZSgpLnJldHVybnMoJ3hjb2RlRGlyL0FwcGxpY2F0aW9ucy9YY29kZS5hcHAvQ29udGVudHMvRGV2ZWxvcGVyJyk7XG5cbiAgICBhd2FpdCBhdXRob3JpemUoKTtcbiAgICBtb2Nrc1tTQU5EQk9YXS52ZXJpZnkoKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
