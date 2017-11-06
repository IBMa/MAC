'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('colors');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _packageJson = require('../../package.json');

// eslint-disable-line import/no-unresolved

var FixSkippedError = (function (_Error) {
  _inherits(FixSkippedError, _Error);

  function FixSkippedError() {
    _classCallCheck(this, FixSkippedError);

    _get(Object.getPrototypeOf(FixSkippedError.prototype), 'constructor', this).apply(this, arguments);
  }

  return FixSkippedError;
})(Error);

var DoctorCheck = (function () {
  function DoctorCheck() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DoctorCheck);

    this.autofix = !!opts.autofix;
  }

  _createClass(DoctorCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      throw new Error('Not Implemented!');
    }
  }, {
    key: 'fix',
    value: function fix() {
      // return string for manual fixes.
      throw new Error('Not Implemented!');
    }
  }]);

  return DoctorCheck;
})();

var Doctor = (function () {
  function Doctor() {
    _classCallCheck(this, Doctor);

    this.checks = [];
    this.toFix = [];
  }

  _createClass(Doctor, [{
    key: 'register',
    value: function register(checks) {
      checks = Array.isArray(checks) ? checks : [checks];
      this.checks = this.checks.concat(checks);
    }
  }, {
    key: 'diagnose',
    value: function diagnose() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, check, res, errorMessage, fixMessage;

      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('### Diagnostic starting ###');
            this.toFix = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 5;
            _iterator = _getIterator(this.checks);

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 16;
              break;
            }

            check = _step.value;
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 11:
            res = context$2$0.sent;

            if (res.ok) {
              _logger2['default'].info(' ' + '✔'.green + ' ' + res.message);
            } else {
              errorMessage = ' ' + '✖'.red + ' ' + res.message;

              _logger2['default'].warn(errorMessage);
              this.toFix.push({
                error: errorMessage,
                check: check
              });
            }

          case 13:
            _iteratorNormalCompletion = true;
            context$2$0.next = 7;
            break;

          case 16:
            context$2$0.next = 22;
            break;

          case 18:
            context$2$0.prev = 18;
            context$2$0.t0 = context$2$0['catch'](5);
            _didIteratorError = true;
            _iteratorError = context$2$0.t0;

          case 22:
            context$2$0.prev = 22;
            context$2$0.prev = 23;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 25:
            context$2$0.prev = 25;

            if (!_didIteratorError) {
              context$2$0.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return context$2$0.finish(25);

          case 29:
            return context$2$0.finish(22);

          case 30:
            fixMessage = undefined;
            context$2$0.t1 = this.toFix.length;
            context$2$0.next = context$2$0.t1 === 0 ? 34 : context$2$0.t1 === 1 ? 36 : 38;
            break;

          case 34:
            fixMessage = 'no fix needed';
            return context$2$0.abrupt('break', 39);

          case 36:
            fixMessage = 'one fix needed';
            return context$2$0.abrupt('break', 39);

          case 38:
            fixMessage = this.toFix.length + ' fixes needed';

          case 39:
            _logger2['default'].info('### Diagnostic completed, ' + fixMessage + '. ###');
            _logger2['default'].info('');

          case 41:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[5, 18, 22, 30], [23,, 25, 29]]);
    }
  }, {
    key: 'reportSuccess',
    value: function reportSuccess() {
      return _regeneratorRuntime.async(function reportSuccess$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(this.toFix.length === 0)) {
              context$2$0.next = 6;
              break;
            }

            _logger2['default'].info('Everything looks good, bye!');
            _logger2['default'].info('');
            return context$2$0.abrupt('return', true);

          case 6:
            return context$2$0.abrupt('return', false);

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'reportManualFixes',
    value: function reportManualFixes() {
      var manualFixes, fixMessages, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, f, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, m;

      return _regeneratorRuntime.async(function reportManualFixes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            manualFixes = _lodash2['default'].filter(this.toFix, function (f) {
              return !f.check.autofix;
            });

            if (!(manualFixes.length > 0)) {
              context$2$0.next = 60;
              break;
            }

            _logger2['default'].info('### Manual Fixes Needed ###');
            _logger2['default'].info('The configuration cannot be automatically fixed, please do the following first:');
            // for manual fixes, the fix method always return a string
            fixMessages = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 8;
            _iterator2 = _getIterator(manualFixes);

          case 10:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 20;
              break;
            }

            f = _step2.value;
            context$2$0.t0 = fixMessages;
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(f.check.fix());

          case 15:
            context$2$0.t1 = context$2$0.sent;
            context$2$0.t0.push.call(context$2$0.t0, context$2$0.t1);

          case 17:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 10;
            break;

          case 20:
            context$2$0.next = 26;
            break;

          case 22:
            context$2$0.prev = 22;
            context$2$0.t2 = context$2$0['catch'](8);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t2;

          case 26:
            context$2$0.prev = 26;
            context$2$0.prev = 27;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 29:
            context$2$0.prev = 29;

            if (!_didIteratorError2) {
              context$2$0.next = 32;
              break;
            }

            throw _iteratorError2;

          case 32:
            return context$2$0.finish(29);

          case 33:
            return context$2$0.finish(26);

          case 34:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 37;

            for (_iterator3 = _getIterator(_lodash2['default'].uniq(fixMessages)); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              m = _step3.value;

              _logger2['default'].warn('- ' + m);
            }
            context$2$0.next = 45;
            break;

          case 41:
            context$2$0.prev = 41;
            context$2$0.t3 = context$2$0['catch'](37);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t3;

          case 45:
            context$2$0.prev = 45;
            context$2$0.prev = 46;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 48:
            context$2$0.prev = 48;

            if (!_didIteratorError3) {
              context$2$0.next = 51;
              break;
            }

            throw _iteratorError3;

          case 51:
            return context$2$0.finish(48);

          case 52:
            return context$2$0.finish(45);

          case 53:
            _logger2['default'].info('###');
            _logger2['default'].info('');
            _logger2['default'].info('Bye! Run appium-doctor again when all manual fixes have been applied!');
            _logger2['default'].info('');
            return context$2$0.abrupt('return', true);

          case 60:
            return context$2$0.abrupt('return', false);

          case 61:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[8, 22, 26, 34], [27,, 29, 33], [37, 41, 45, 53], [46,, 48, 52]]);
    }
  }, {
    key: 'runAutoFix',
    value: function runAutoFix(f) {
      var res;
      return _regeneratorRuntime.async(function runAutoFix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('### Fixing: ' + f.error + ' ###');
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(f.check.fix());

          case 4:
            context$2$0.next = 16;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](1);

            if (!(context$2$0.t0 instanceof FixSkippedError)) {
              context$2$0.next = 13;
              break;
            }

            _logger2['default'].info('### Skipped fix ###');
            return context$2$0.abrupt('return');

          case 13:
            _logger2['default'].warn(('' + context$2$0.t0).replace(/\n$/g, ''));
            _logger2['default'].info('### Fix did not succeed ###');
            return context$2$0.abrupt('return');

          case 16:
            _logger2['default'].info('Checking if this was fixed:');
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(f.check.diagnose());

          case 19:
            res = context$2$0.sent;

            if (res.ok) {
              f.fixed = true;
              _logger2['default'].info(' ' + '✔'.green + ' ' + res.message);
              _logger2['default'].info('### Fix was successfully applied ###');
            } else {
              _logger2['default'].info(' ' + '✖'.red + ' ' + res.message);
              _logger2['default'].info('### Fix was applied but issue remains ###');
            }

          case 21:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 6]]);
    }
  }, {
    key: 'runAutoFixes',
    value: function runAutoFixes() {
      var autoFixes, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, f;

      return _regeneratorRuntime.async(function runAutoFixes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            autoFixes = _lodash2['default'].filter(this.toFix, function (f) {
              return f.check.autofix;
            });
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            context$2$0.prev = 4;
            _iterator4 = _getIterator(autoFixes);

          case 6:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              context$2$0.next = 14;
              break;
            }

            f = _step4.value;
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.runAutoFix(f));

          case 10:
            _logger2['default'].info('');

          case 11:
            _iteratorNormalCompletion4 = true;
            context$2$0.next = 6;
            break;

          case 14:
            context$2$0.next = 20;
            break;

          case 16:
            context$2$0.prev = 16;
            context$2$0.t0 = context$2$0['catch'](4);
            _didIteratorError4 = true;
            _iteratorError4 = context$2$0.t0;

          case 20:
            context$2$0.prev = 20;
            context$2$0.prev = 21;

            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }

          case 23:
            context$2$0.prev = 23;

            if (!_didIteratorError4) {
              context$2$0.next = 26;
              break;
            }

            throw _iteratorError4;

          case 26:
            return context$2$0.finish(23);

          case 27:
            return context$2$0.finish(20);

          case 28:
            if (_lodash2['default'].find(autoFixes, function (f) {
              return !f.fixed;
            })) {
              // a few issues remain.
              _logger2['default'].info('Bye! A few issues remain, fix manually and/or rerun appium-doctor!');
            } else {
              // nothing left to fix.
              _logger2['default'].info('Bye! All issues have been fixed!');
            }
            _logger2['default'].info('');

          case 30:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[4, 16, 20, 28], [21,, 23, 27]]);
    }
  }, {
    key: 'run',
    value: function run() {
      return _regeneratorRuntime.async(function run$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('Appium Doctor v.' + _packageJson.version);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.diagnose());

          case 3:
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.reportSuccess());

          case 5:
            if (!context$2$0.sent) {
              context$2$0.next = 7;
              break;
            }

            return context$2$0.abrupt('return');

          case 7:
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(this.reportManualFixes());

          case 9:
            if (!context$2$0.sent) {
              context$2$0.next = 11;
              break;
            }

            return context$2$0.abrupt('return');

          case 11:
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.runAutoFixes());

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Doctor;
})();

