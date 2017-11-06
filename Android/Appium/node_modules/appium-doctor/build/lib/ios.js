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

var _carthageDetector = require('./carthage-detector');

var _carthageDetector2 = _interopRequireDefault(_carthageDetector);

var _prompt = require('./prompt');

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var checks = [];
var fixes = {};

// Check for Xcode.

var XcodeCheck = (function (_DoctorCheck) {
  _inherits(XcodeCheck, _DoctorCheck);

  function XcodeCheck() {
    _classCallCheck(this, XcodeCheck);

    _get(Object.getPrototypeOf(XcodeCheck.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(XcodeCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var xcodePath, _ref, stdout;

      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            xcodePath = undefined;
            context$2$0.prev = 1;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('xcode-select', ['--print-path']));

          case 4:
            _ref = context$2$0.sent;
            stdout = _ref.stdout;

            xcodePath = (stdout || '').replace("\n", "");
            context$2$0.next = 12;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](1);
            return context$2$0.abrupt('return', (0, _utils.nok)('Xcode is NOT installed!'));

          case 12:
            context$2$0.t1 = xcodePath;

            if (!context$2$0.t1) {
              context$2$0.next = 17;
              break;
            }

            context$2$0.next = 16;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(xcodePath));

          case 16:
            context$2$0.t1 = context$2$0.sent;

          case 17:
            if (!context$2$0.t1) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.t2 = (0, _utils.ok)('Xcode is installed at: ' + xcodePath);
            context$2$0.next = 22;
            break;

          case 21:
            context$2$0.t2 = (0, _utils.nok)('Xcode cannot be found at \'' + xcodePath + '\'!');

          case 22:
            return context$2$0.abrupt('return', context$2$0.t2);

          case 23:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 9]]);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', 'Manually install Xcode.');

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return XcodeCheck;
})(_doctor.DoctorCheck);

checks.push(new XcodeCheck());

// Check for Xcode Command Line Tools.

var XcodeCmdLineToolsCheck = (function (_DoctorCheck2) {
  _inherits(XcodeCmdLineToolsCheck, _DoctorCheck2);

  function XcodeCmdLineToolsCheck() {
    _classCallCheck(this, XcodeCmdLineToolsCheck);

    _get(Object.getPrototypeOf(XcodeCmdLineToolsCheck.prototype), 'constructor', this).call(this, { autofix: true });
  }

  _createClass(XcodeCmdLineToolsCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var errMess, pkgName, stdout;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            errMess = 'Xcode Command Line Tools are NOT installed!';
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.system.macOsxVersion());

          case 3:
            context$2$0.t0 = context$2$0.sent;

            if (!(context$2$0.t0 === '10.8')) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.t1 = 'com.apple.pkg.DeveloperToolsCLI';
            context$2$0.next = 9;
            break;

          case 8:
            context$2$0.t1 = 'com.apple.pkg.CLTools_Executables';

          case 9:
            pkgName = context$2$0.t1;
            stdout = undefined;
            context$2$0.prev = 11;
            context$2$0.next = 14;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('pkgutil', ['--pkg-info=' + pkgName]));

          case 14:
            stdout = context$2$0.sent.stdout;
            context$2$0.next = 21;
            break;

          case 17:
            context$2$0.prev = 17;
            context$2$0.t2 = context$2$0['catch'](11);

            _logger2['default'].debug(context$2$0.t2);
            return context$2$0.abrupt('return', (0, _utils.nok)(errMess));

          case 21:
            return context$2$0.abrupt('return', stdout.match(/install-time/) ? (0, _utils.ok)('Xcode Command Line Tools are installed.') : (0, _utils.nok)(errMess));

          case 22:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[11, 17]]);
    }
  }, {
    key: 'fix',
    value: function fix() {
      var yesno;
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('The following command need be executed: xcode-select --install');
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((0, _prompt.fixIt)());

          case 3:
            yesno = context$2$0.sent;

            if (!(yesno === 'yes')) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('xcode-select', ['--install']));

          case 7:
            context$2$0.next = 11;
            break;

          case 9:
            _logger2['default'].info('Skipping you will need to install Xcode manually.');
            throw new _doctor.FixSkippedError();

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return XcodeCmdLineToolsCheck;
})(_doctor.DoctorCheck);

