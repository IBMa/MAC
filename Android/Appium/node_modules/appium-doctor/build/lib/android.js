'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _doctor = require('./doctor');

var _utils = require('./utils');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var checks = [];

var javaHome = _appiumSupport.system.isWindows() ? '%JAVA_HOME%' : '$JAVA_HOME';

checks.push(new _env2['default']('ANDROID_HOME'));
checks.push(new _env2['default']('JAVA_HOME'));

// Check that the PATH includes the jdk's bin directory

var JavaOnPathCheck = (function (_DoctorCheck) {
  _inherits(JavaOnPathCheck, _DoctorCheck);

  function JavaOnPathCheck() {
    _classCallCheck(this, JavaOnPathCheck);

    _get(Object.getPrototypeOf(JavaOnPathCheck.prototype), 'constructor', this).apply(this, arguments);
  }

  // Check tools

  _createClass(JavaOnPathCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var javaHomeBin;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!process.env.JAVA_HOME) {
              context$2$0.next = 4;
              break;
            }

            javaHomeBin = _path2['default'].resolve(process.env.JAVA_HOME, 'bin');

            if (!(process.env.PATH.indexOf(javaHomeBin) + 1)) {
              context$2$0.next = 4;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.ok)('Bin directory of ' + javaHome + ' is set'));

          case 4:
            return context$2$0.abrupt('return', (0, _utils.nok)('Bin directory for ' + javaHome + ' is not set'));

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return 'Add \'' + javaHome + _path2['default'].sep + 'bin\' to your PATH environment';
    }
  }]);

  return JavaOnPathCheck;
})(_doctor.DoctorCheck);

var AndroidToolCheck = (function (_DoctorCheck2) {
  _inherits(AndroidToolCheck, _DoctorCheck2);

  function AndroidToolCheck(toolName, toolPath) {
    _classCallCheck(this, AndroidToolCheck);

    _get(Object.getPrototypeOf(AndroidToolCheck.prototype), 'constructor', this).call(this);
    this.toolName = toolName;
    this.toolPath = toolPath;
  }

  _createClass(AndroidToolCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var fullPath;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(typeof process.env.ANDROID_HOME === 'undefined')) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)(this.toolName + ' could not be found because ANDROID_HOME is NOT set!'));

          case 2:
            fullPath = _path2['default'].resolve(process.env.ANDROID_HOME, this.toolPath);
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(fullPath));

          case 5:
            if (!context$2$0.sent) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.t0 = (0, _utils.ok)(this.toolName + ' exists at: ' + fullPath);
            context$2$0.next = 10;
            break;

          case 9:
            context$2$0.t0 = (0, _utils.nok)(this.toolName + ' could NOT be found at \'' + fullPath + '\'!');

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
      if (typeof process.env.ANDROID_HOME === 'undefined') {
        return 'Manually configure ANDROID_HOME and run appium-doctor again.';
      }
      return 'Manually install ' + this.toolName + ' and add it to PATH.';
    }
  }]);

  return AndroidToolCheck;
})(_doctor.DoctorCheck);

checks.push(new AndroidToolCheck('adb', _path2['default'].join("platform-tools", _appiumSupport.system.isWindows() ? 'adb.exe' : 'adb')));
checks.push(new AndroidToolCheck('android', _path2['default'].join("tools", _appiumSupport.system.isWindows() ? 'android.bat' : 'android')));
checks.push(new AndroidToolCheck('emulator', _path2['default'].join("tools", _appiumSupport.system.isWindows() ? 'emulator.exe' : 'emulator')));
checks.push(new JavaOnPathCheck());

