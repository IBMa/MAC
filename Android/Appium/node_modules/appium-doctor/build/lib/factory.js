'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _doctor = require('./doctor');

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

var _demo = require('./demo');

var _demo2 = _interopRequireDefault(_demo);

var checks = { generalChecks: _general2['default'], iosChecks: _ios2['default'], androidChecks: _android2['default'], devChecks: _dev2['default'], demoChecks: _demo2['default'] };

var newDoctor = function newDoctor(opts) {
  var doctor = new _doctor.Doctor();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_lodash2['default'].pairs(opts)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var k = _step$value[0];
      var v = _step$value[1];

      if (v) {
        doctor.register(checks[k + 'Checks'] || []);
      }
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

  return doctor;
};

exports['default'] = newDoctor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9mYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O3NCQUNDLFVBQVU7O3VCQUNQLFdBQVc7Ozs7bUJBQ2YsT0FBTzs7Ozt1QkFDSCxXQUFXOzs7O21CQUNmLE9BQU87Ozs7b0JBQ04sUUFBUTs7OztBQUcvQixJQUFJLE1BQU0sR0FBRyxFQUFDLGFBQWEsc0JBQUEsRUFBRSxTQUFTLGtCQUFBLEVBQUUsYUFBYSxzQkFBQSxFQUFFLFNBQVMsa0JBQUEsRUFBRSxVQUFVLG1CQUFBLEVBQUMsQ0FBQzs7QUFFOUUsSUFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLENBQUksSUFBSSxFQUFLO0FBQ3hCLE1BQUksTUFBTSxHQUFHLG9CQUFZLENBQUM7Ozs7OztBQUMxQixzQ0FBbUIsb0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyw0R0FBRTs7O1VBQXhCLENBQUM7VUFBRSxDQUFDOztBQUNaLFVBQUksQ0FBQyxFQUFFO0FBQ0wsY0FBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUksQ0FBQyxZQUFTLElBQUksRUFBRSxDQUFDLENBQUM7T0FDN0M7S0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sTUFBTSxDQUFDO0NBQ2YsQ0FBQzs7cUJBRWEsU0FBUyIsImZpbGUiOiJsaWIvZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBEb2N0b3IgfSBmcm9tICcuL2RvY3Rvcic7XG5pbXBvcnQgZ2VuZXJhbENoZWNrcyBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0IGlvc0NoZWNrcyBmcm9tICcuL2lvcyc7XG5pbXBvcnQgYW5kcm9pZENoZWNrcyBmcm9tICcuL2FuZHJvaWQnO1xuaW1wb3J0IGRldkNoZWNrcyBmcm9tICcuL2Rldic7XG5pbXBvcnQgZGVtb0NoZWNrcyBmcm9tICcuL2RlbW8nO1xuXG5cbmxldCBjaGVja3MgPSB7Z2VuZXJhbENoZWNrcywgaW9zQ2hlY2tzLCBhbmRyb2lkQ2hlY2tzLCBkZXZDaGVja3MsIGRlbW9DaGVja3N9O1xuXG5sZXQgbmV3RG9jdG9yID0gKG9wdHMpID0+IHtcbiAgbGV0IGRvY3RvciA9IG5ldyBEb2N0b3IoKTtcbiAgZm9yIChsZXQgW2ssIHZdIG9mIF8ucGFpcnMob3B0cykpIHtcbiAgICBpZiAodikge1xuICAgICAgZG9jdG9yLnJlZ2lzdGVyKGNoZWNrc1tgJHtrfUNoZWNrc2BdIHx8IFtdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRvY3Rvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5ld0RvY3RvcjtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
