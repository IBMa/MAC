'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Number$isNaN = require('babel-runtime/core-js/number/is-nan')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var _teen_process = require('teen_process');

var _doctor = require('./doctor');

var _nodeDetector = require('./node-detector');

var _nodeDetector2 = _interopRequireDefault(_nodeDetector);

var checks = [];

// Node Binary

var NodeBinaryCheck = (function (_DoctorCheck) {
  _inherits(NodeBinaryCheck, _DoctorCheck);

  function NodeBinaryCheck() {
    _classCallCheck(this, NodeBinaryCheck);

    _get(Object.getPrototypeOf(NodeBinaryCheck.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NodeBinaryCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var nodePath;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_nodeDetector2['default'].detect());

          case 2:
            nodePath = context$2$0.sent;
            return context$2$0.abrupt('return', nodePath ? (0, _utils.ok)('The Node.js binary was found at: ' + nodePath) : (0, _utils.nok)('The Node.js binary was NOT found!'));

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return 'Manually setup Node.js.';
    }
  }]);

  return NodeBinaryCheck;
})(_doctor.DoctorCheck);

checks.push(new NodeBinaryCheck());

// Node version

var NodeVersionCheck = (function (_DoctorCheck2) {
  _inherits(NodeVersionCheck, _DoctorCheck2);

  function NodeVersionCheck() {
    _classCallCheck(this, NodeVersionCheck);

    _get(Object.getPrototypeOf(NodeVersionCheck.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NodeVersionCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var nodePath, _ref, stdout, versionString, version;

      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_nodeDetector2['default'].detect());

          case 2:
            nodePath = context$2$0.sent;

            if (nodePath) {
              context$2$0.next = 5;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)('Node is not installed, so no version to check!'));

          case 5:
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)(nodePath, ['--version']));

          case 7:
            _ref = context$2$0.sent;
            stdout = _ref.stdout;
            versionString = stdout.replace('v', '').trim();
            version = parseInt(versionString, 10);

            if (!_Number$isNaN(version)) {
              context$2$0.next = 13;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)('Unable to find node version (version = \'' + versionString + '\')'));

          case 13:
            return context$2$0.abrupt('return', version >= 4 ? (0, _utils.ok)('Node version is ' + versionString) : (0, _utils.nok)('Node version should be at least 4!'));

          case 14:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return 'Manually upgrade Node.js.';
    }
  }]);

  return NodeVersionCheck;
})(_doctor.DoctorCheck);

checks.push(new NodeVersionCheck());