exports.Doctor = Doctor;
exports.DoctorCheck = DoctorCheck;
exports.FixSkippedError = FixSkippedError;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQUUsQ0FBQyxFQUFFOztBQUVsRCxrQ0FBSSxJQUFJLENBQUMsb0VBQW9FLENBQUMsQ0FBQzthQUNoRixNQUFNOztBQUVMLGtDQUFJLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2FBQzlDO0FBQ0QsZ0NBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2Q7OztXQUVTOzs7O0FBQ1IsZ0NBQUksSUFBSSwyQ0FBOEIsQ0FBQzs7NkNBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7NkNBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRTs7Ozs7Ozs7Ozs7OzZDQUdwQixJQUFJLENBQUMsaUJBQWlCLEVBQUU7Ozs7Ozs7Ozs7Ozs2Q0FHNUIsSUFBSSxDQUFDLFlBQVksRUFBRTs7Ozs7OztLQUMxQjs7O1NBL0hHLE1BQU07OztRQWtJSCxNQUFNLEdBQU4sTUFBTTtRQUFFLFdBQVcsR0FBWCxXQUFXO1FBQUUsZUFBZSxHQUFmLGVBQWUiLCJmaWxlIjoibGliL2RvY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnY29sb3JzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby11bnJlc29sdmVkXG5cblxuY2xhc3MgRml4U2tpcHBlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuXG5jbGFzcyBEb2N0b3JDaGVjayB7XG4gIGNvbnN0cnVjdG9yIChvcHRzPXt9KSB7XG4gICAgdGhpcy5hdXRvZml4ID0gISFvcHRzLmF1dG9maXg7XG4gIH1cblxuICBkaWFnbm9zZSAoKSB7IHRocm93IG5ldyBFcnJvcignTm90IEltcGxlbWVudGVkIScpOyB9XG5cbiAgZml4ICgpIHtcbiAgICAvLyByZXR1cm4gc3RyaW5nIGZvciBtYW51YWwgZml4ZXMuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgSW1wbGVtZW50ZWQhJyk7XG4gIH1cbn1cblxuY2xhc3MgRG9jdG9yIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuY2hlY2tzID0gW107XG4gICAgdGhpcy50b0ZpeCA9IFtdO1xuICB9XG5cbiAgcmVnaXN0ZXIgKGNoZWNrcykge1xuICAgIGNoZWNrcyA9IEFycmF5LmlzQXJyYXkoY2hlY2tzKSA/IGNoZWNrcyA6IFtjaGVja3NdO1xuICAgIHRoaXMuY2hlY2tzID0gdGhpcy5jaGVja3MuY29uY2F0KGNoZWNrcyk7XG4gIH1cblxuICBhc3luYyBkaWFnbm9zZSAoKSB7XG4gICAgbG9nLmluZm8oJyMjIyBEaWFnbm9zdGljIHN0YXJ0aW5nICMjIycpO1xuICAgIHRoaXMudG9GaXggPSBbXTtcbiAgICBmb3IgKGxldCBjaGVjayBvZiB0aGlzLmNoZWNrcykge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGNoZWNrLmRpYWdub3NlKCk7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIGxvZy5pbmZvKGAgJHsnXFx1MjcxNCcuZ3JlZW59ICR7cmVzLm1lc3NhZ2V9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZXJyb3JNZXNzYWdlID0gYCAkeydcXHUyNzE2Jy5yZWR9ICR7cmVzLm1lc3NhZ2V9YDtcbiAgICAgICAgbG9nLndhcm4oZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgdGhpcy50b0ZpeC5wdXNoKHtcbiAgICAgICAgICBlcnJvcjogZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIGNoZWNrXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgZml4TWVzc2FnZTtcbiAgICBzd2l0Y2ggKHRoaXMudG9GaXgubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGZpeE1lc3NhZ2UgPSAnbm8gZml4IG5lZWRlZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBmaXhNZXNzYWdlID0gJ29uZSBmaXggbmVlZGVkJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmaXhNZXNzYWdlID0gYCR7dGhpcy50b0ZpeC5sZW5ndGh9IGZpeGVzIG5lZWRlZGA7XG4gICAgfVxuICAgIGxvZy5pbmZvKGAjIyMgRGlhZ25vc3RpYyBjb21wbGV0ZWQsICR7Zml4TWVzc2FnZX0uICMjI2ApO1xuICAgIGxvZy5pbmZvKCcnKTtcbiAgfVxuXG4gIGFzeW5jIHJlcG9ydFN1Y2Nlc3MgKCkge1xuICAgIGlmICh0aGlzLnRvRml4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbG9nLmluZm8oJ0V2ZXJ5dGhpbmcgbG9va3MgZ29vZCwgYnllIScpO1xuICAgICAgbG9nLmluZm8oJycpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXBvcnRNYW51YWxGaXhlcyAoKSB7XG4gICAgbGV0IG1hbnVhbEZpeGVzID0gXy5maWx0ZXIodGhpcy50b0ZpeCwgKGYpID0+IHtyZXR1cm4gIWYuY2hlY2suYXV0b2ZpeDt9KTtcbiAgICBpZiAobWFudWFsRml4ZXMubGVuZ3RoID4wKSB7XG4gICAgICBsb2cuaW5mbygnIyMjIE1hbnVhbCBGaXhlcyBOZWVkZWQgIyMjJyk7XG4gICAgICBsb2cuaW5mbygnVGhlIGNvbmZpZ3VyYXRpb24gY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgZml4ZWQsIHBsZWFzZSBkbyB0aGUgZm9sbG93aW5nIGZpcnN0OicpO1xuICAgICAgLy8gZm9yIG1hbnVhbCBmaXhlcywgdGhlIGZpeCBtZXRob2QgYWx3YXlzIHJldHVybiBhIHN0cmluZ1xuICAgICAgbGV0IGZpeE1lc3NhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBmIG9mIG1hbnVhbEZpeGVzKSB7XG4gICAgICAgIGZpeE1lc3NhZ2VzLnB1c2goYXdhaXQgZi5jaGVjay5maXgoKSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBtIG9mIF8udW5pcShmaXhNZXNzYWdlcykpIHtcbiAgICAgICAgbG9nLndhcm4oYC0gJHttfWApO1xuICAgICAgfVxuICAgICAgbG9nLmluZm8oJyMjIycpO1xuICAgICAgbG9nLmluZm8oJycpO1xuICAgICAgbG9nLmluZm8oJ0J5ZSEgUnVuIGFwcGl1bS1kb2N0b3IgYWdhaW4gd2hlbiBhbGwgbWFudWFsIGZpeGVzIGhhdmUgYmVlbiBhcHBsaWVkIScpO1xuICAgICAgbG9nLmluZm8oJycpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBydW5BdXRvRml4IChmKSB7XG4gICAgbG9nLmluZm8oYCMjIyBGaXhpbmc6ICR7Zi5lcnJvcn0gIyMjYCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGYuY2hlY2suZml4KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRml4U2tpcHBlZEVycm9yKSB7XG4gICAgICAgIGxvZy5pbmZvKGAjIyMgU2tpcHBlZCBmaXggIyMjYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy53YXJuKGAke2Vycn1gLnJlcGxhY2UoL1xcbiQvZywgJycpKTtcbiAgICAgICAgbG9nLmluZm8oYCMjIyBGaXggZGlkIG5vdCBzdWNjZWVkICMjI2ApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5pbmZvKCdDaGVja2luZyBpZiB0aGlzIHdhcyBmaXhlZDonKTtcbiAgICBsZXQgcmVzID0gYXdhaXQgZi5jaGVjay5kaWFnbm9zZSgpO1xuICAgIGlmIChyZXMub2spIHtcbiAgICAgIGYuZml4ZWQgPSB0cnVlO1xuICAgICAgbG9nLmluZm8oYCAkeydcXHUyNzE0Jy5ncmVlbn0gJHtyZXMubWVzc2FnZX1gKTtcbiAgICAgIGxvZy5pbmZvKGAjIyMgRml4IHdhcyBzdWNjZXNzZnVsbHkgYXBwbGllZCAjIyNgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmluZm8oYCAkeydcXHUyNzE2Jy5yZWR9ICR7cmVzLm1lc3NhZ2V9YCk7XG4gICAgICBsb2cuaW5mbyhgIyMjIEZpeCB3YXMgYXBwbGllZCBidXQgaXNzdWUgcmVtYWlucyAjIyNgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBydW5BdXRvRml4ZXMgKCkge1xuICAgIGxldCBhdXRvRml4ZXMgPSBfLmZpbHRlcih0aGlzLnRvRml4LCAoZikgPT4ge3JldHVybiBmLmNoZWNrLmF1dG9maXg7fSk7XG4gICAgZm9yIChsZXQgZiBvZiBhdXRvRml4ZXMpIHtcbiAgICAgIGF3YWl0IHRoaXMucnVuQXV0b0ZpeChmKTtcbiAgICAgIGxvZy5pbmZvKCcnKTtcbiAgICB9XG4gICAgaWYgKF8uZmluZChhdXRvRml4ZXMsIChmKSA9PiB7IHJldHVybiAhZi5maXhlZDsgfSkpIHtcbiAgICAgIC8vIGEgZmV3IGlzc3VlcyByZW1haW4uXG4gICAgICBsb2cuaW5mbygnQnllISBBIGZldyBpc3N1ZXMgcmVtYWluLCBmaXggbWFudWFsbHkgYW5kL29yIHJlcnVuIGFwcGl1bS1kb2N0b3IhJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vdGhpbmcgbGVmdCB0byBmaXguXG4gICAgICBsb2cuaW5mbygnQnllISBBbGwgaXNzdWVzIGhhdmUgYmVlbiBmaXhlZCEnKTtcbiAgICB9XG4gICAgbG9nLmluZm8oJycpO1xuICB9XG5cbiAgYXN5bmMgcnVuICgpIHtcbiAgICBsb2cuaW5mbyhgQXBwaXVtIERvY3RvciB2LiR7dmVyc2lvbn1gKTtcbiAgICBhd2FpdCB0aGlzLmRpYWdub3NlKCk7XG4gICAgaWYgKGF3YWl0IHRoaXMucmVwb3J0U3VjY2VzcygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhd2FpdCB0aGlzLnJlcG9ydE1hbnVhbEZpeGVzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgdGhpcy5ydW5BdXRvRml4ZXMoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBEb2N0b3IsIERvY3RvckNoZWNrLCBGaXhTa2lwcGVkRXJyb3IgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
