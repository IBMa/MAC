// demo rule to test the gui

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

var _utils = require('./utils');

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var _doctor = require('./doctor');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _prompt = require('./prompt');

var checks = [];

var DirCheck = (function (_DoctorCheck) {
  _inherits(DirCheck, _DoctorCheck);

  function DirCheck(path) {
    _classCallCheck(this, DirCheck);

    _get(Object.getPrototypeOf(DirCheck.prototype), 'constructor', this).call(this, { autofix: false });
    this.path = path;
  }

  _createClass(DirCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var stats;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.path));

          case 2:
            if (context$2$0.sent) {
              context$2$0.next = 4;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)('Could NOT find directory at \'' + this.path + '\'!'));

          case 4:
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.lstat(this.path));

          case 6:
            stats = context$2$0.sent;
            return context$2$0.abrupt('return', stats.isDirectory() ? (0, _utils.ok)('Found directory at: ' + this.path) : (0, _utils.nok)('\'' + this.path + '\' is NOT a directory!'));

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', 'Manually create a directory at: ' + this.path);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return DirCheck;
})(_doctor.DoctorCheck);

checks.push(new DirCheck('/tmp/appium-doctor'));
checks.push(new DirCheck('/tmp/appium-doctor/demo'));

var FileCheck = (function (_DoctorCheck2) {
  _inherits(FileCheck, _DoctorCheck2);

  function FileCheck(path) {
    _classCallCheck(this, FileCheck);

    _get(Object.getPrototypeOf(FileCheck.prototype), 'constructor', this).call(this, { autofix: true });
    this.path = path;
  }

  _createClass(FileCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.path));

          case 2:
            if (!context$2$0.sent) {
              context$2$0.next = 6;
              break;
            }

            context$2$0.t0 = (0, _utils.ok)('Found file at: ' + this.path);
            context$2$0.next = 7;
            break;

          case 6:
            context$2$0.t0 = (0, _utils.nok)('Could NOT find file at \'' + this.path + '\'!');

          case 7:
            return context$2$0.abrupt('return', context$2$0.t0);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fix',
    value: function fix() {
      var yesno;
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('The following command need be executed: touch \'' + this.path + '\'');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((0, _prompt.fixIt)());

          case 3:
            yesno = context$2$0.sent;

            if (!(yesno === 'yes')) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('touch', [this.path]));

          case 7:
            context$2$0.next = 11;
            break;

          case 9:
            _logger2['default'].info('Skipping you will need to touch \'' + this.path + '\' manually.');
            throw new _doctor.FixSkippedError('bbb');

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return FileCheck;
})(_doctor.DoctorCheck);

checks.push(new FileCheck('/tmp/appium-doctor/demo/apple.fruit'));
checks.push(new FileCheck('/tmp/appium-doctor/demo/pear.fruit'));
checks.push(new FileCheck('/tmp/appium-doctor/demo/orange.fruit'));