checks.push(new XcodeCmdLineToolsCheck());

// Automatically run authorize iOS if requested
fixes.authorizeIosFix = function callee$0$0() {
  var yesno;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('The authorize iOS script need to be run.');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _prompt.fixIt)());

      case 3:
        yesno = context$1$0.sent;

        if (!(yesno === 'yes')) {
          context$1$0.next = 9;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _utils.authorize)());

      case 7:
        context$1$0.next = 11;
        break;

      case 9:
        _logger2['default'].info('Skipping you will need to run the authorize iOS manually.');
        throw new _doctor.FixSkippedError();

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Dev Tools Security

var DevToolsSecurityCheck = (function (_DoctorCheck3) {
  _inherits(DevToolsSecurityCheck, _DoctorCheck3);

  function DevToolsSecurityCheck() {
    _classCallCheck(this, DevToolsSecurityCheck);

    _get(Object.getPrototypeOf(DevToolsSecurityCheck.prototype), 'constructor', this).call(this, { autofix: true });
  }

  _createClass(DevToolsSecurityCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var errMess, stdout;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            errMess = 'DevToolsSecurity is NOT enabled!';
            stdout = undefined;
            context$2$0.prev = 2;
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('DevToolsSecurity', []));

          case 5:
            stdout = context$2$0.sent.stdout;
            context$2$0.next = 12;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](2);

            _logger2['default'].debug(context$2$0.t0);
            return context$2$0.abrupt('return', (0, _utils.nok)(errMess));

          case 12:
            return context$2$0.abrupt('return', stdout && stdout.match(/enabled/) ? (0, _utils.ok)('DevToolsSecurity is enabled.') : (0, _utils.nok)(errMess));

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[2, 8]]);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(fixes.authorizeIosFix());

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return DevToolsSecurityCheck;
})(_doctor.DoctorCheck);

checks.push(new DevToolsSecurityCheck());

// Authorization DB