exports.NodeBinaryCheck = NodeBinaryCheck;
exports.NodeVersionCheck = NodeVersionCheck;
exports['default'] = checks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUF3QixTQUFTOzs0QkFDWixjQUFjOztzQkFDUCxVQUFVOzs0QkFDYixpQkFBaUI7Ozs7QUFHMUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7O0lBR1YsZUFBZTtZQUFmLGVBQWU7O1dBQWYsZUFBZTswQkFBZixlQUFlOzsrQkFBZixlQUFlOzs7ZUFBZixlQUFlOztXQUNKO1VBQ1QsUUFBUTs7Ozs7NkNBQVMsMEJBQWEsTUFBTSxFQUFFOzs7QUFBdEMsb0JBQVE7Z0RBQ0wsUUFBUSxHQUFHLHFEQUF1QyxRQUFRLENBQUcsR0FDbEUsZ0JBQUksbUNBQW1DLENBQUM7Ozs7Ozs7S0FDM0M7OztXQUVHLGVBQUc7QUFDTCx1Q0FBaUM7S0FDbEM7OztTQVRHLGVBQWU7OztBQVdyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQzs7OztJQUc3QixnQkFBZ0I7WUFBaEIsZ0JBQWdCOztXQUFoQixnQkFBZ0I7MEJBQWhCLGdCQUFnQjs7K0JBQWhCLGdCQUFnQjs7O2VBQWhCLGdCQUFnQjs7V0FDTDtVQUNULFFBQVEsUUFJUCxNQUFNLEVBQ1AsYUFBYSxFQUNiLE9BQU87Ozs7Ozs2Q0FOVSwwQkFBYSxNQUFNLEVBQUU7OztBQUF0QyxvQkFBUTs7Z0JBQ1AsUUFBUTs7Ozs7Z0RBQ0osZ0JBQUksZ0RBQWdELENBQUM7Ozs7NkNBRXpDLHdCQUFLLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7O0FBQTdDLGtCQUFNLFFBQU4sTUFBTTtBQUNQLHlCQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzlDLG1CQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7O2lCQUNyQyxjQUFhLE9BQU8sQ0FBQzs7Ozs7Z0RBQ2hCLDhEQUErQyxhQUFhLFNBQUs7OztnREFFbkUsT0FBTyxJQUFJLENBQUMsR0FBRyxvQ0FBc0IsYUFBYSxDQUFHLEdBQzFELGdCQUFJLG9DQUFvQyxDQUFDOzs7Ozs7O0tBQzVDOzs7V0FFRyxlQUFHO0FBQ0wseUNBQW1DO0tBQ3BDOzs7U0FsQkcsZ0JBQWdCOzs7QUFvQnRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7O1FBRTNCLGVBQWUsR0FBZixlQUFlO1FBQUUsZ0JBQWdCLEdBQWhCLGdCQUFnQjtxQkFDM0IsTUFBTSIsImZpbGUiOiJsaWIvZ2VuZXJhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9rLCBub2sgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgRG9jdG9yQ2hlY2sgfSBmcm9tICcuL2RvY3Rvcic7XG5pbXBvcnQgTm9kZURldGVjdG9yIGZyb20gJy4vbm9kZS1kZXRlY3Rvcic7XG5cblxubGV0IGNoZWNrcyA9IFtdO1xuXG4vLyBOb2RlIEJpbmFyeVxuY2xhc3MgTm9kZUJpbmFyeUNoZWNrIGV4dGVuZHMgRG9jdG9yQ2hlY2sge1xuICBhc3luYyBkaWFnbm9zZSAoKSB7XG4gICAgbGV0IG5vZGVQYXRoID0gYXdhaXQgTm9kZURldGVjdG9yLmRldGVjdCgpO1xuICAgIHJldHVybiBub2RlUGF0aCA/IG9rKGBUaGUgTm9kZS5qcyBiaW5hcnkgd2FzIGZvdW5kIGF0OiAke25vZGVQYXRofWApIDpcbiAgICAgIG5vaygnVGhlIE5vZGUuanMgYmluYXJ5IHdhcyBOT1QgZm91bmQhJyk7XG4gIH1cblxuICBmaXggKCkge1xuICAgIHJldHVybiBgTWFudWFsbHkgc2V0dXAgTm9kZS5qcy5gO1xuICB9XG59XG5jaGVja3MucHVzaChuZXcgTm9kZUJpbmFyeUNoZWNrKCkpO1xuXG4vLyBOb2RlIHZlcnNpb25cbmNsYXNzIE5vZGVWZXJzaW9uQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBsZXQgbm9kZVBhdGggPSBhd2FpdCBOb2RlRGV0ZWN0b3IuZGV0ZWN0KCk7XG4gICAgaWYgKCFub2RlUGF0aCkge1xuICAgICAgcmV0dXJuIG5vaygnTm9kZSBpcyBub3QgaW5zdGFsbGVkLCBzbyBubyB2ZXJzaW9uIHRvIGNoZWNrIScpO1xuICAgIH1cbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKG5vZGVQYXRoLCBbJy0tdmVyc2lvbiddKTtcbiAgICBsZXQgdmVyc2lvblN0cmluZyA9IHN0ZG91dC5yZXBsYWNlKCd2JywgJycpLnRyaW0oKTtcbiAgICBsZXQgdmVyc2lvbiA9IHBhcnNlSW50KHZlcnNpb25TdHJpbmcsIDEwKTtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHZlcnNpb24pKSB7XG4gICAgICByZXR1cm4gbm9rKGBVbmFibGUgdG8gZmluZCBub2RlIHZlcnNpb24gKHZlcnNpb24gPSAnJHt2ZXJzaW9uU3RyaW5nfScpYCk7XG4gICAgfVxuICAgIHJldHVybiB2ZXJzaW9uID49IDQgPyBvayhgTm9kZSB2ZXJzaW9uIGlzICR7dmVyc2lvblN0cmluZ31gKSA6XG4gICAgICBub2soJ05vZGUgdmVyc2lvbiBzaG91bGQgYmUgYXQgbGVhc3QgNCEnKTtcbiAgfVxuXG4gIGZpeCAoKSB7XG4gICAgcmV0dXJuIGBNYW51YWxseSB1cGdyYWRlIE5vZGUuanMuYDtcbiAgfVxufVxuY2hlY2tzLnB1c2gobmV3IE5vZGVWZXJzaW9uQ2hlY2soKSk7XG5cbmV4cG9ydCB7IE5vZGVCaW5hcnlDaGVjaywgTm9kZVZlcnNpb25DaGVjayB9O1xuZXhwb3J0IGRlZmF1bHQgY2hlY2tzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
