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

var _teen_process = require('teen_process');

var _doctor = require('./doctor');

var _utils = require('./utils');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _os = require('os');

var checks = [];

// Check PATH binaries

var BinaryIsInPathCheck = (function (_DoctorCheck) {
  _inherits(BinaryIsInPathCheck, _DoctorCheck);

  function BinaryIsInPathCheck(binary) {
    _classCallCheck(this, BinaryIsInPathCheck);

    _get(Object.getPrototypeOf(BinaryIsInPathCheck.prototype), 'constructor', this).call(this);
    this.binary = binary;
  }

  _createClass(BinaryIsInPathCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var resolvedPath, executable, _ref, stdout;

      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            resolvedPath = undefined;
            context$2$0.prev = 1;
            executable = _appiumSupport.system.isWindows() ? 'where' : 'which';
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)(executable, [this.binary]));

          case 5:
            _ref = context$2$0.sent;
            stdout = _ref.stdout;

            if (!stdout.match(/not found/gi)) {
              context$2$0.next = 9;
              break;
            }

            throw new Error('Not Found');

          case 9:
            resolvedPath = _appiumSupport.system.isWindows() ? stdout.split(_os.EOL)[0] : stdout.replace(_os.EOL, '');
            context$2$0.next = 15;
            break;

          case 12:
            context$2$0.prev = 12;
            context$2$0.t0 = context$2$0['catch'](1);
            return context$2$0.abrupt('return', (0, _utils.nok)(this.binary + ' is MISSING in PATH!'));

          case 15:
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(resolvedPath));

          case 17:
            if (!context$2$0.sent) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.t1 = (0, _utils.ok)(this.binary + ' was found at ' + resolvedPath);
            context$2$0.next = 22;
            break;

          case 21:
            context$2$0.t1 = (0, _utils.nok)(this.binary + ' was found in PATH at \'' + resolvedPath + '\', but this is NOT a valid path!');

          case 22:
            return context$2$0.abrupt('return', context$2$0.t1);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 12]]);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return 'Manually install the ' + this.binary + ' binary and add it to PATH.';
    }
  }]);

  return BinaryIsInPathCheck;
})(_doctor.DoctorCheck);

checks.push(new BinaryIsInPathCheck(_appiumSupport.system.isWindows() ? 'mvn.bat' : 'mvn'));
checks.push(new BinaryIsInPathCheck(_appiumSupport.system.isWindows() ? 'ant.bat' : 'ant'));
checks.push(new BinaryIsInPathCheck(_appiumSupport.system.isWindows() ? 'adb.exe' : 'adb'));

// Check Android SDKs

var AndroidSdkExists = (function (_DoctorCheck2) {
  _inherits(AndroidSdkExists, _DoctorCheck2);

  function AndroidSdkExists(sdk) {
    _classCallCheck(this, AndroidSdkExists);

    _get(Object.getPrototypeOf(AndroidSdkExists.prototype), 'constructor', this).call(this);
    this.sdk = sdk;
  }

  _createClass(AndroidSdkExists, [{
    key: 'diagnose',
    value: function diagnose() {
      var sdkPath;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(typeof process.env.ANDROID_HOME === 'undefined')) {
              context$2$0.next = 2;
              break;
            }

            return context$2$0.abrupt('return', (0, _utils.nok)(this.sdk + ' could not be found because ANDROID_HOME is NOT set!'));

          case 2:
            sdkPath = _path2['default'].resolve(process.env.ANDROID_HOME, _path2['default'].join("platforms", this.sdk));
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(sdkPath));

          case 5:
            if (!context$2$0.sent) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.t0 = (0, _utils.ok)(this.sdk + ' was found at: ' + sdkPath);
            context$2$0.next = 10;
            break;

          case 9:
            context$2$0.t0 = (0, _utils.nok)(this.sdk + ' could NOT be found at \'' + sdkPath + '\'!');

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
      if (typeof process.env.ANDROID_HOME === "undefined") {
        return 'Manually configure ANDROID_HOME.';
      }
      return 'Manually install the ' + this.sdk + ' sdk.';
    }
  }]);

  return AndroidSdkExists;
})(_doctor.DoctorCheck);

checks.push(new AndroidSdkExists('android-16'));
checks.push(new AndroidSdkExists('android-19'));

