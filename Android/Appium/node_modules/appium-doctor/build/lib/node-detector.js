'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var NODE_COMMON_PATHS = [process.env.NODE_BIN, '/usr/local/bin/node', '/opt/local/bin/node'];

// Look for node

var NodeDetector = (function () {
  function NodeDetector() {
    _classCallCheck(this, NodeDetector);
  }

  _createClass(NodeDetector, null, [{
    key: 'retrieveInCommonPlaces',
    value: function retrieveInCommonPlaces() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p;

      return _regeneratorRuntime.async(function retrieveInCommonPlaces$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 3;
            _iterator = _getIterator(NODE_COMMON_PATHS);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 18;
              break;
            }

            p = _step.value;
            context$2$0.t0 = p;

            if (!context$2$0.t0) {
              context$2$0.next = 12;
              break;
            }

            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(p));

          case 11:
            context$2$0.t0 = context$2$0.sent;

          case 12:
            if (!context$2$0.t0) {
              context$2$0.next = 15;
              break;
            }

            _logger2['default'].debug('Node binary found at common place: ' + p);
            return context$2$0.abrupt('return', p);

          case 15:
            _iteratorNormalCompletion = true;
            context$2$0.next = 5;
            break;

          case 18:
            context$2$0.next = 24;
            break;

          case 20:
            context$2$0.prev = 20;
            context$2$0.t1 = context$2$0['catch'](3);
            _didIteratorError = true;
            _iteratorError = context$2$0.t1;

          case 24:
            context$2$0.prev = 24;
            context$2$0.prev = 25;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 27:
            context$2$0.prev = 27;

            if (!_didIteratorError) {
              context$2$0.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return context$2$0.finish(27);

          case 31:
            return context$2$0.finish(24);

          case 32:
            _logger2['default'].debug('Node binary wasn\'t found at common places.');
            return context$2$0.abrupt('return', null);

          case 34:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 20, 24, 32], [25,, 27, 31]]);
    }
  }, {
    key: 'retrieveUsingSystemCall',
    value: function retrieveUsingSystemCall() {
      var stdout, cmd, nodePath;
      return _regeneratorRuntime.async(function retrieveUsingSystemCall$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            stdout = undefined;
            cmd = 'which';

            if (_appiumSupport.system.isWindows()) {
              cmd = 'where';
            }

            context$2$0.prev = 3;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, ['node']));

          case 6:
            stdout = context$2$0.sent.stdout;
            context$2$0.next = 13;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](3);

            _logger2['default'].debug(context$2$0.t0);
            return context$2$0.abrupt('return', null);

          case 13:
            nodePath = stdout.replace(/[\n\r]/g, "");
            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(nodePath));

          case 16:
            if (!context$2$0.sent) {
              context$2$0.next = 21;
              break;
            }

            _logger2['default'].debug('Node binary found using ' + cmd + ' command at: ' + nodePath);
            return context$2$0.abrupt('return', nodePath);

          case 21:
            _logger2['default'].debug('Node binary not found using the ' + cmd + ' command.');
            return context$2$0.abrupt('return', null);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 9]]);
    }
  }, {
    key: 'retrieveUsingAppleScript',
    value: function retrieveUsingAppleScript() {
      var appScript, stdout, nodePath;
      return _regeneratorRuntime.async(function retrieveUsingAppleScript$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (_appiumSupport.system.isMac()) {
              context$2$0.next = 3;
              break;
            }

            _logger2['default'].debug('Not on Darwin, skipping Apple Script');
            return context$2$0.abrupt('return', null);

          case 3:
            appScript = ['try', '  set appiumIsRunning to false', '  tell application "System Events"', '    set appiumIsRunning to name of every process contains "Appium"', '  end tell', '  if appiumIsRunning then', '    tell application "Appium" to return node path', '  end if', 'end try', 'return "NULL"'].join("\n");
            stdout = undefined;
            context$2$0.prev = 5;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('osascript', ['-e', appScript]));

          case 8:
            stdout = context$2$0.sent.stdout;
            context$2$0.next = 15;
            break;

          case 11:
            context$2$0.prev = 11;
            context$2$0.t0 = context$2$0['catch'](5);

            _logger2['default'].debug(context$2$0.t0);
            return context$2$0.abrupt('return', null);

          case 15:
            nodePath = stdout.replace("\n", "");
            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(nodePath));

          case 18:
            if (!context$2$0.sent) {
              context$2$0.next = 23;
              break;
            }

            _logger2['default'].debug('Node binary found using AppleScript at: ' + nodePath);
            return context$2$0.abrupt('return', nodePath);

          case 23:
            _logger2['default'].debug('Node binary not found using AppleScript.');
            return context$2$0.abrupt('return', null);

          case 25:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[5, 11]]);
    }
  }, {
    key: 'retrieveUsingAppiumConfigFile',
    value: function retrieveUsingAppiumConfigFile() {
      var jsonobj, appiumConfigPath;
      return _regeneratorRuntime.async(function retrieveUsingAppiumConfigFile$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            jsonobj = undefined;
            context$2$0.prev = 1;
            appiumConfigPath = _path2['default'].resolve(__dirname, '..', '..', '.appiumconfig.json');
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(appiumConfigPath));

          case 5:
            if (!context$2$0.sent) {
              context$2$0.next = 11;
              break;
            }

            context$2$0.t0 = JSON;
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(appiumConfigPath, 'utf8'));

          case 9:
            context$2$0.t1 = context$2$0.sent;
            jsonobj = context$2$0.t0.parse.call(context$2$0.t0, context$2$0.t1);

          case 11:
            context$2$0.next = 17;
            break;

          case 13:
            context$2$0.prev = 13;
            context$2$0.t2 = context$2$0['catch'](1);

            _logger2['default'].debug(context$2$0.t2);
            return context$2$0.abrupt('return', null);

          case 17:
            context$2$0.t3 = jsonobj && jsonobj.node_bin;

            if (!context$2$0.t3) {
              context$2$0.next = 22;
              break;
            }

            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(jsonobj.node_bin));

          case 21:
            context$2$0.t3 = context$2$0.sent;

          case 22:
            if (!context$2$0.t3) {
              context$2$0.next = 27;
              break;
            }

            _logger2['default'].debug('Node binary found using .appiumconfig.json at: ' + jsonobj.node_bin);
            return context$2$0.abrupt('return', jsonobj.node_bin);

          case 27:
            _logger2['default'].debug('Node binary not found in the .appiumconfig.json file.');
            return context$2$0.abrupt('return', null);

          case 29:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 13]]);
    }
  }, {
    key: 'detect',
    value: function detect() {
      var nodePath;
      return _regeneratorRuntime.async(function detect$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(NodeDetector.retrieveUsingSystemCall());

          case 2:
            context$2$0.t2 = context$2$0.sent;

            if (context$2$0.t2) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(NodeDetector.retrieveInCommonPlaces());

          case 6:
            context$2$0.t2 = context$2$0.sent;

          case 7:
            context$2$0.t1 = context$2$0.t2;

            if (context$2$0.t1) {
              context$2$0.next = 12;
              break;
            }

            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(NodeDetector.retrieveUsingAppleScript());

          case 11:
            context$2$0.t1 = context$2$0.sent;

          case 12:
            context$2$0.t0 = context$2$0.t1;

            if (context$2$0.t0) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(NodeDetector.retrieveUsingAppiumConfigFile());

          case 16:
            context$2$0.t0 = context$2$0.sent;

          case 17:
            nodePath = context$2$0.t0;

            if (!nodePath) {
              context$2$0.next = 22;
              break;
            }

            return context$2$0.abrupt('return', nodePath);

          case 22:
            _logger2['default'].warn('The node binary could not be found.');
            return context$2$0.abrupt('return', null);

          case 24:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return NodeDetector;
})();

exports['default'] = NodeDetector;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ub2RlLWRldGVjdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBQTJCLGdCQUFnQjs7NEJBQ3RCLGNBQWM7O3NCQUNuQixVQUFVOzs7O29CQUNULE1BQU07Ozs7QUFFdkIsSUFBTSxpQkFBaUIsR0FBRyxDQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDcEIscUJBQXFCLEVBQ3JCLHFCQUFxQixDQUN0QixDQUFDOzs7O0lBR0ksWUFBWTtXQUFaLFlBQVk7MEJBQVosWUFBWTs7O2VBQVosWUFBWTs7V0FDb0I7MEZBQ3pCLENBQUM7Ozs7Ozs7OztxQ0FBSSxpQkFBaUI7Ozs7Ozs7O0FBQXRCLGFBQUM7NkJBQ0osQ0FBQzs7Ozs7Ozs7NkNBQVUsa0JBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUFDekIsZ0NBQUksS0FBSyx5Q0FBdUMsQ0FBQyxDQUFHLENBQUM7Z0RBQzlDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdaLGdDQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2dEQUNsRCxJQUFJOzs7Ozs7O0tBQ1o7OztXQUVvQztVQUMvQixNQUFNLEVBQ04sR0FBRyxFQVlILFFBQVE7Ozs7QUFiUixrQkFBTTtBQUNOLGVBQUcsR0FBRyxPQUFPOztBQUVqQixnQkFBSSxzQkFBTyxTQUFTLEVBQUUsRUFBRTtBQUN0QixpQkFBRyxHQUFHLE9BQU8sQ0FBQzthQUNmOzs7OzZDQUdpQix3QkFBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBQW5DLGtCQUFNLG9CQUErQixNQUFNOzs7Ozs7OztBQUUzQyxnQ0FBSSxLQUFLLGdCQUFLLENBQUM7Z0RBQ1IsSUFBSTs7O0FBRVQsb0JBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7OzZDQUNsQyxrQkFBRyxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7OztBQUMzQixnQ0FBSSxLQUFLLDhCQUE0QixHQUFHLHFCQUFnQixRQUFRLENBQUcsQ0FBQztnREFDN0QsUUFBUTs7O0FBRWYsZ0NBQUksS0FBSyxzQ0FBb0MsR0FBRyxlQUFZLENBQUM7Z0RBQ3RELElBQUk7Ozs7Ozs7S0FFZDs7O1dBRXFDO1VBTWhDLFNBQVMsRUFZVCxNQUFNLEVBT04sUUFBUTs7OztnQkF4QlAsc0JBQU8sS0FBSyxFQUFFOzs7OztBQUNqQixnQ0FBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztnREFDM0MsSUFBSTs7O0FBR1QscUJBQVMsR0FBRyxDQUNkLEtBQUssRUFDSCxnQ0FBZ0MsRUFDaEMsb0NBQW9DLEVBQ3BDLG9FQUFvRSxFQUNwRSxZQUFZLEVBQ1osMkJBQTJCLEVBQzNCLG1EQUFtRCxFQUNuRCxVQUFVLEVBQ1YsU0FBUyxFQUNULGVBQWUsQ0FDbEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ1Isa0JBQU07Ozs2Q0FFUSx3QkFBSyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7OztBQUFwRCxrQkFBTSxvQkFBZ0QsTUFBTTs7Ozs7Ozs7QUFFNUQsZ0NBQUksS0FBSyxnQkFBSyxDQUFDO2dEQUNSLElBQUk7OztBQUVULG9CQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDOzs2Q0FDN0Isa0JBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7QUFDM0IsZ0NBQUksS0FBSyw4Q0FBNEMsUUFBUSxDQUFHLENBQUM7Z0RBQzFELFFBQVE7OztBQUVmLGdDQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2dEQUMvQyxJQUFJOzs7Ozs7O0tBRWQ7OztXQUUwQztVQUNyQyxPQUFPLEVBRUwsZ0JBQWdCOzs7O0FBRmxCLG1CQUFPOztBQUVMLDRCQUFnQixHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsQ0FBQzs7NkNBQ3RFLGtCQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7NkJBQ3pCLElBQUk7OzZDQUFhLGtCQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7Ozs7QUFBaEUsbUJBQU8sa0JBQVEsS0FBSzs7Ozs7Ozs7OztBQUd0QixnQ0FBSSxLQUFLLGdCQUFLLENBQUM7Z0RBQ1IsSUFBSTs7OzZCQUVULE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUTs7Ozs7Ozs7NkNBQVUsa0JBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7O0FBQ2xFLGdDQUFJLEtBQUsscURBQW1ELE9BQU8sQ0FBQyxRQUFRLENBQUcsQ0FBQztnREFDekUsT0FBTyxDQUFDLFFBQVE7OztBQUV2QixnQ0FBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztnREFDNUQsSUFBSTs7Ozs7OztLQUVkOzs7V0FFbUI7VUFDZCxRQUFROzs7Ozs2Q0FBUyxZQUFZLENBQUMsdUJBQXVCLEVBQUU7Ozs7Ozs7Ozs7OzZDQUNuRCxZQUFZLENBQUMsc0JBQXNCLEVBQUU7Ozs7Ozs7Ozs7Ozs7OzZDQUNyQyxZQUFZLENBQUMsd0JBQXdCLEVBQUU7Ozs7Ozs7Ozs7Ozs7OzZDQUN2QyxZQUFZLENBQUMsNkJBQTZCLEVBQUU7Ozs7OztBQUhoRCxvQkFBUTs7aUJBSVIsUUFBUTs7Ozs7Z0RBQ0gsUUFBUTs7O0FBRWYsZ0NBQUksSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Z0RBQ3pDLElBQUk7Ozs7Ozs7S0FFZDs7O1NBdEdHLFlBQVk7OztxQkF5R0gsWUFBWSIsImZpbGUiOiJsaWIvbm9kZS1kZXRlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZzLCBzeXN0ZW0gfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IE5PREVfQ09NTU9OX1BBVEhTID0gW1xuICBwcm9jZXNzLmVudi5OT0RFX0JJTixcbiAgJy91c3IvbG9jYWwvYmluL25vZGUnLFxuICAnL29wdC9sb2NhbC9iaW4vbm9kZScsXG5dO1xuXG4vLyBMb29rIGZvciBub2RlXG5jbGFzcyBOb2RlRGV0ZWN0b3Ige1xuICBzdGF0aWMgYXN5bmMgcmV0cmlldmVJbkNvbW1vblBsYWNlcyAoKSB7XG4gICAgZm9yIChsZXQgcCBvZiBOT0RFX0NPTU1PTl9QQVRIUykge1xuICAgICAgaWYgKHAgJiYgYXdhaXQgZnMuZXhpc3RzKHApKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhgTm9kZSBiaW5hcnkgZm91bmQgYXQgY29tbW9uIHBsYWNlOiAke3B9YCk7XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfVxuICAgIH1cbiAgICBsb2cuZGVidWcoJ05vZGUgYmluYXJ5IHdhc25cXCd0IGZvdW5kIGF0IGNvbW1vbiBwbGFjZXMuJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcmV0cmlldmVVc2luZ1N5c3RlbUNhbGwgKCkge1xuICAgIGxldCBzdGRvdXQ7XG4gICAgbGV0IGNtZCA9ICd3aGljaCc7XG5cbiAgICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XG4gICAgICBjbWQgPSAnd2hlcmUnO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBzdGRvdXQgPSAoYXdhaXQgZXhlYyhjbWQsIFsnbm9kZSddKSkuc3Rkb3V0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLmRlYnVnKGVycik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IG5vZGVQYXRoID0gc3Rkb3V0LnJlcGxhY2UoL1tcXG5cXHJdL2csIFwiXCIpO1xuICAgIGlmIChhd2FpdCBmcy5leGlzdHMobm9kZVBhdGgpKSB7XG4gICAgICBsb2cuZGVidWcoYE5vZGUgYmluYXJ5IGZvdW5kIHVzaW5nICR7Y21kfSBjb21tYW5kIGF0OiAke25vZGVQYXRofWApO1xuICAgICAgcmV0dXJuIG5vZGVQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZGVidWcoYE5vZGUgYmluYXJ5IG5vdCBmb3VuZCB1c2luZyB0aGUgJHtjbWR9IGNvbW1hbmQuYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcmV0cmlldmVVc2luZ0FwcGxlU2NyaXB0ICgpIHtcbiAgICBpZiAoIXN5c3RlbS5pc01hYygpKSB7XG4gICAgICBsb2cuZGVidWcoJ05vdCBvbiBEYXJ3aW4sIHNraXBwaW5nIEFwcGxlIFNjcmlwdCcpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGFwcFNjcmlwdCA9IFtcbiAgICAgICd0cnknXG4gICAgICAsICcgIHNldCBhcHBpdW1Jc1J1bm5pbmcgdG8gZmFsc2UnXG4gICAgICAsICcgIHRlbGwgYXBwbGljYXRpb24gXCJTeXN0ZW0gRXZlbnRzXCInXG4gICAgICAsICcgICAgc2V0IGFwcGl1bUlzUnVubmluZyB0byBuYW1lIG9mIGV2ZXJ5IHByb2Nlc3MgY29udGFpbnMgXCJBcHBpdW1cIidcbiAgICAgICwgJyAgZW5kIHRlbGwnXG4gICAgICAsICcgIGlmIGFwcGl1bUlzUnVubmluZyB0aGVuJ1xuICAgICAgLCAnICAgIHRlbGwgYXBwbGljYXRpb24gXCJBcHBpdW1cIiB0byByZXR1cm4gbm9kZSBwYXRoJ1xuICAgICAgLCAnICBlbmQgaWYnXG4gICAgICAsICdlbmQgdHJ5J1xuICAgICAgLCAncmV0dXJuIFwiTlVMTFwiJ1xuICAgIF0uam9pbihcIlxcblwiKTtcbiAgICBsZXQgc3Rkb3V0O1xuICAgIHRyeSB7XG4gICAgICBzdGRvdXQgPSAoYXdhaXQgZXhlYygnb3Nhc2NyaXB0JywgWyctZScsIGFwcFNjcmlwdF0pKS5zdGRvdXQ7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZGVidWcoZXJyKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgbm9kZVBhdGggPSBzdGRvdXQucmVwbGFjZShcIlxcblwiLCBcIlwiKTtcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKG5vZGVQYXRoKSkge1xuICAgICAgbG9nLmRlYnVnKGBOb2RlIGJpbmFyeSBmb3VuZCB1c2luZyBBcHBsZVNjcmlwdCBhdDogJHtub2RlUGF0aH1gKTtcbiAgICAgIHJldHVybiBub2RlUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKCdOb2RlIGJpbmFyeSBub3QgZm91bmQgdXNpbmcgQXBwbGVTY3JpcHQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcmV0cmlldmVVc2luZ0FwcGl1bUNvbmZpZ0ZpbGUgKCkge1xuICAgIGxldCBqc29ub2JqO1xuICAgIHRyeSB7XG4gICAgICB2YXIgYXBwaXVtQ29uZmlnUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuYXBwaXVtY29uZmlnLmpzb24nKTtcbiAgICAgIGlmIChhd2FpdCBmcy5leGlzdHMoYXBwaXVtQ29uZmlnUGF0aCkpIHtcbiAgICAgICAganNvbm9iaiA9IEpTT04ucGFyc2UoYXdhaXQgZnMucmVhZEZpbGUoYXBwaXVtQ29uZmlnUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZGVidWcoZXJyKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoanNvbm9iaiAmJiBqc29ub2JqLm5vZGVfYmluICYmIGF3YWl0IGZzLmV4aXN0cyhqc29ub2JqLm5vZGVfYmluKSApIHtcbiAgICAgIGxvZy5kZWJ1ZyhgTm9kZSBiaW5hcnkgZm91bmQgdXNpbmcgLmFwcGl1bWNvbmZpZy5qc29uIGF0OiAke2pzb25vYmoubm9kZV9iaW59YCk7XG4gICAgICByZXR1cm4ganNvbm9iai5ub2RlX2JpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKCdOb2RlIGJpbmFyeSBub3QgZm91bmQgaW4gdGhlIC5hcHBpdW1jb25maWcuanNvbiBmaWxlLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGRldGVjdCAoKSB7XG4gICAgbGV0IG5vZGVQYXRoID0gYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlVXNpbmdTeXN0ZW1DYWxsKCkgfHxcbiAgICAgIGF3YWl0IE5vZGVEZXRlY3Rvci5yZXRyaWV2ZUluQ29tbW9uUGxhY2VzKCkgfHxcbiAgICAgIGF3YWl0IE5vZGVEZXRlY3Rvci5yZXRyaWV2ZVVzaW5nQXBwbGVTY3JpcHQoKSB8fFxuICAgICAgYXdhaXQgTm9kZURldGVjdG9yLnJldHJpZXZlVXNpbmdBcHBpdW1Db25maWdGaWxlKCk7XG4gICAgaWYgKG5vZGVQYXRoKSB7XG4gICAgICByZXR1cm4gbm9kZVBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy53YXJuKCdUaGUgbm9kZSBiaW5hcnkgY291bGQgbm90IGJlIGZvdW5kLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVEZXRlY3RvcjtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
