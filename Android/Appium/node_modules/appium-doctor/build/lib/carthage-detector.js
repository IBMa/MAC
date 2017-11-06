'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var CarthageDetector = (function () {
  function CarthageDetector() {
    _classCallCheck(this, CarthageDetector);
  }

  _createClass(CarthageDetector, null, [{
    key: 'detect',
    value: function detect() {
      var stdout, carthagePath;
      return _regeneratorRuntime.async(function detect$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            stdout = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('which', ['carthage']));

          case 4:
            stdout = context$2$0.sent.stdout;
            carthagePath = stdout.replace("\n", "");
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(carthagePath));

          case 8:
            if (!context$2$0.sent) {
              context$2$0.next = 11;
              break;
            }

            _logger2['default'].debug('Carthage was found at: ' + carthagePath);
            return context$2$0.abrupt('return', carthagePath);

          case 11:
            context$2$0.next = 15;
            break;

          case 13:
            context$2$0.prev = 13;
            context$2$0.t0 = context$2$0['catch'](1);

          case 15:

            _logger2['default'].debug('Carthage was NOT found!');
            return context$2$0.abrupt('return', null);

          case 17:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 13]]);
    }
  }]);

  return CarthageDetector;
})();

exports['default'] = CarthageDetector;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jYXJ0aGFnZS1kZXRlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs2QkFBbUIsZ0JBQWdCOzs0QkFDZCxjQUFjOztzQkFDbkIsVUFBVTs7OztJQUVwQixnQkFBZ0I7V0FBaEIsZ0JBQWdCOzBCQUFoQixnQkFBZ0I7OztlQUFoQixnQkFBZ0I7O1dBQ0E7VUFDZCxNQUFNLEVBR0osWUFBWTs7OztBQUhkLGtCQUFNOzs7NkNBRVEsd0JBQUssT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQUEzQyxrQkFBTSxvQkFBdUMsTUFBTTtBQUMvQyx3QkFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQzs7NkNBQ2pDLGtCQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7O0FBQy9CLGdDQUFJLEtBQUssNkJBQTJCLFlBQVksQ0FBRyxDQUFDO2dEQUM3QyxZQUFZOzs7Ozs7Ozs7Ozs7QUFJdkIsZ0NBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0RBQzlCLElBQUk7Ozs7Ozs7S0FDWjs7O1NBZEcsZ0JBQWdCOzs7cUJBaUJQLGdCQUFnQiIsImZpbGUiOiJsaWIvY2FydGhhZ2UtZGV0ZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5cbmNsYXNzIENhcnRoYWdlRGV0ZWN0b3Ige1xuICBzdGF0aWMgYXN5bmMgZGV0ZWN0ICgpIHtcbiAgICBsZXQgc3Rkb3V0O1xuICAgIHRyeSB7XG4gICAgICBzdGRvdXQgPSAoYXdhaXQgZXhlYygnd2hpY2gnLCBbJ2NhcnRoYWdlJ10pKS5zdGRvdXQ7XG4gICAgICBsZXQgY2FydGhhZ2VQYXRoID0gc3Rkb3V0LnJlcGxhY2UoXCJcXG5cIiwgXCJcIik7XG4gICAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKGNhcnRoYWdlUGF0aCkpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBDYXJ0aGFnZSB3YXMgZm91bmQgYXQ6ICR7Y2FydGhhZ2VQYXRofWApO1xuICAgICAgICByZXR1cm4gY2FydGhhZ2VQYXRoO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGlnbikge31cblxuICAgIGxvZy5kZWJ1ZygnQ2FydGhhZ2Ugd2FzIE5PVCBmb3VuZCEnKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJ0aGFnZURldGVjdG9yO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
