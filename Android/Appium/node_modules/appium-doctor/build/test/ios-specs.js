require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libIos = require('../lib/ios');

var _appiumSupport = require('appium-support');

var _libUtils = require('../lib/utils');

var utils = _interopRequireWildcard(_libUtils);

var _teen_process = require('teen_process');

var tp = _interopRequireWildcard(_teen_process);

var _libPrompt = require('../lib/prompt');

var prompter = _interopRequireWildcard(_libPrompt);

var _libCarthageDetector = require('../lib/carthage-detector');

var _libCarthageDetector2 = _interopRequireDefault(_libCarthageDetector);

var _libDoctor = require('../lib/doctor');

var _libDoctor2 = _interopRequireDefault(_libDoctor);

var _libLogger = require('../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var P = _Promise;

describe('ios', function () {
  describe('XcodeCheck', (0, _appiumTestSupport.withMocks)({ tp: tp, fs: _appiumSupport.fs }, function (mocks) {
    var check = new _libIos.XcodeCheck();
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '/a/b/c/d\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: true,
              message: 'Xcode is installed at: /a/b/c/d'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - xcode-select', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.reject(new Error('Something wrong!')));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'Xcode is NOT installed!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - path not exists', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '/a/b/c/d\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(P.resolve(false));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'Xcode cannot be found at \'/a/b/c/d\'!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(check.fix());

          case 2:
            context$3$0.sent.should.equal('Manually install Xcode.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('XcodeCmdLineToolsCheck', (0, _appiumTestSupport.withMocks)({ tp: tp, utils: utils, prompter: prompter, system: _appiumSupport.system }, function (mocks, S) {
    var check = new _libIos.XcodeCmdLineToolsCheck();
    it('autofix', function () {
      check.autofix.should.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('macOsxVersion').once().returns(P.resolve('10.10'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '1234 install-time\n', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: true,
              message: 'Xcode Command Line Tools are installed.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - pkgutil crash', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('macOsxVersion').once().returns(_bluebird2['default'].resolve('10.10'));
            mocks.tp.expects('exec').once().returns(_Promise.reject(new Error('Something wrong!')));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'Xcode Command Line Tools are NOT installed!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - no install time', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.system.expects('macOsxVersion').once().returns(_bluebird2['default'].resolve('10.10'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '1234 abcd\n', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'Xcode Command Line Tools are NOT installed!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix - yes', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '', stderr: '' }));
            mocks.prompter.expects('fixIt').once().returns(P.resolve('yes'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.fix());

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: The following command need be executed: xcode-select --install'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix - no', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.tp.expects('exec').never();
            mocks.prompter.expects('fixIt').once().returns(P.resolve('no'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.fix().should.be.rejectedWith(_libDoctor2['default']));

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: The following command need be executed: xcode-select --install', 'info: Skipping you will need to install Xcode manually.'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('authorizeIosFix', (0, _appiumTestSupport.withMocks)({ utils: utils, prompter: prompter }, function (mocks, S) {
    it('fix - yes', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.utils.expects('authorize').once();
            mocks.prompter.expects('fixIt').once().returns(P.resolve('yes'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libIos.fixes.authorizeIosFix());

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: The authorize iOS script need to be run.'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix - no', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.utils.expects('authorize').never();
            mocks.prompter.expects('fixIt').once().returns(P.resolve('no'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libIos.fixes.authorizeIosFix().should.be.rejectedWith(_libDoctor2['default']));

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: The authorize iOS script need to be run.', 'info: Skipping you will need to run the authorize iOS manually.'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('DevToolsSecurityCheck', (0, _appiumTestSupport.withMocks)({ fixes: _libIos.fixes, tp: tp }, function (mocks) {
    var check = new _libIos.DevToolsSecurityCheck();
    it('autofix', function () {
      check.autofix.should.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '1234 enabled\n', stderr: '' }));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: true,
              message: 'DevToolsSecurity is enabled.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - DevToolsSecurity crash', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(_Promise.reject(new Error('Something wrong!')));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'DevToolsSecurity is NOT enabled!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - not enabled', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '1234 abcd\n', stderr: '' }));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'DevToolsSecurity is NOT enabled!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fixes.expects('authorizeIosFix').once();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.fix());

          case 3:
            (0, _appiumTestSupport.verify)(mocks);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('AuthorizationDbCheck', (0, _appiumTestSupport.withMocks)({ fixes: _libIos.fixes, tp: tp, fs: _appiumSupport.fs, utils: utils, system: _appiumSupport.system }, function (mocks) {
    var check = new _libIos.AuthorizationDbCheck();
    it('autofix', function () {
      check.autofix.should.be.ok;
    });
    it('diagnose - success - 10.10', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '1234 is-developer\n', stderr: '' }));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: true,
              message: 'The Authorization DB is set up properly.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - success - 10.8', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.reject(new Error('Oh No!')));
            mocks.system.expects('macOsxVersion').once().returns(P.resolve('10.8'));
            mocks.fs.expects('readFile').once().returns(P.resolve('<key>system.privilege.taskport</key> \n <dict>\n <key>allow-root</key>\n <true/>'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 5:
            context$3$0.t0 = {
              ok: true,
              message: 'The Authorization DB is set up properly.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - 10.10 - security', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.reject(new Error('Oh No!')));
            mocks.system.expects('macOsxVersion').once().returns(P.resolve('10.10'));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'The Authorization DB is NOT set up properly.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - /etc/authorization', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.tp.expects('exec').once().returns(P.reject(new Error('Oh No!')));
            mocks.system.expects('macOsxVersion').once().returns(P.resolve('10.8'));
            mocks.fs.expects('readFile').once().returns(P.resolve(''));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 5:
            context$3$0.t0 = {
              ok: false,
              message: 'The Authorization DB is NOT set up properly.'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fixes.expects('authorizeIosFix').once();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.fix());

          case 3:
            (0, _appiumTestSupport.verify)(mocks);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('CarthageCheck', (0, _appiumTestSupport.withMocks)({ CarthageDetector: _libCarthageDetector2['default'] }, function (mocks) {
    var check = new _libIos.CarthageCheck();
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.CarthageDetector.expects('detect').once().returns(P.resolve('/usr/local/bin/carthage'));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: true,
              message: 'Carthage was found at: /usr/local/bin/carthage'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.CarthageDetector.expects('detect').once().returns(P.resolve(null));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'Carthage was NOT found!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(check.fix());

          case 2:
            context$3$0.sent.should.equal('Please install Carthage. Visit https://github.com/Carthage/Carthage#installing-carthage for more information.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LCtHQUErRzs7Ozs7OztLQUNqSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2lvcy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBmaXhlcywgWGNvZGVDaGVjaywgWGNvZGVDbWRMaW5lVG9vbHNDaGVjaywgRGV2VG9vbHNTZWN1cml0eUNoZWNrLFxuICBBdXRob3JpemF0aW9uRGJDaGVjaywgQ2FydGhhZ2VDaGVjayB9IGZyb20gJy4uL2xpYi9pb3MnO1xuaW1wb3J0IHsgZnMsIHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgKiBhcyB0cCBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcHJvbXB0ZXIgZnJvbSAnLi4vbGliL3Byb21wdCc7XG5pbXBvcnQgQ2FydGhhZ2VEZXRlY3RvciBmcm9tICcuLi9saWIvY2FydGhhZ2UtZGV0ZWN0b3InO1xuaW1wb3J0IEZpeFNraXBwZWRFcnJvciBmcm9tICcuLi9saWIvZG9jdG9yJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbGliL2xvZ2dlcic7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB7IHdpdGhNb2NrcywgdmVyaWZ5LCBzdHViTG9nIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcbmxldCBQID0gUHJvbWlzZTtcblxuZGVzY3JpYmUoJ2lvcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ1hjb2RlQ2hlY2snLCB3aXRoTW9ja3Moe3RwLCBmc30sIChtb2NrcykgPT4ge1xuICAgIGxldCBjaGVjayA9IG5ldyBYY29kZUNoZWNrKCk7XG4gICAgaXQoJ2F1dG9maXgnLCAoKSA9PiB7XG4gICAgICBjaGVjay5hdXRvZml4LnNob3VsZC5ub3QuYmUub2s7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gc3VjY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgUC5yZXNvbHZlKHtzdGRvdXQ6ICcvYS9iL2MvZFxcbicsIHN0ZGVycjogJyd9KSk7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUodHJ1ZSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdYY29kZSBpcyBpbnN0YWxsZWQgYXQ6IC9hL2IvYy9kJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUgLSB4Y29kZS1zZWxlY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUC5yZWplY3QobmV3IEVycm9yKCdTb21ldGhpbmcgd3JvbmchJykpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ1hjb2RlIGlzIE5PVCBpbnN0YWxsZWQhJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUgLSBwYXRoIG5vdCBleGlzdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7c3Rkb3V0OiAnL2EvYi9jL2RcXG4nLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKGZhbHNlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdYY29kZSBjYW5ub3QgYmUgZm91bmQgYXQgXFwnL2EvYi9jL2RcXCchJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgaW5zdGFsbCBYY29kZS4nKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnWGNvZGVDbWRMaW5lVG9vbHNDaGVjaycsIHdpdGhNb2Nrcyh7dHAsIHV0aWxzLCBwcm9tcHRlciwgc3lzdGVtfSwgKG1vY2tzLCBTKSA9PiB7XG4gICAgbGV0IGNoZWNrID0gbmV3IFhjb2RlQ21kTGluZVRvb2xzQ2hlY2soKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLmJlLm9rO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnbWFjT3N4VmVyc2lvbicpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnMTAuMTAnKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7c3Rkb3V0OiAnMTIzNCBpbnN0YWxsLXRpbWVcXG4nLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdYY29kZSBDb21tYW5kIExpbmUgVG9vbHMgYXJlIGluc3RhbGxlZC4nXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIHBrZ3V0aWwgY3Jhc2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnbWFjT3N4VmVyc2lvbicpLm9uY2UoKS5yZXR1cm5zKEIucmVzb2x2ZSgnMTAuMTAnKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdTb21ldGhpbmcgd3JvbmchJykpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ1hjb2RlIENvbW1hbmQgTGluZSBUb29scyBhcmUgTk9UIGluc3RhbGxlZCEnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIG5vIGluc3RhbGwgdGltZScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnN5c3RlbS5leHBlY3RzKCdtYWNPc3hWZXJzaW9uJykub25jZSgpLnJldHVybnMoQi5yZXNvbHZlKCcxMC4xMCcpKTtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgUC5yZXNvbHZlKHtzdGRvdXQ6ICcxMjM0IGFiY2RcXG4nLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnWGNvZGUgQ29tbWFuZCBMaW5lIFRvb2xzIGFyZSBOT1QgaW5zdGFsbGVkISdcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZml4IC0geWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGxvZ1N0dWIgPSBzdHViTG9nKFMuc2FuZGJveCwgbG9nLCB7c3RyaXBDb2xvcnM6IHRydWV9KTtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgUC5yZXNvbHZlKHtzdGRvdXQ6ICcnLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgbW9ja3MucHJvbXB0ZXIuZXhwZWN0cygnZml4SXQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJ3llcycpKTtcbiAgICAgIGF3YWl0IGNoZWNrLmZpeCgpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiBUaGUgZm9sbG93aW5nIGNvbW1hbmQgbmVlZCBiZSBleGVjdXRlZDogeGNvZGUtc2VsZWN0IC0taW5zdGFsbCcsXG4gICAgICBdLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcbiAgICBpdCgnZml4IC0gbm8nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgbW9ja3MudHAuZXhwZWN0cygnZXhlYycpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5wcm9tcHRlci5leHBlY3RzKCdmaXhJdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnbm8nKSk7XG4gICAgICBhd2FpdCBjaGVjay5maXgoKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKEZpeFNraXBwZWRFcnJvcik7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgICAgbG9nU3R1Yi5vdXRwdXQuc2hvdWxkLmVxdWFsKFtcbiAgICAgICAgJ2luZm86IFRoZSBmb2xsb3dpbmcgY29tbWFuZCBuZWVkIGJlIGV4ZWN1dGVkOiB4Y29kZS1zZWxlY3QgLS1pbnN0YWxsJyxcbiAgICAgICAgJ2luZm86IFNraXBwaW5nIHlvdSB3aWxsIG5lZWQgdG8gaW5zdGFsbCBYY29kZSBtYW51YWxseS4nXG4gICAgICBdLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcbiAgfSkpO1xuXG4gIGRlc2NyaWJlKCdhdXRob3JpemVJb3NGaXgnLCB3aXRoTW9ja3Moe3V0aWxzLCBwcm9tcHRlcn0sIChtb2NrcywgUykgPT4ge1xuICAgIGl0KCdmaXggLSB5ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgbW9ja3MudXRpbHMuZXhwZWN0cygnYXV0aG9yaXplJykub25jZSgpO1xuICAgICAgbW9ja3MucHJvbXB0ZXIuZXhwZWN0cygnZml4SXQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJ3llcycpKTtcbiAgICAgIGF3YWl0IGZpeGVzLmF1dGhvcml6ZUlvc0ZpeCgpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiBUaGUgYXV0aG9yaXplIGlPUyBzY3JpcHQgbmVlZCB0byBiZSBydW4uJyxcbiAgICAgIF0uam9pbignXFxuJykpO1xuICAgIH0pO1xuICAgIGl0KCdmaXggLSBubycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBsb2dTdHViID0gc3R1YkxvZyhTLnNhbmRib3gsIGxvZywge3N0cmlwQ29sb3JzOiB0cnVlfSk7XG4gICAgICBtb2Nrcy51dGlscy5leHBlY3RzKCdhdXRob3JpemUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MucHJvbXB0ZXIuZXhwZWN0cygnZml4SXQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJ25vJykpO1xuICAgICAgYXdhaXQgZml4ZXMuYXV0aG9yaXplSW9zRml4KCkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aChGaXhTa2lwcGVkRXJyb3IpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiBUaGUgYXV0aG9yaXplIGlPUyBzY3JpcHQgbmVlZCB0byBiZSBydW4uJyxcbiAgICAgICAgJ2luZm86IFNraXBwaW5nIHlvdSB3aWxsIG5lZWQgdG8gcnVuIHRoZSBhdXRob3JpemUgaU9TIG1hbnVhbGx5LidcbiAgICAgIF0uam9pbignXFxuJykpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdEZXZUb29sc1NlY3VyaXR5Q2hlY2snLCB3aXRoTW9ja3Moe2ZpeGVzLCB0cH0sIChtb2NrcykgPT4ge1xuICAgIGxldCBjaGVjayA9IG5ldyBEZXZUb29sc1NlY3VyaXR5Q2hlY2soKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLmJlLm9rO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7c3Rkb3V0OiAnMTIzNCBlbmFibGVkXFxuJywgc3RkZXJyOiAnJ30pKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAnRGV2VG9vbHNTZWN1cml0eSBpcyBlbmFibGVkLidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBmYWlsdXJlIC0gRGV2VG9vbHNTZWN1cml0eSBjcmFzaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1NvbWV0aGluZyB3cm9uZyEnKSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnRGV2VG9vbHNTZWN1cml0eSBpcyBOT1QgZW5hYmxlZCEnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIG5vdCBlbmFibGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MudHAuZXhwZWN0cygnZXhlYycpLm9uY2UoKS5yZXR1cm5zKFxuICAgICAgICBQLnJlc29sdmUoe3N0ZG91dDogJzEyMzQgYWJjZFxcbicsIHN0ZGVycjogJyd9KSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdEZXZUb29sc1NlY3VyaXR5IGlzIE5PVCBlbmFibGVkISdcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZml4JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZml4ZXMuZXhwZWN0cygnYXV0aG9yaXplSW9zRml4Jykub25jZSgpO1xuICAgICAgYXdhaXQgY2hlY2suZml4KCk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdBdXRob3JpemF0aW9uRGJDaGVjaycsIHdpdGhNb2Nrcyh7Zml4ZXMsIHRwLCBmcywgdXRpbHMsIHN5c3RlbX0sIChtb2NrcykgPT4ge1xuICAgIGxldCBjaGVjayA9IG5ldyBBdXRob3JpemF0aW9uRGJDaGVjaygpO1xuICAgIGl0KCdhdXRvZml4JywgKCkgPT4ge1xuICAgICAgY2hlY2suYXV0b2ZpeC5zaG91bGQuYmUub2s7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gc3VjY2VzcyAtIDEwLjEwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MudHAuZXhwZWN0cygnZXhlYycpLm9uY2UoKS5yZXR1cm5zKFxuICAgICAgICBQLnJlc29sdmUoe3N0ZG91dDogJzEyMzQgaXMtZGV2ZWxvcGVyXFxuJywgc3RkZXJyOiAnJ30pKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIEF1dGhvcml6YXRpb24gREIgaXMgc2V0IHVwIHByb3Blcmx5LidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzIC0gMTAuOCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhQLnJlamVjdChuZXcgRXJyb3IoJ09oIE5vIScpKSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnbWFjT3N4VmVyc2lvbicpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnMTAuOCcpKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JlYWRGaWxlJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKFxuICAgICAgICAnPGtleT5zeXN0ZW0ucHJpdmlsZWdlLnRhc2twb3J0PC9rZXk+IFxcbiA8ZGljdD5cXG4gPGtleT5hbGxvdy1yb290PC9rZXk+XFxuIDx0cnVlLz4nKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJ1RoZSBBdXRob3JpemF0aW9uIERCIGlzIHNldCB1cCBwcm9wZXJseS4nXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIDEwLjEwIC0gc2VjdXJpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUC5yZWplY3QobmV3IEVycm9yKCdPaCBObyEnKSkpO1xuICAgICAgbW9ja3Muc3lzdGVtLmV4cGVjdHMoJ21hY09zeFZlcnNpb24nKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJzEwLjEwJykpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIEF1dGhvcml6YXRpb24gREIgaXMgTk9UIHNldCB1cCBwcm9wZXJseS4nXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIC9ldGMvYXV0aG9yaXphdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhQLnJlamVjdChuZXcgRXJyb3IoJ09oIE5vIScpKSk7XG4gICAgICBtb2Nrcy5zeXN0ZW0uZXhwZWN0cygnbWFjT3N4VmVyc2lvbicpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnMTAuOCcpKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ3JlYWRGaWxlJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKCcnKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgQXV0aG9yaXphdGlvbiBEQiBpcyBOT1Qgc2V0IHVwIHByb3Blcmx5LidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZml4JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZml4ZXMuZXhwZWN0cygnYXV0aG9yaXplSW9zRml4Jykub25jZSgpO1xuICAgICAgYXdhaXQgY2hlY2suZml4KCk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdDYXJ0aGFnZUNoZWNrJywgd2l0aE1vY2tzKHtDYXJ0aGFnZURldGVjdG9yfSwgKG1vY2tzKSA9PiB7XG4gICAgbGV0IGNoZWNrID0gbmV3IENhcnRoYWdlQ2hlY2soKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLm5vdC5iZS5vaztcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuQ2FydGhhZ2VEZXRlY3Rvci5leHBlY3RzKCdkZXRlY3QnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJy91c3IvbG9jYWwvYmluL2NhcnRoYWdlJykpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdDYXJ0aGFnZSB3YXMgZm91bmQgYXQ6IC91c3IvbG9jYWwvYmluL2NhcnRoYWdlJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5DYXJ0aGFnZURldGVjdG9yLmV4cGVjdHMoJ2RldGVjdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZShudWxsKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdDYXJ0aGFnZSB3YXMgTk9UIGZvdW5kISdcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZml4JywgYXN5bmMgKCkgPT4ge1xuICAgICAgKGF3YWl0IGNoZWNrLmZpeCgpKS5zaG91bGQuZXF1YWwoJ1BsZWFzZSBpbnN0YWxsIENhcnRoYWdlLiBWaXNpdCBodHRwczovL2dpdGh1Yi5jb20vQ2FydGhhZ2UvQ2FydGhhZ2UjaW5zdGFsbGluZy1jYXJ0aGFnZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
