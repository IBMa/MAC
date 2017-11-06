'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumSupport = require('appium-support');

var _doctor = require('./doctor');

var _utils = require('./utils');

// Check env variables

var EnvVarAndPathCheck = (function (_DoctorCheck) {
  _inherits(EnvVarAndPathCheck, _DoctorCheck);

  function EnvVarAndPathCheck(varName) {
    _classCallCheck(this, EnvVarAndPathCheck);

    _get(Object.getPrototypeOf(EnvVarAndPathCheck.prototype), 'constructor', this).call(this);
    this.varName = varName;
  }

  _createClass(EnvVarAndPathCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var varValue;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            varValue = process.env[this.varName];

            if (!(typeof varValue === 'undefined')) {
              context$2$0.next = 3;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)(this.varName + ' is NOT set!'));

          case 3:
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(varValue));

          case 5:
            if (!context$2$0.sent) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.t0 = (0, _utils.ok)(this.varName + ' is set to: ' + varValue);
            context$2$0.next = 10;
            break;

          case 9:
            context$2$0.t0 = (0, _utils.nok)(this.varName + ' is set to \'' + varValue + '\' but this is NOT a valid path!');

          case 10:
            return context$2$0.abrupt('return', context$2$0.t0);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return 'Manually configure ' + this.varName + '.';
    }
  }]);

  return EnvVarAndPathCheck;
})(_doctor.DoctorCheck);

exports['default'] = EnvVarAndPathCheck;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9lbnYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFBbUIsZ0JBQWdCOztzQkFDUCxVQUFVOztxQkFDZCxTQUFTOzs7O0lBSTNCLGtCQUFrQjtZQUFsQixrQkFBa0I7O0FBQ1YsV0FEUixrQkFBa0IsQ0FDVCxPQUFPLEVBQUU7MEJBRGxCLGtCQUFrQjs7QUFFcEIsK0JBRkUsa0JBQWtCLDZDQUVaO0FBQ1IsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7R0FDeEI7O2VBSkcsa0JBQWtCOztXQU1QO1VBQ1QsUUFBUTs7OztBQUFSLG9CQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOztrQkFDcEMsT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFBOzs7OztnREFDMUIsZ0JBQU8sSUFBSSxDQUFDLE9BQU8sa0JBQWU7Ozs7NkNBRTlCLGtCQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7OzZCQUFHLGVBQU0sSUFBSSxDQUFDLE9BQU8sb0JBQWUsUUFBUSxDQUFHOzs7Ozs2QkFDNUUsZ0JBQU8sSUFBSSxDQUFDLE9BQU8scUJBQWdCLFFBQVEsc0NBQW1DOzs7Ozs7Ozs7O0tBQ2xGOzs7V0FFRyxlQUFHO0FBQ0wscUNBQTZCLElBQUksQ0FBQyxPQUFPLE9BQUk7S0FDOUM7OztTQWpCRyxrQkFBa0I7OztxQkFxQlQsa0JBQWtCIiwiZmlsZSI6ImxpYi9lbnYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IERvY3RvckNoZWNrIH0gZnJvbSAnLi9kb2N0b3InO1xuaW1wb3J0IHsgb2ssIG5vayB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbi8vIENoZWNrIGVudiB2YXJpYWJsZXNcbmNsYXNzIEVudlZhckFuZFBhdGhDaGVjayBleHRlbmRzIERvY3RvckNoZWNrIHtcbiAgY29uc3RydWN0b3IgKHZhck5hbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmFyTmFtZSA9IHZhck5hbWU7XG4gIH1cblxuICBhc3luYyBkaWFnbm9zZSAoKSB7XG4gICAgbGV0IHZhclZhbHVlID0gcHJvY2Vzcy5lbnZbdGhpcy52YXJOYW1lXTtcbiAgICBpZiAodHlwZW9mIHZhclZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5vayhgJHt0aGlzLnZhck5hbWV9IGlzIE5PVCBzZXQhYCk7XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCBmcy5leGlzdHModmFyVmFsdWUpID8gb2soYCR7dGhpcy52YXJOYW1lfSBpcyBzZXQgdG86ICR7dmFyVmFsdWV9YCkgOlxuICAgICAgIG5vayhgJHt0aGlzLnZhck5hbWV9IGlzIHNldCB0byBcXCcke3ZhclZhbHVlfVxcJyBidXQgdGhpcyBpcyBOT1QgYSB2YWxpZCBwYXRoIWApO1xuICB9XG5cbiAgZml4ICgpIHtcbiAgICByZXR1cm4gYE1hbnVhbGx5IGNvbmZpZ3VyZSAke3RoaXMudmFyTmFtZX0uYDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEVudlZhckFuZFBhdGhDaGVjaztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