exports.DirCheck = DirCheck;
exports.FileCheck = FileCheck;
exports['default'] = checks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUV3QixTQUFTOzs2QkFDZCxnQkFBZ0I7OzRCQUNkLGNBQWM7O3NCQUNVLFVBQVU7O3NCQUN2QyxVQUFVOzs7O3NCQUNKLFVBQVU7O0FBR2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7SUFFVixRQUFRO1lBQVIsUUFBUTs7QUFDQSxXQURSLFFBQVEsQ0FDQyxJQUFJLEVBQUU7MEJBRGYsUUFBUTs7QUFFViwrQkFGRSxRQUFRLDZDQUVKLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxFQUFFO0FBQ3hCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ2xCOztlQUpHLFFBQVE7O1dBTUc7VUFJVCxLQUFLOzs7Ozs2Q0FIRSxrQkFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Z0RBQ3RCLG1EQUFxQyxJQUFJLENBQUMsSUFBSSxTQUFNOzs7OzZDQUUzQyxrQkFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0FBQWpDLGlCQUFLO2dEQUNGLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FDeEIsd0NBQTBCLElBQUksQ0FBQyxJQUFJLENBQUcsR0FBRyx1QkFBUyxJQUFJLENBQUMsSUFBSSw0QkFBeUI7Ozs7Ozs7S0FDdkY7OztXQUVTOzs7O3FGQUNrQyxJQUFJLENBQUMsSUFBSTs7Ozs7OztLQUNwRDs7O1NBakJHLFFBQVE7OztBQW9CZCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzs7SUFFL0MsU0FBUztZQUFULFNBQVM7O0FBQ0QsV0FEUixTQUFTLENBQ0EsSUFBSSxFQUFFOzBCQURmLFNBQVM7O0FBRVgsK0JBRkUsU0FBUyw2Q0FFTCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsRUFBRTtBQUN2QixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztHQUNsQjs7ZUFKRyxTQUFTOztXQU1FOzs7Ozs2Q0FDQSxrQkFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7NkJBQy9CLG1DQUFxQixJQUFJLENBQUMsSUFBSSxDQUFHOzs7Ozs2QkFBRyw4Q0FBZ0MsSUFBSSxDQUFDLElBQUksU0FBTTs7Ozs7Ozs7OztLQUN0Rjs7O1dBRVM7VUFFSixLQUFLOzs7O0FBRFQsZ0NBQUksSUFBSSxzREFBbUQsSUFBSSxDQUFDLElBQUksUUFBSSxDQUFDOzs2Q0FDdkQsb0JBQU87OztBQUFyQixpQkFBSzs7a0JBQ0wsS0FBSyxLQUFLLEtBQUssQ0FBQTs7Ozs7OzZDQUNYLHdCQUFLLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztBQUVoQyxnQ0FBSSxJQUFJLHdDQUFxQyxJQUFJLENBQUMsSUFBSSxrQkFBYyxDQUFDO2tCQUMvRCw0QkFBb0IsS0FBSyxDQUFDOzs7Ozs7O0tBRW5DOzs7U0FwQkcsU0FBUzs7O0FBdUJmLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDOztRQUUxRCxRQUFRLEdBQVIsUUFBUTtRQUFFLFNBQVMsR0FBVCxTQUFTO3FCQUNiLE1BQU0iLCJmaWxlIjoibGliL2RlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkZW1vIHJ1bGUgdG8gdGVzdCB0aGUgZ3VpXG5cbmltcG9ydCB7IG9rLCBub2sgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBEb2N0b3JDaGVjaywgRml4U2tpcHBlZEVycm9yIH0gZnJvbSAnLi9kb2N0b3InO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBmaXhJdCB9IGZyb20gJy4vcHJvbXB0JztcblxuXG5sZXQgY2hlY2tzID0gW107XG5cbmNsYXNzIERpckNoZWNrIGV4dGVuZHMgRG9jdG9yQ2hlY2sge1xuICBjb25zdHJ1Y3RvciAocGF0aCkge1xuICAgIHN1cGVyKHthdXRvZml4OiBmYWxzZX0pO1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBhc3luYyBkaWFnbm9zZSAoKSB7XG4gICAgaWYgKCFhd2FpdCBmcy5leGlzdHModGhpcy5wYXRoKSkge1xuICAgICAgcmV0dXJuIG5vayhgQ291bGQgTk9UIGZpbmQgZGlyZWN0b3J5IGF0IFxcJyR7dGhpcy5wYXRofVxcJyFgKTtcbiAgICB9XG4gICAgbGV0IHN0YXRzID0gYXdhaXQgZnMubHN0YXQodGhpcy5wYXRoKTtcbiAgICByZXR1cm4gc3RhdHMuaXNEaXJlY3RvcnkoKSA/XG4gICAgICBvayhgRm91bmQgZGlyZWN0b3J5IGF0OiAke3RoaXMucGF0aH1gKSA6IG5vayhgXFwnJHt0aGlzLnBhdGh9XFwnIGlzIE5PVCBhIGRpcmVjdG9yeSFgKTtcbiAgfVxuXG4gIGFzeW5jIGZpeCAoKSB7XG4gICAgcmV0dXJuIGBNYW51YWxseSBjcmVhdGUgYSBkaXJlY3RvcnkgYXQ6ICR7dGhpcy5wYXRofWA7XG4gIH1cbn1cblxuY2hlY2tzLnB1c2gobmV3IERpckNoZWNrKCcvdG1wL2FwcGl1bS1kb2N0b3InKSk7XG5jaGVja3MucHVzaChuZXcgRGlyQ2hlY2soJy90bXAvYXBwaXVtLWRvY3Rvci9kZW1vJykpO1xuXG5jbGFzcyBGaWxlQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGNvbnN0cnVjdG9yIChwYXRoKSB7XG4gICAgc3VwZXIoe2F1dG9maXg6IHRydWV9KTtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG5cbiAgYXN5bmMgZGlhZ25vc2UgKCkge1xuICAgIHJldHVybiBhd2FpdCBmcy5leGlzdHModGhpcy5wYXRoKSA/XG4gICAgICBvayhgRm91bmQgZmlsZSBhdDogJHt0aGlzLnBhdGh9YCkgOiBub2soYENvdWxkIE5PVCBmaW5kIGZpbGUgYXQgXFwnJHt0aGlzLnBhdGh9XFwnIWApO1xuICB9XG5cbiAgYXN5bmMgZml4ICgpIHtcbiAgICBsb2cuaW5mbyhgVGhlIGZvbGxvd2luZyBjb21tYW5kIG5lZWQgYmUgZXhlY3V0ZWQ6IHRvdWNoICcke3RoaXMucGF0aH0nYCk7XG4gICAgbGV0IHllc25vID0gYXdhaXQgZml4SXQoKTtcbiAgICBpZiAoeWVzbm8gPT09ICd5ZXMnKSB7XG4gICAgICBhd2FpdCBleGVjKCd0b3VjaCcsIFt0aGlzLnBhdGhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmluZm8oYFNraXBwaW5nIHlvdSB3aWxsIG5lZWQgdG8gdG91Y2ggJyR7dGhpcy5wYXRofScgbWFudWFsbHkuYCk7XG4gICAgICB0aHJvdyBuZXcgRml4U2tpcHBlZEVycm9yKCdiYmInKTtcbiAgICB9XG4gIH1cbn1cblxuY2hlY2tzLnB1c2gobmV3IEZpbGVDaGVjaygnL3RtcC9hcHBpdW0tZG9jdG9yL2RlbW8vYXBwbGUuZnJ1aXQnKSk7XG5jaGVja3MucHVzaChuZXcgRmlsZUNoZWNrKCcvdG1wL2FwcGl1bS1kb2N0b3IvZGVtby9wZWFyLmZydWl0JykpO1xuY2hlY2tzLnB1c2gobmV3IEZpbGVDaGVjaygnL3RtcC9hcHBpdW0tZG9jdG9yL2RlbW8vb3JhbmdlLmZydWl0JykpO1xuXG5leHBvcnQgeyBEaXJDaGVjaywgRmlsZUNoZWNrIH07XG5leHBvcnQgZGVmYXVsdCBjaGVja3M7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