var AuthorizationDbCheck = (function (_DoctorCheck4) {
  _inherits(AuthorizationDbCheck, _DoctorCheck4);

  function AuthorizationDbCheck() {
    _classCallCheck(this, AuthorizationDbCheck);

    _get(Object.getPrototypeOf(AuthorizationDbCheck.prototype), 'constructor', this).call(this, { autofix: true });
  }

  _createClass(AuthorizationDbCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var successMess, errMess, stdout, data, rg;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            successMess = 'The Authorization DB is set up properly.';
            errMess = 'The Authorization DB is NOT set up properly.';
            stdout = undefined;
            context$2$0.prev = 3;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)('security', ['authorizationdb', 'read', 'system.privilege.taskport']));

          case 6:
            stdout = context$2$0.sent.stdout;
            context$2$0.next = 32;
            break;

          case 9:
            context$2$0.prev = 9;
            context$2$0.t0 = context$2$0['catch'](3);
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(_appiumSupport.system.macOsxVersion());

          case 13:
            context$2$0.t1 = context$2$0.sent;

            if (!(context$2$0.t1 === '10.8')) {
              context$2$0.next = 30;
              break;
            }

            data = undefined;
            context$2$0.prev = 16;
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile('/etc/authorization', 'utf8'));

          case 19:
            data = context$2$0.sent;
            context$2$0.next = 26;
            break;

          case 22:
            context$2$0.prev = 22;
            context$2$0.t2 = context$2$0['catch'](16);

            _logger2['default'].debug(context$2$0.t2);
            return context$2$0.abrupt('return', (0, _utils.nok)(errMess));

          case 26:
            rg = /<key>system.privilege.taskport<\/key>\s*\n\s*<dict>\n\s*<key>allow-root<\/key>\n\s*(<true\/>)/;
            return context$2$0.abrupt('return', data && data.match(rg) ? (0, _utils.ok)(successMess) : (0, _utils.nok)(errMess));

          case 30:
            _logger2['default'].debug(context$2$0.t0);
            return context$2$0.abrupt('return', (0, _utils.nok)(errMess));

          case 32:
            return context$2$0.abrupt('return', stdout && (stdout.match(/is-developer/) || stdout.match(/allow/)) ? (0, _utils.ok)(successMess) : (0, _utils.nok)(errMess));

          case 33:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 9], [16, 22]]);
    }
  }, {
    key: 'fix',
    value: function fix() {
      return _regeneratorRuntime.async(function fix$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(fixes.authorizeIosFix());

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return AuthorizationDbCheck;
})(_doctor.DoctorCheck);

checks.push(new AuthorizationDbCheck());

// Check for Carthage (for WDA)

var CarthageCheck = (function (_DoctorCheck5) {
  _inherits(CarthageCheck, _DoctorCheck5);

  function CarthageCheck() {
    _classCallCheck(this, CarthageCheck);

    _get(Object.getPrototypeOf(CarthageCheck.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CarthageCheck, [{
    key: 'diagnose',
    value: function diagnose() {
      var carthagePath;
      return _regeneratorRuntime.async(function diagnose$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_carthageDetector2['default'].detect());

          case 2:
            carthagePath = context$2$0.sent;
            return context$2$0.abrupt('return', carthagePath ? (0, _utils.ok)('Carthage was found at: ' + carthagePath) : (0, _utils.nok)('Carthage was NOT found!'));

          case 4:
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
            return context$2$0.abrupt('return', 'Please install Carthage. Visit https://github.com/Carthage' + '/Carthage#installing-carthage for more information.');

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return CarthageCheck;
})(_doctor.DoctorCheck);

checks.push(new CarthageCheck());

checks.push(new _env2['default']('HOME'));

exports.fixes = fixes;
exports.XcodeCheck = XcodeCheck;
exports.XcodeCmdLineToolsCheck = XcodeCmdLineToolsCheck;
exports.DevToolsSecurityCheck = DevToolsSecurityCheck;
exports.AuthorizationDbCheck = AuthorizationDbCheck;
exports.CarthageCheck = CarthageCheck;
exports['default'] = checks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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YSxFQUFFLENBQUMsQ0FBQzs7QUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBdUIsTUFBTSxDQUFDLENBQUMsQ0FBQzs7UUFFbkMsS0FBSyxHQUFMLEtBQUs7UUFBRSxVQUFVLEdBQVYsVUFBVTtRQUFFLHNCQUFzQixHQUF0QixzQkFBc0I7UUFBRSxxQkFBcUIsR0FBckIscUJBQXFCO1FBQ2hFLG9CQUFvQixHQUFwQixvQkFBb0I7UUFBRSxhQUFhLEdBQWIsYUFBYTtxQkFDN0IsTUFBTSIsImZpbGUiOiJsaWIvaW9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2ssIG5vaywgYXV0aG9yaXplIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBmcywgc3lzdGVtIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBEb2N0b3JDaGVjaywgRml4U2tpcHBlZEVycm9yIH0gZnJvbSAnLi9kb2N0b3InO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgQ2FydGhhZ2VEZXRlY3RvciBmcm9tICcuL2NhcnRoYWdlLWRldGVjdG9yJztcbmltcG9ydCB7IGZpeEl0IH0gZnJvbSAnLi9wcm9tcHQnO1xuaW1wb3J0IEVudlZhckFuZFBhdGhDaGVjayBmcm9tICcuL2Vudic7XG5cblxubGV0IGNoZWNrcyA9IFtdO1xubGV0IGZpeGVzID0ge307XG5cbi8vIENoZWNrIGZvciBYY29kZS5cbmNsYXNzIFhjb2RlQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBsZXQgeGNvZGVQYXRoO1xuICAgIHRyeSB7XG4gICAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKCd4Y29kZS1zZWxlY3QnLCBbJy0tcHJpbnQtcGF0aCddKTtcbiAgICAgIHhjb2RlUGF0aCA9IChzdGRvdXQgfHwgJycpLnJlcGxhY2UoXCJcXG5cIiwgXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gbm9rKCdYY29kZSBpcyBOT1QgaW5zdGFsbGVkIScpO1xuICAgIH1cbiAgICByZXR1cm4geGNvZGVQYXRoICYmIGF3YWl0IGZzLmV4aXN0cyh4Y29kZVBhdGgpID8gb2soYFhjb2RlIGlzIGluc3RhbGxlZCBhdDogJHt4Y29kZVBhdGh9YCkgOlxuICAgICAgbm9rKGBYY29kZSBjYW5ub3QgYmUgZm91bmQgYXQgXFwnJHt4Y29kZVBhdGh9XFwnIWApO1xuICB9XG5cbiAgYXN5bmMgZml4ICgpIHtcbiAgICByZXR1cm4gJ01hbnVhbGx5IGluc3RhbGwgWGNvZGUuJztcbiAgfVxufVxuY2hlY2tzLnB1c2gobmV3IFhjb2RlQ2hlY2soKSk7XG5cbi8vIENoZWNrIGZvciBYY29kZSBDb21tYW5kIExpbmUgVG9vbHMuXG5jbGFzcyBYY29kZUNtZExpbmVUb29sc0NoZWNrIGV4dGVuZHMgRG9jdG9yQ2hlY2sge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoe2F1dG9maXg6IHRydWV9KTtcbiAgfVxuXG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBjb25zdCBlcnJNZXNzID0gJ1hjb2RlIENvbW1hbmQgTGluZSBUb29scyBhcmUgTk9UIGluc3RhbGxlZCEnO1xuICAgIGxldCBwa2dOYW1lID0gYXdhaXQgc3lzdGVtLm1hY09zeFZlcnNpb24oKSA9PT0gJzEwLjgnID8gJ2NvbS5hcHBsZS5wa2cuRGV2ZWxvcGVyVG9vbHNDTEknIDogJ2NvbS5hcHBsZS5wa2cuQ0xUb29sc19FeGVjdXRhYmxlcyc7XG4gICAgbGV0IHN0ZG91dDtcbiAgICB0cnkge1xuICAgICAgc3Rkb3V0ID0gKGF3YWl0IGV4ZWMoJ3BrZ3V0aWwnLCBbYC0tcGtnLWluZm89JHtwa2dOYW1lfWBdKSkuc3Rkb3V0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLmRlYnVnKGVycik7XG4gICAgICByZXR1cm4gbm9rKGVyck1lc3MpO1xuICAgIH1cbiAgICByZXR1cm4gc3Rkb3V0Lm1hdGNoKC9pbnN0YWxsLXRpbWUvKSA/IG9rKCdYY29kZSBDb21tYW5kIExpbmUgVG9vbHMgYXJlIGluc3RhbGxlZC4nKSA6XG4gICAgICBub2soZXJyTWVzcyk7XG4gIH1cblxuICBhc3luYyBmaXggKCkge1xuICAgIGxvZy5pbmZvKGBUaGUgZm9sbG93aW5nIGNvbW1hbmQgbmVlZCBiZSBleGVjdXRlZDogeGNvZGUtc2VsZWN0IC0taW5zdGFsbGApO1xuICAgIGxldCB5ZXNubyA9IGF3YWl0IGZpeEl0KCk7XG4gICAgaWYgKHllc25vID09PSAneWVzJykge1xuICAgICAgYXdhaXQgZXhlYygneGNvZGUtc2VsZWN0JywgWyctLWluc3RhbGwnXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKCdTa2lwcGluZyB5b3Ugd2lsbCBuZWVkIHRvIGluc3RhbGwgWGNvZGUgbWFudWFsbHkuJyk7XG4gICAgICB0aHJvdyBuZXcgRml4U2tpcHBlZEVycm9yKCk7XG4gICAgfVxuICB9XG59XG5cbmNoZWNrcy5wdXNoKG5ldyBYY29kZUNtZExpbmVUb29sc0NoZWNrKCkpO1xuXG4vLyBBdXRvbWF0aWNhbGx5IHJ1biBhdXRob3JpemUgaU9TIGlmIHJlcXVlc3RlZFxuZml4ZXMuYXV0aG9yaXplSW9zRml4ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsb2cuaW5mbyhgVGhlIGF1dGhvcml6ZSBpT1Mgc2NyaXB0IG5lZWQgdG8gYmUgcnVuLmApO1xuICBsZXQgeWVzbm8gPSBhd2FpdCBmaXhJdCgpO1xuICBpZiAoeWVzbm8gPT09ICd5ZXMnKSB7XG4gICAgYXdhaXQgYXV0aG9yaXplKCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oJ1NraXBwaW5nIHlvdSB3aWxsIG5lZWQgdG8gcnVuIHRoZSBhdXRob3JpemUgaU9TIG1hbnVhbGx5LicpO1xuICAgIHRocm93IG5ldyBGaXhTa2lwcGVkRXJyb3IoKTtcbiAgfVxufTtcblxuLy8gRGV2IFRvb2xzIFNlY3VyaXR5XG5jbGFzcyBEZXZUb29sc1NlY3VyaXR5Q2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcih7YXV0b2ZpeDogdHJ1ZX0pO1xuICB9XG5cbiAgYXN5bmMgZGlhZ25vc2UgKCkge1xuICAgIGNvbnN0IGVyck1lc3MgPSAnRGV2VG9vbHNTZWN1cml0eSBpcyBOT1QgZW5hYmxlZCEnO1xuICAgIGxldCBzdGRvdXQ7XG4gICAgdHJ5IHtcbiAgICAgIHN0ZG91dCA9IChhd2FpdCBleGVjKCdEZXZUb29sc1NlY3VyaXR5JywgW10pKS5zdGRvdXQ7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZGVidWcoZXJyKTtcbiAgICAgIHJldHVybiBub2soZXJyTWVzcyk7XG4gICAgfVxuICAgIHJldHVybiBzdGRvdXQgJiYgc3Rkb3V0Lm1hdGNoKC9lbmFibGVkLykgPyBvaygnRGV2VG9vbHNTZWN1cml0eSBpcyBlbmFibGVkLicpXG4gICAgICA6IG5vayhlcnJNZXNzKTtcbiAgfVxuICBhc3luYyBmaXggKCkge1xuICAgIHJldHVybiBhd2FpdCBmaXhlcy5hdXRob3JpemVJb3NGaXgoKTtcbiAgfVxufVxuY2hlY2tzLnB1c2gobmV3IERldlRvb2xzU2VjdXJpdHlDaGVjaygpKTtcblxuLy8gQXV0aG9yaXphdGlvbiBEQlxuY2xhc3MgQXV0aG9yaXphdGlvbkRiQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcih7YXV0b2ZpeDogdHJ1ZX0pO1xuICB9XG5cbiAgYXN5bmMgZGlhZ25vc2UgKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NNZXNzID0gJ1RoZSBBdXRob3JpemF0aW9uIERCIGlzIHNldCB1cCBwcm9wZXJseS4nO1xuICAgIGNvbnN0IGVyck1lc3MgPSAnVGhlIEF1dGhvcml6YXRpb24gREIgaXMgTk9UIHNldCB1cCBwcm9wZXJseS4nO1xuICAgIGxldCBzdGRvdXQ7XG4gICAgdHJ5IHtcbiAgICAgIHN0ZG91dCA9IChhd2FpdCBleGVjKCdzZWN1cml0eScsIFsnYXV0aG9yaXphdGlvbmRiJywgJ3JlYWQnLCAnc3lzdGVtLnByaXZpbGVnZS50YXNrcG9ydCddKSkuc3Rkb3V0O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGF3YWl0IHN5c3RlbS5tYWNPc3hWZXJzaW9uKCkgPT09ICcxMC44Jykge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkYXRhID0gYXdhaXQgZnMucmVhZEZpbGUoJy9ldGMvYXV0aG9yaXphdGlvbicsICd1dGY4Jyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGxvZy5kZWJ1ZyhlcnIpO1xuICAgICAgICAgIHJldHVybiBub2soZXJyTWVzcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJnID0vPGtleT5zeXN0ZW0ucHJpdmlsZWdlLnRhc2twb3J0PFxcL2tleT5cXHMqXFxuXFxzKjxkaWN0Plxcblxccyo8a2V5PmFsbG93LXJvb3Q8XFwva2V5PlxcblxccyooPHRydWVcXC8+KS87XG4gICAgICAgIHJldHVybiBkYXRhICYmIGRhdGEubWF0Y2gocmcpID8gb2soc3VjY2Vzc01lc3MpIDogbm9rKGVyck1lc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmRlYnVnKGVycik7XG4gICAgICAgIHJldHVybiBub2soZXJyTWVzcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGRvdXQgJiYgKHN0ZG91dC5tYXRjaCgvaXMtZGV2ZWxvcGVyLykgfHwgc3Rkb3V0Lm1hdGNoKC9hbGxvdy8pKSA/XG4gICAgICAgb2soc3VjY2Vzc01lc3MpIDogbm9rKGVyck1lc3MpO1xuICB9XG4gIGFzeW5jIGZpeCAoKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZpeGVzLmF1dGhvcml6ZUlvc0ZpeCgpO1xuICB9XG59XG5jaGVja3MucHVzaChuZXcgQXV0aG9yaXphdGlvbkRiQ2hlY2soKSk7XG5cbi8vIENoZWNrIGZvciBDYXJ0aGFnZSAoZm9yIFdEQSlcbmNsYXNzIENhcnRoYWdlQ2hlY2sgZXh0ZW5kcyBEb2N0b3JDaGVjayB7XG4gIGFzeW5jIGRpYWdub3NlICgpIHtcbiAgICBsZXQgY2FydGhhZ2VQYXRoID0gYXdhaXQgQ2FydGhhZ2VEZXRlY3Rvci5kZXRlY3QoKTtcbiAgICByZXR1cm4gY2FydGhhZ2VQYXRoID8gb2soYENhcnRoYWdlIHdhcyBmb3VuZCBhdDogJHtjYXJ0aGFnZVBhdGh9YCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBub2soYENhcnRoYWdlIHdhcyBOT1QgZm91bmQhYCk7XG4gIH1cblxuICBhc3luYyBmaXggKCkge1xuICAgIHJldHVybiAnUGxlYXNlIGluc3RhbGwgQ2FydGhhZ2UuIFZpc2l0IGh0dHBzOi8vZ2l0aHViLmNvbS9DYXJ0aGFnZScgK1xuICAgICAgICAgICAnL0NhcnRoYWdlI2luc3RhbGxpbmctY2FydGhhZ2UgZm9yIG1vcmUgaW5mb3JtYXRpb24uJztcbiAgfVxufVxuY2hlY2tzLnB1c2gobmV3IENhcnRoYWdlQ2hlY2soKSk7XG5cbmNoZWNrcy5wdXNoKG5ldyBFbnZWYXJBbmRQYXRoQ2hlY2soJ0hPTUUnKSk7XG5cbmV4cG9ydCB7IGZpeGVzLCBYY29kZUNoZWNrLCBYY29kZUNtZExpbmVUb29sc0NoZWNrLCBEZXZUb29sc1NlY3VyaXR5Q2hlY2ssXG4gICAgICAgICBBdXRob3JpemF0aW9uRGJDaGVjaywgQ2FydGhhZ2VDaGVjayB9O1xuZXhwb3J0IGRlZmF1bHQgY2hlY2tzO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