exports.BinaryIsInPathCheck = BinaryIsInPathCheck;
exports.AndroidSdkExists = AndroidSdkExists;
exports['default'] = checks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUNMLFVBQUksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUU7QUFDbkQsZUFBTyxrQ0FBa0MsQ0FBQztPQUMzQztBQUNELHVDQUErQixJQUFJLENBQUMsR0FBRyxXQUFRO0tBQ2hEOzs7U0FwQkcsZ0JBQWdCOzs7QUF1QnRCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztRQUV2QyxtQkFBbUIsR0FBbkIsbUJBQW1CO1FBQUUsZ0JBQWdCLEdBQWhCLGdCQUFnQjtxQkFDL0IsTUFBTSIsImZpbGUiOiJsaWIvZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBEb2N0b3JDaGVjayB9IGZyb20gJy4vZG9jdG9yJztcbmltcG9ydCB7IG9rLCBub2sgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGZzLCBzeXN0ZW0gfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IEVPTCB9IGZyb20gJ29zJztcblxubGV0IGNoZWNrcyA9IFtdO1xuXG4vLyBDaGVjayBQQVRIIGJpbmFyaWVzXG5jbGFzcyBCaW5hcnlJc0luUGF0aENoZWNrIGV4dGVuZHMgRG9jdG9yQ2hlY2sge1xuICBjb25zdHJ1Y3RvciAoYmluYXJ5KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJpbmFyeSA9IGJpbmFyeTtcbiAgfVxuXG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBsZXQgcmVzb2x2ZWRQYXRoO1xuICAgIHRyeSB7XG4gICAgICBsZXQgZXhlY3V0YWJsZSA9IHN5c3RlbS5pc1dpbmRvd3MoKSA/ICd3aGVyZScgOiAnd2hpY2gnO1xuICAgICAgbGV0IHtzdGRvdXR9ID0gIGF3YWl0IGV4ZWMoZXhlY3V0YWJsZSwgW3RoaXMuYmluYXJ5XSk7XG4gICAgICBpZiAoc3Rkb3V0Lm1hdGNoKC9ub3QgZm91bmQvZ2kpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IEZvdW5kJyk7XG4gICAgICB9XG4gICAgICByZXNvbHZlZFBhdGggPSBzeXN0ZW0uaXNXaW5kb3dzKCkgPyBzdGRvdXQuc3BsaXQoRU9MKVswXSA6IHN0ZG91dC5yZXBsYWNlKEVPTCwgJycpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIG5vayhgJHt0aGlzLmJpbmFyeX0gaXMgTUlTU0lORyBpbiBQQVRIIWApO1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgZnMuZXhpc3RzKHJlc29sdmVkUGF0aCkgPyBvayhgJHt0aGlzLmJpbmFyeX0gd2FzIGZvdW5kIGF0ICR7cmVzb2x2ZWRQYXRofWApIDpcbiAgICAgIG5vayhgJHt0aGlzLmJpbmFyeX0gd2FzIGZvdW5kIGluIFBBVEggYXQgJyR7cmVzb2x2ZWRQYXRofScsIGJ1dCB0aGlzIGlzIE5PVCBhIHZhbGlkIHBhdGghYCk7XG4gIH1cblxuICBmaXggKCkge1xuICAgIHJldHVybiBgTWFudWFsbHkgaW5zdGFsbCB0aGUgJHt0aGlzLmJpbmFyeX0gYmluYXJ5IGFuZCBhZGQgaXQgdG8gUEFUSC5gO1xuICB9XG59XG5cbmNoZWNrcy5wdXNoKG5ldyBCaW5hcnlJc0luUGF0aENoZWNrKHN5c3RlbS5pc1dpbmRvd3MoKSA/ICdtdm4uYmF0JyA6ICdtdm4nKSk7XG5jaGVja3MucHVzaChuZXcgQmluYXJ5SXNJblBhdGhDaGVjayhzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnYW50LmJhdCcgOiAnYW50JykpO1xuY2hlY2tzLnB1c2gobmV3IEJpbmFyeUlzSW5QYXRoQ2hlY2soc3lzdGVtLmlzV2luZG93cygpID8gJ2FkYi5leGUnIDogJ2FkYicpKTtcblxuLy8gQ2hlY2sgQW5kcm9pZCBTREtzXG5jbGFzcyBBbmRyb2lkU2RrRXhpc3RzIGV4dGVuZHMgRG9jdG9yQ2hlY2sge1xuICBjb25zdHJ1Y3RvciAoc2RrKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNkayA9IHNkaztcbiAgfVxuXG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBub2soYCR7dGhpcy5zZGt9IGNvdWxkIG5vdCBiZSBmb3VuZCBiZWNhdXNlIEFORFJPSURfSE9NRSBpcyBOT1Qgc2V0IWApO1xuICAgIH1cbiAgICBsZXQgc2RrUGF0aCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUsIHBhdGguam9pbihcInBsYXRmb3Jtc1wiLCB0aGlzLnNkaykpO1xuICAgIHJldHVybiBhd2FpdCBmcy5leGlzdHMoc2RrUGF0aCkgPyBvayhgJHt0aGlzLnNka30gd2FzIGZvdW5kIGF0OiAke3Nka1BhdGh9YCkgOlxuICAgICAgbm9rKGAke3RoaXMuc2RrfSBjb3VsZCBOT1QgYmUgZm91bmQgYXQgXFwnJHtzZGtQYXRofVxcJyFgKTtcbiAgfVxuXG4gIGZpeCAoKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybiAnTWFudWFsbHkgY29uZmlndXJlIEFORFJPSURfSE9NRS4nO1xuICAgIH1cbiAgICByZXR1cm4gYE1hbnVhbGx5IGluc3RhbGwgdGhlICR7dGhpcy5zZGt9IHNkay5gO1xuICB9XG59XG5cbmNoZWNrcy5wdXNoKG5ldyBBbmRyb2lkU2RrRXhpc3RzKCdhbmRyb2lkLTE2JykpO1xuY2hlY2tzLnB1c2gobmV3IEFuZHJvaWRTZGtFeGlzdHMoJ2FuZHJvaWQtMTknKSk7XG5cbmV4cG9ydCB7IEJpbmFyeUlzSW5QYXRoQ2hlY2ssIEFuZHJvaWRTZGtFeGlzdHMgfTtcbmV4cG9ydCBkZWZhdWx0IGNoZWNrcztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