exports.EnvVarAndPathCheck = _env2['default'];
exports.AndroidToolCheck = AndroidToolCheck;
exports.JavaOnPathCheck = JavaOnPathCheck;
exports['default'] = checks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hbmRyb2lkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFBNEIsVUFBVTs7cUJBQ2QsU0FBUzs7NkJBQ04sZ0JBQWdCOztvQkFDMUIsTUFBTTs7OzttQkFDUSxPQUFPOzs7O0FBR3RDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsSUFBSSxRQUFRLEdBQUcsc0JBQU8sU0FBUyxFQUFFLEdBQUcsYUFBYSxHQUFHLFlBQVksQ0FBQzs7QUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBdUIsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUF1QixXQUFXLENBQUMsQ0FBQyxDQUFDOzs7O0lBRzNDLGVBQWU7WUFBZixlQUFlOztXQUFmLGVBQWU7MEJBQWYsZUFBZTs7K0JBQWYsZUFBZTs7Ozs7ZUFBZixlQUFlOztXQUNKO1VBRVAsV0FBVzs7OztpQkFEYixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7Ozs7O0FBQ25CLHVCQUFXLEdBQUcsa0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzs7a0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7Ozs7O2dEQUNwQyxxQ0FBdUIsUUFBUSxhQUFVOzs7Z0RBRzdDLHVDQUF5QixRQUFRLGlCQUFjOzs7Ozs7O0tBQ3ZEOzs7V0FFRyxlQUFHO0FBQ0wsd0JBQWUsUUFBUSxHQUFHLGtCQUFLLEdBQUcsb0NBQWdDO0tBQ25FOzs7U0FiRyxlQUFlOzs7SUFpQmYsZ0JBQWdCO1lBQWhCLGdCQUFnQjs7QUFDUixXQURSLGdCQUFnQixDQUNQLFFBQVEsRUFBRSxRQUFRLEVBQUU7MEJBRDdCLGdCQUFnQjs7QUFFbEIsK0JBRkUsZ0JBQWdCLDZDQUVWO0FBQ1IsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7R0FDMUI7O2VBTEcsZ0JBQWdCOztXQU9MO1VBSVQsUUFBUTs7OztrQkFIUixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQTs7Ozs7Z0RBQzFDLGdCQUFPLElBQUksQ0FBQyxRQUFRLDBEQUF1RDs7O0FBRWhGLG9CQUFRLEdBQUcsa0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7OzZDQUN2RCxrQkFBRyxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs2QkFBRyxlQUFNLElBQUksQ0FBQyxRQUFRLG9CQUFlLFFBQVEsQ0FBRzs7Ozs7NkJBQzlFLGdCQUFPLElBQUksQ0FBQyxRQUFRLGlDQUE0QixRQUFRLFNBQU07Ozs7Ozs7Ozs7S0FDakU7OztXQUVHLGVBQUc7QUFDTCxVQUFJLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssV0FBVyxFQUFFO0FBQ25ELGVBQU8sOERBQThELENBQUM7T0FDdkU7QUFDRCxtQ0FBMkIsSUFBSSxDQUFDLFFBQVEsMEJBQXVCO0tBQ2hFOzs7U0FyQkcsZ0JBQWdCOzs7QUF1QnRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQ3BDLGtCQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBTyxTQUFTLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQ3hDLGtCQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsc0JBQU8sU0FBUyxFQUFFLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUN6QyxrQkFBSyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFPLFNBQVMsRUFBRSxHQUFHLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUM7O1FBRTFCLGtCQUFrQjtRQUFFLGdCQUFnQixHQUFoQixnQkFBZ0I7UUFBRSxlQUFlLEdBQWYsZUFBZTtxQkFDL0MsTUFBTSIsImZpbGUiOiJsaWIvYW5kcm9pZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3RvckNoZWNrIH0gZnJvbSAnLi9kb2N0b3InO1xuaW1wb3J0IHsgb2ssIG5vayB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZnMsIHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IEVudlZhckFuZFBhdGhDaGVjayBmcm9tICcuL2Vudic7XG5cblxubGV0IGNoZWNrcyA9IFtdO1xuXG5sZXQgamF2YUhvbWUgPSBzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnJUpBVkFfSE9NRSUnIDogJyRKQVZBX0hPTUUnO1xuXG5jaGVja3MucHVzaChuZXcgRW52VmFyQW5kUGF0aENoZWNrKCdBTkRST0lEX0hPTUUnKSk7XG5jaGVja3MucHVzaChuZXcgRW52VmFyQW5kUGF0aENoZWNrKCdKQVZBX0hPTUUnKSk7XG5cbi8vIENoZWNrIHRoYXQgdGhlIFBBVEggaW5jbHVkZXMgdGhlIGpkaydzIGJpbiBkaXJlY3RvcnlcbmNsYXNzIEphdmFPblBhdGhDaGVjayBleHRlbmRzIERvY3RvckNoZWNrIHtcbiAgYXN5bmMgZGlhZ25vc2UgKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5KQVZBX0hPTUUpIHtcbiAgICAgIGxldCBqYXZhSG9tZUJpbiA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmVudi5KQVZBX0hPTUUsICdiaW4nKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5QQVRILmluZGV4T2YoamF2YUhvbWVCaW4pICsgMSkge1xuICAgICAgICByZXR1cm4gb2soYEJpbiBkaXJlY3Rvcnkgb2YgJHtqYXZhSG9tZX0gaXMgc2V0YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2soYEJpbiBkaXJlY3RvcnkgZm9yICR7amF2YUhvbWV9IGlzIG5vdCBzZXRgKTtcbiAgfVxuXG4gIGZpeCAoKSB7XG4gICAgcmV0dXJuIGBBZGQgJyR7amF2YUhvbWV9JHtwYXRoLnNlcH1iaW4nIHRvIHlvdXIgUEFUSCBlbnZpcm9ubWVudGA7XG4gIH1cbn1cblxuLy8gQ2hlY2sgdG9vbHNcbmNsYXNzIEFuZHJvaWRUb29sQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGNvbnN0cnVjdG9yICh0b29sTmFtZSwgdG9vbFBhdGgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudG9vbE5hbWUgPSB0b29sTmFtZTtcbiAgICB0aGlzLnRvb2xQYXRoID0gdG9vbFBhdGg7XG4gIH1cblxuICBhc3luYyBkaWFnbm9zZSAoKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbm9rKGAke3RoaXMudG9vbE5hbWV9IGNvdWxkIG5vdCBiZSBmb3VuZCBiZWNhdXNlIEFORFJPSURfSE9NRSBpcyBOT1Qgc2V0IWApO1xuICAgIH1cbiAgICBsZXQgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FLCB0aGlzLnRvb2xQYXRoKTtcbiAgICByZXR1cm4gYXdhaXQgZnMuZXhpc3RzKGZ1bGxQYXRoKSA/IG9rKGAke3RoaXMudG9vbE5hbWV9IGV4aXN0cyBhdDogJHtmdWxsUGF0aH1gKSA6XG4gICAgICBub2soYCR7dGhpcy50b29sTmFtZX0gY291bGQgTk9UIGJlIGZvdW5kIGF0IFxcJyR7ZnVsbFBhdGh9XFwnIWApO1xuICB9XG5cbiAgZml4ICgpIHtcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnTWFudWFsbHkgY29uZmlndXJlIEFORFJPSURfSE9NRSBhbmQgcnVuIGFwcGl1bS1kb2N0b3IgYWdhaW4uJztcbiAgICB9XG4gICAgcmV0dXJuIGBNYW51YWxseSBpbnN0YWxsICR7dGhpcy50b29sTmFtZX0gYW5kIGFkZCBpdCB0byBQQVRILmA7XG4gIH1cbn1cbmNoZWNrcy5wdXNoKG5ldyBBbmRyb2lkVG9vbENoZWNrKCdhZGInLFxuICBwYXRoLmpvaW4oXCJwbGF0Zm9ybS10b29sc1wiLCBzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnYWRiLmV4ZScgOiAnYWRiJykpKTtcbmNoZWNrcy5wdXNoKG5ldyBBbmRyb2lkVG9vbENoZWNrKCdhbmRyb2lkJyxcbiAgcGF0aC5qb2luKFwidG9vbHNcIiwgc3lzdGVtLmlzV2luZG93cygpID8gJ2FuZHJvaWQuYmF0JyA6ICdhbmRyb2lkJykpKTtcbmNoZWNrcy5wdXNoKG5ldyBBbmRyb2lkVG9vbENoZWNrKCdlbXVsYXRvcicsXG4gIHBhdGguam9pbihcInRvb2xzXCIsIHN5c3RlbS5pc1dpbmRvd3MoKSA/ICdlbXVsYXRvci5leGUnIDogJ2VtdWxhdG9yJykpKTtcbmNoZWNrcy5wdXNoKG5ldyBKYXZhT25QYXRoQ2hlY2soKSk7XG5cbmV4cG9ydCB7IEVudlZhckFuZFBhdGhDaGVjaywgQW5kcm9pZFRvb2xDaGVjaywgSmF2YU9uUGF0aENoZWNrIH07XG5leHBvcnQgZGVmYXVsdCBjaGVja3M7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
