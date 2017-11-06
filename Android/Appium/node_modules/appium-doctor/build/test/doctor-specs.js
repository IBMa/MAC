require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libDoctor = require('../lib/doctor');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _appiumTestSupport = require('appium-test-support');

var _libLogger = require('../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

_chai2['default'].should();
var P = _Promise;

describe('doctor', function () {

  it('register', function () {
    var doctor = new _libDoctor.Doctor();
    doctor.checks.should.have.length(0);
    doctor.register(new _libDoctor.DoctorCheck());
    doctor.checks.should.have.length(1);
    doctor.register([new _libDoctor.DoctorCheck(), new _libDoctor.DoctorCheck()]);
    doctor.checks.should.have.length(3);
  });

  function configure() {
    var doctor = new _libDoctor.Doctor();
    var checks = [new _libDoctor.DoctorCheck(), new _libDoctor.DoctorCheck(), new _libDoctor.DoctorCheck()];
    doctor.register(checks);
    return { doctor: doctor, checks: checks };
  }

  describe('diagnose', (0, _appiumTestSupport.withMocks)({}, function (mocks, S) {
    it('should detect all issues', function callee$2$0() {
      var logStub, _configure, doctor, checks;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });
            _configure = configure();
            doctor = _configure.doctor;
            checks = _configure.checks;

            mocks.checks = checks.map(function (check) {
              return S.sandbox.mock(check);
            });
            mocks.checks[0].expects('diagnose').once().returns({ ok: true, message: "All Good!" });
            mocks.checks[1].expects('diagnose').once().returns({ ok: false, message: "Oh No!" });
            mocks.checks[2].expects('diagnose').once().returns({ ok: false, message: "Oh No!" });
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(doctor.diagnose());

          case 10:
            (0, _appiumTestSupport.verify)(mocks);
            doctor.toFix.should.have.length(2);
            logStub.output.should.equal(['info: ### Diagnostic starting ###', 'info:  ✔ All Good!', 'warn:  ✖ Oh No!', 'warn:  ✖ Oh No!', 'info: ### Diagnostic completed, 2 fixes needed. ###', 'info: '].join('\n'));

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('reportSuccess', (0, _appiumTestSupport.withMocks)({}, function (mocks, S) {
    var doctor = new _libDoctor.Doctor();
    it('should report success when no fixes are needed', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            doctor.toFix = [];
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(doctor.reportSuccess());

          case 4:
            context$3$0.sent.should.equal(true);

            logStub.output.should.equal(['info: Everything looks good, bye!', 'info: '].join('\n'));

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return false when fixes are needed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            doctor.toFix = [{}];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(doctor.reportSuccess());

          case 3:
            context$3$0.sent.should.equal(false);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('reportManualFixes', (0, _appiumTestSupport.withMocks)({}, function (mocks, S) {
    var doctor = new _libDoctor.Doctor();
    it('should ask for manual fixes to be applied', function callee$2$0() {
      var logStub, i, m;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            doctor.toFix = [{ error: 'Oh no this need to be manually fixed.', check: new _libDoctor.DoctorCheck() }, { error: 'Oh no this is an autofix.', check: new _libDoctor.DoctorCheck({ autofix: true }) }, { error: 'Oh no this also need to be manually fixed.', check: new _libDoctor.DoctorCheck() }, { error: 'Oh no this also need to be manually fixed.', check: new _libDoctor.DoctorCheck() }];
            for (i = 0; i < doctor.toFix.length; i++) {
              m = S.sandbox.mock(doctor.toFix[i].check);

              if (doctor.toFix[i].check.autofix) {
                m.expects('fix').never();
              } else {
                m.expects('fix').once().returns(P.resolve('Manual fix for ' + i + ' is do something.'));
              }
            }
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(doctor.reportManualFixes());

          case 5:
            context$3$0.sent.should.equal(true);

            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: ### Manual Fixes Needed ###', 'info: The configuration cannot be automatically fixed, please do the following first:', 'warn: - Manual fix for 0 is do something.', 'warn: - Manual fix for 2 is do something.', 'warn: - Manual fix for 3 is do something.', 'info: ###', 'info: ', 'info: Bye! Run appium-doctor again when all manual fixes have been applied!', 'info: '].join('\n'));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should return false when there is no manual fix', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            doctor.toFix = [{ error: 'Oh no!', check: new _libDoctor.DoctorCheck({ autofix: true }) }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(doctor.reportManualFixes());

          case 3:
            context$3$0.sent.should.equal(false);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('runAutoFix', (0, _appiumTestSupport.withMocks)({}, function (mocks, S) {
    var doctor = new _libDoctor.Doctor();
    var fix = {
      error: 'Something wrong!',
      check: {
        fix: function fix() {},
        diagnose: function diagnose() {}
      }
    };

    it('fix - success', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.check = S.sandbox.mock(fix.check);
            mocks.check.expects('fix').once();
            mocks.check.expects('diagnose').once().returns(P.resolve({
              ok: true, message: 'It worked' }));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(doctor.runAutoFix(fix));

          case 6:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: ### Fixing: Something wrong! ###', 'info: Checking if this was fixed:', 'info:  ✔ It worked', 'info: ### Fix was successfully applied ###'].join('\n'));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('fix - skipped', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.check = S.sandbox.mock(fix.check);
            mocks.check.expects('fix').once().throws(new _libDoctor.FixSkippedError());
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(doctor.runAutoFix(fix));

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: ### Fixing: Something wrong! ###', 'info: ### Skipped fix ###'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('fix - crash', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.check = S.sandbox.mock(fix.check);
            mocks.check.expects('fix').once().throws(new Error('Oh No!'));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(doctor.runAutoFix(fix));

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: ### Fixing: Something wrong! ###', 'warn: Error: Oh No!', 'info: ### Fix did not succeed ###'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('fix - didn\'t fix', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            mocks.check = S.sandbox.mock(fix.check);
            mocks.check.expects('fix').once();
            mocks.check.expects('diagnose').once().returns(P.resolve({
              ok: false, message: 'Still Weird!' }));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(doctor.runAutoFix(fix));

          case 6:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: ### Fixing: Something wrong! ###', 'info: Checking if this was fixed:', 'info:  ✖ Still Weird!', 'info: ### Fix was applied but issue remains ###'].join('\n'));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('runAutoFixes', (0, _appiumTestSupport.withSandbox)({}, function (S) {
    var doctor = new _libDoctor.Doctor();
    it('success', function callee$2$0() {
      var logStub;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            doctor.toFix = [{ error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }, { error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }, { error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }];
            S.sandbox.stub(doctor, 'runAutoFix', function (f) {
              _libLogger2['default'].info('Autofix log go there.');
              f.fixed = true;
            });
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(doctor.runAutoFixes());

          case 5:
            doctor.runAutoFix.calledThrice.should.be.ok;
            logStub.output.should.equal(['info: Autofix log go there.', 'info: ', 'info: Autofix log go there.', 'info: ', 'info: Autofix log go there.', 'info: ', 'info: Bye! All issues have been fixed!', 'info: '].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('failure', function callee$2$0() {
      var logStub, succeed;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logStub = (0, _appiumTestSupport.stubLog)(S.sandbox, _libLogger2['default'], { stripColors: true });

            doctor.toFix = [{ error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }, { error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }, { error: 'Oh no.', check: new _libDoctor.DoctorCheck({ autofix: true }) }];
            succeed = false;

            S.sandbox.stub(doctor, 'runAutoFix', function (f) {
              if (succeed) {
                _libLogger2['default'].info('succeeded, Autofix log go there.');
                f.fixed = true;
              } else {
                _libLogger2['default'].warn('failed, Autofix log go there.');
              }
              succeed = !succeed;
            });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(doctor.runAutoFixes());

          case 6:
            doctor.runAutoFix.calledThrice.should.be.ok;
            logStub.output.should.equal(['warn: failed, Autofix log go there.', 'info: ', 'info: succeeded, Autofix log go there.', 'info: ', 'warn: failed, Autofix log go there.', 'info: ', 'info: Bye! A few issues remain, fix manually and/or rerun appium-doctor!', 'info: '].join('\n'));

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('run', (0, _appiumTestSupport.withMocks)({}, function (mocks, S) {
    var doctor = new _libDoctor.Doctor();
    it('should work', function callee$2$0() {
      var _doctor;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            _doctor = new _libDoctor.Doctor();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_doctor.run());

          case 4:
            context$3$0.next = 8;
            break;

          case 6:
            context$3$0.prev = 6;
            context$3$0.t0 = context$3$0['catch'](0);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[0, 6]]);
    });
    it('should report success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.doctor = S.sandbox.mock(doctor);
            mocks.doctor.expects('diagnose').once();
            mocks.doctor.expects('reportSuccess').once().returns(true);
            mocks.doctor.expects('reportManualFixes').never();
            mocks.doctor.expects('runAutoFixes').never();
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(doctor.run());

          case 7:
            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should report manual fixes', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.doctor = S.sandbox.mock(doctor);
            mocks.doctor.expects('diagnose').once();
            mocks.doctor.expects('reportSuccess').once().returns(false);
            mocks.doctor.expects('reportManualFixes').once().returns(true);
            mocks.doctor.expects('runAutoFixes').never();
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(doctor.run());

          case 7:
            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should run autofixes', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.doctor = S.sandbox.mock(doctor);
            mocks.doctor.expects('diagnose').once();
            mocks.doctor.expects('reportSuccess').once().returns(false);
            mocks.doctor.expects('reportManualFixes').once().returns(false);
            mocks.doctor.expects('runAutoFixes').once();
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(doctor.run());

          case 7:
            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFzQixFQUFFOzs7O0FBQ3pCLGlCQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QyxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVELGlCQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRSxpQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7OzZDQUN0QyxNQUFNLENBQUMsR0FBRyxFQUFFOzs7QUFDbEIsMkNBQU8sS0FBSyxDQUFDLENBQUM7Ozs7Ozs7S0FDZixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2RvY3Rvci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBEb2N0b3IsIERvY3RvckNoZWNrLCBGaXhTa2lwcGVkRXJyb3IgfSBmcm9tICcuLi9saWIvZG9jdG9yJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgd2l0aFNhbmRib3gsIHdpdGhNb2NrcywgdmVyaWZ5LCBzdHViTG9nIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2dnZXInO1xuXG5jaGFpLnNob3VsZCgpO1xubGV0IFAgPSBQcm9taXNlO1xuXG5kZXNjcmliZSgnZG9jdG9yJywgKCkgPT4ge1xuXG4gIGl0KCdyZWdpc3RlcicsICgpID0+IHtcbiAgICBsZXQgZG9jdG9yID0gbmV3IERvY3RvcigpO1xuICAgIGRvY3Rvci5jaGVja3Muc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xuICAgIGRvY3Rvci5yZWdpc3RlcihuZXcgRG9jdG9yQ2hlY2soKSk7XG4gICAgZG9jdG9yLmNoZWNrcy5zaG91bGQuaGF2ZS5sZW5ndGgoMSk7XG4gICAgZG9jdG9yLnJlZ2lzdGVyKFtuZXcgRG9jdG9yQ2hlY2soKSwgbmV3IERvY3RvckNoZWNrKCldKTtcbiAgICBkb2N0b3IuY2hlY2tzLnNob3VsZC5oYXZlLmxlbmd0aCgzKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY29uZmlndXJlICgpIHtcbiAgICBsZXQgZG9jdG9yID0gbmV3IERvY3RvcigpO1xuICAgIGxldCBjaGVja3MgPSBbbmV3IERvY3RvckNoZWNrKCksIG5ldyBEb2N0b3JDaGVjaygpLCBuZXcgRG9jdG9yQ2hlY2soKV07XG4gICAgZG9jdG9yLnJlZ2lzdGVyKGNoZWNrcyk7XG4gICAgcmV0dXJuIHtkb2N0b3IsIGNoZWNrc307XG4gIH1cblxuICBkZXNjcmliZSgnZGlhZ25vc2UnLCB3aXRoTW9ja3Moe30sIChtb2NrcywgUykgPT4ge1xuICAgIGl0KCdzaG91bGQgZGV0ZWN0IGFsbCBpc3N1ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgbGV0IHtkb2N0b3IsIGNoZWNrc30gPSBjb25maWd1cmUoKTtcbiAgICAgIG1vY2tzLmNoZWNrcyA9IGNoZWNrcy5tYXAoKGNoZWNrKSA9PiB7IHJldHVybiBTLnNhbmRib3gubW9jayhjaGVjayk7IH0pO1xuICAgICAgbW9ja3MuY2hlY2tzWzBdLmV4cGVjdHMoJ2RpYWdub3NlJykub25jZSgpLnJldHVybnMoe29rOiB0cnVlLCBtZXNzYWdlOiBcIkFsbCBHb29kIVwifSk7XG4gICAgICBtb2Nrcy5jaGVja3NbMV0uZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCkucmV0dXJucyh7b2s6IGZhbHNlLCBtZXNzYWdlOiBcIk9oIE5vIVwifSk7XG4gICAgICBtb2Nrcy5jaGVja3NbMl0uZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCkucmV0dXJucyh7b2s6IGZhbHNlLCBtZXNzYWdlOiBcIk9oIE5vIVwifSk7XG4gICAgICBhd2FpdCBkb2N0b3IuZGlhZ25vc2UoKTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgICBkb2N0b3IudG9GaXguc2hvdWxkLmhhdmUubGVuZ3RoKDIpO1xuICAgICAgbG9nU3R1Yi5vdXRwdXQuc2hvdWxkLmVxdWFsKFtcbiAgICAgICAgJ2luZm86ICMjIyBEaWFnbm9zdGljIHN0YXJ0aW5nICMjIycsXG4gICAgICAgICdpbmZvOiAg4pyUIEFsbCBHb29kIScsXG4gICAgICAgICd3YXJuOiAg4pyWIE9oIE5vIScsXG4gICAgICAgICd3YXJuOiAg4pyWIE9oIE5vIScsXG4gICAgICAgICdpbmZvOiAjIyMgRGlhZ25vc3RpYyBjb21wbGV0ZWQsIDIgZml4ZXMgbmVlZGVkLiAjIyMnLFxuICAgICAgICAnaW5mbzogJ1xuICAgICAgXS5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgncmVwb3J0U3VjY2VzcycsIHdpdGhNb2Nrcyh7fSwgKG1vY2tzLCBTKSA9PiB7XG4gICAgbGV0IGRvY3RvciA9IG5ldyBEb2N0b3IoKTtcbiAgICBpdCgnc2hvdWxkIHJlcG9ydCBzdWNjZXNzIHdoZW4gbm8gZml4ZXMgYXJlIG5lZWRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBsb2dTdHViID0gc3R1YkxvZyhTLnNhbmRib3gsIGxvZywge3N0cmlwQ29sb3JzOiB0cnVlfSk7XG4gICAgICBkb2N0b3IudG9GaXggPSBbXTtcbiAgICAgIChhd2FpdCBkb2N0b3IucmVwb3J0U3VjY2VzcygpKS5zaG91bGQuZXF1YWwodHJ1ZSk7XG4gICAgICBsb2dTdHViLm91dHB1dC5zaG91bGQuZXF1YWwoW1xuICAgICAgICAnaW5mbzogRXZlcnl0aGluZyBsb29rcyBnb29kLCBieWUhJyxcbiAgICAgICAgJ2luZm86ICdcbiAgICAgIF0uam9pbignXFxuJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBmaXhlcyBhcmUgbmVlZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZG9jdG9yLnRvRml4ID0gW3t9XTtcbiAgICAgIChhd2FpdCBkb2N0b3IucmVwb3J0U3VjY2VzcygpKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUoJ3JlcG9ydE1hbnVhbEZpeGVzJywgd2l0aE1vY2tzKHt9LCAobW9ja3MsIFMpID0+IHtcbiAgICBsZXQgZG9jdG9yID0gbmV3IERvY3RvcigpO1xuICAgIGl0KCdzaG91bGQgYXNrIGZvciBtYW51YWwgZml4ZXMgdG8gYmUgYXBwbGllZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBsb2dTdHViID0gc3R1YkxvZyhTLnNhbmRib3gsIGxvZywge3N0cmlwQ29sb3JzOiB0cnVlfSk7XG4gICAgICBkb2N0b3IudG9GaXggPSBbXG4gICAgICAgIHtlcnJvcjogJ09oIG5vIHRoaXMgbmVlZCB0byBiZSBtYW51YWxseSBmaXhlZC4nLCBjaGVjazogbmV3IERvY3RvckNoZWNrKCl9LFxuICAgICAgICB7ZXJyb3I6ICdPaCBubyB0aGlzIGlzIGFuIGF1dG9maXguJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjayh7YXV0b2ZpeDogdHJ1ZX0pfSxcbiAgICAgICAge2Vycm9yOiAnT2ggbm8gdGhpcyBhbHNvIG5lZWQgdG8gYmUgbWFudWFsbHkgZml4ZWQuJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjaygpfSxcbiAgICAgICAge2Vycm9yOiAnT2ggbm8gdGhpcyBhbHNvIG5lZWQgdG8gYmUgbWFudWFsbHkgZml4ZWQuJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjaygpfSxcbiAgICAgIF07XG4gICAgICBmb3IgKGxldCBpPTA7IGk8ZG9jdG9yLnRvRml4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBtID0gUy5zYW5kYm94Lm1vY2soZG9jdG9yLnRvRml4W2ldLmNoZWNrKTtcbiAgICAgICAgaWYgKGRvY3Rvci50b0ZpeFtpXS5jaGVjay5hdXRvZml4KSB7XG4gICAgICAgICAgbS5leHBlY3RzKCdmaXgnKS5uZXZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0uZXhwZWN0cygnZml4Jykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKGBNYW51YWwgZml4IGZvciAke2l9IGlzIGRvIHNvbWV0aGluZy5gKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIChhd2FpdCBkb2N0b3IucmVwb3J0TWFudWFsRml4ZXMoKSkuc2hvdWxkLmVxdWFsKHRydWUpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiAjIyMgTWFudWFsIEZpeGVzIE5lZWRlZCAjIyMnLFxuICAgICAgICAnaW5mbzogVGhlIGNvbmZpZ3VyYXRpb24gY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgZml4ZWQsIHBsZWFzZSBkbyB0aGUgZm9sbG93aW5nIGZpcnN0OicsXG4gICAgICAgICd3YXJuOiAtIE1hbnVhbCBmaXggZm9yIDAgaXMgZG8gc29tZXRoaW5nLicsXG4gICAgICAgICd3YXJuOiAtIE1hbnVhbCBmaXggZm9yIDIgaXMgZG8gc29tZXRoaW5nLicsXG4gICAgICAgICd3YXJuOiAtIE1hbnVhbCBmaXggZm9yIDMgaXMgZG8gc29tZXRoaW5nLicsXG4gICAgICAgICdpbmZvOiAjIyMnLFxuICAgICAgICAnaW5mbzogJyxcbiAgICAgICAgJ2luZm86IEJ5ZSEgUnVuIGFwcGl1bS1kb2N0b3IgYWdhaW4gd2hlbiBhbGwgbWFudWFsIGZpeGVzIGhhdmUgYmVlbiBhcHBsaWVkIScsXG4gICAgICAgICdpbmZvOiAnXG4gICAgICBdLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gdGhlcmUgaXMgbm8gbWFudWFsIGZpeCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRvY3Rvci50b0ZpeCA9IFt7ZXJyb3I6ICdPaCBubyEnLCBjaGVjazogbmV3IERvY3RvckNoZWNrKHthdXRvZml4OiB0cnVlfSkgfV07XG4gICAgICAoYXdhaXQgZG9jdG9yLnJlcG9ydE1hbnVhbEZpeGVzKCkpLnNob3VsZC5lcXVhbChmYWxzZSk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgncnVuQXV0b0ZpeCcsICB3aXRoTW9ja3Moe30sIChtb2NrcywgUykgPT4ge1xuICAgIGxldCBkb2N0b3IgPSBuZXcgRG9jdG9yKCk7XG4gICAgbGV0IGZpeCA9IHtcbiAgICAgIGVycm9yOiAnU29tZXRoaW5nIHdyb25nIScsXG4gICAgICBjaGVjazoge1xuICAgICAgICBmaXg6ICgpID0+IHt9LFxuICAgICAgICBkaWFnbm9zZTogKCkgPT4ge31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaXQoJ2ZpeCAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgbW9ja3MuY2hlY2sgPSBTLnNhbmRib3gubW9jayhmaXguY2hlY2spO1xuICAgICAgbW9ja3MuY2hlY2suZXhwZWN0cygnZml4Jykub25jZSgpO1xuICAgICAgbW9ja3MuY2hlY2suZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoe1xuICAgICAgICBvazogdHJ1ZSwgbWVzc2FnZTogJ0l0IHdvcmtlZCd9KSk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuQXV0b0ZpeChmaXgpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiAjIyMgRml4aW5nOiBTb21ldGhpbmcgd3JvbmchICMjIycsXG4gICAgICAgICdpbmZvOiBDaGVja2luZyBpZiB0aGlzIHdhcyBmaXhlZDonLFxuICAgICAgICAnaW5mbzogIOKclCBJdCB3b3JrZWQnLFxuICAgICAgICAnaW5mbzogIyMjIEZpeCB3YXMgc3VjY2Vzc2Z1bGx5IGFwcGxpZWQgIyMjJ1xuICAgICAgXS5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZml4IC0gc2tpcHBlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBsb2dTdHViID0gc3R1YkxvZyhTLnNhbmRib3gsIGxvZywge3N0cmlwQ29sb3JzOiB0cnVlfSk7XG4gICAgICBtb2Nrcy5jaGVjayA9IFMuc2FuZGJveC5tb2NrKGZpeC5jaGVjayk7XG4gICAgICBtb2Nrcy5jaGVjay5leHBlY3RzKCdmaXgnKS5vbmNlKCkudGhyb3dzKG5ldyBGaXhTa2lwcGVkRXJyb3IoKSk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuQXV0b0ZpeChmaXgpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiAjIyMgRml4aW5nOiBTb21ldGhpbmcgd3JvbmchICMjIycsXG4gICAgICAgICdpbmZvOiAjIyMgU2tpcHBlZCBmaXggIyMjJyxcbiAgICAgIF0uam9pbignXFxuJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpeCAtIGNyYXNoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGxvZ1N0dWIgPSBzdHViTG9nKFMuc2FuZGJveCwgbG9nLCB7c3RyaXBDb2xvcnM6IHRydWV9KTtcbiAgICAgIG1vY2tzLmNoZWNrID0gUy5zYW5kYm94Lm1vY2soZml4LmNoZWNrKTtcbiAgICAgIG1vY2tzLmNoZWNrLmV4cGVjdHMoJ2ZpeCcpLm9uY2UoKS50aHJvd3MobmV3IEVycm9yKCdPaCBObyEnKSk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuQXV0b0ZpeChmaXgpO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICAgIGxvZ1N0dWIub3V0cHV0LnNob3VsZC5lcXVhbChbXG4gICAgICAgICdpbmZvOiAjIyMgRml4aW5nOiBTb21ldGhpbmcgd3JvbmchICMjIycsXG4gICAgICAgICd3YXJuOiBFcnJvcjogT2ggTm8hJyxcbiAgICAgICAgJ2luZm86ICMjIyBGaXggZGlkIG5vdCBzdWNjZWVkICMjIycsXG4gICAgICBdLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXggLSBkaWRuXFwndCBmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgbW9ja3MuY2hlY2sgPSBTLnNhbmRib3gubW9jayhmaXguY2hlY2spO1xuICAgICAgbW9ja3MuY2hlY2suZXhwZWN0cygnZml4Jykub25jZSgpO1xuICAgICAgbW9ja3MuY2hlY2suZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoe1xuICAgICAgICBvazogZmFsc2UsIG1lc3NhZ2U6ICdTdGlsbCBXZWlyZCEnfSkpO1xuICAgICAgYXdhaXQgZG9jdG9yLnJ1bkF1dG9GaXgoZml4KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgICBsb2dTdHViLm91dHB1dC5zaG91bGQuZXF1YWwoW1xuICAgICAgICAnaW5mbzogIyMjIEZpeGluZzogU29tZXRoaW5nIHdyb25nISAjIyMnLFxuICAgICAgICAnaW5mbzogQ2hlY2tpbmcgaWYgdGhpcyB3YXMgZml4ZWQ6JyxcbiAgICAgICAgJ2luZm86ICDinJYgU3RpbGwgV2VpcmQhJyxcbiAgICAgICAgJ2luZm86ICMjIyBGaXggd2FzIGFwcGxpZWQgYnV0IGlzc3VlIHJlbWFpbnMgIyMjJ1xuICAgICAgXS5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgncnVuQXV0b0ZpeGVzJywgIHdpdGhTYW5kYm94KHt9LCAoUykgPT4ge1xuICAgIGxldCBkb2N0b3IgPSBuZXcgRG9jdG9yKCk7XG4gICAgaXQoJ3N1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgbG9nU3R1YiA9IHN0dWJMb2coUy5zYW5kYm94LCBsb2csIHtzdHJpcENvbG9yczogdHJ1ZX0pO1xuICAgICAgZG9jdG9yLnRvRml4ID0gW1xuICAgICAgICB7ZXJyb3I6ICdPaCBuby4nLCBjaGVjazogbmV3IERvY3RvckNoZWNrKHthdXRvZml4OiB0cnVlfSl9LFxuICAgICAgICB7ZXJyb3I6ICdPaCBuby4nLCBjaGVjazogbmV3IERvY3RvckNoZWNrKHthdXRvZml4OiB0cnVlfSl9LFxuICAgICAgICB7ZXJyb3I6ICdPaCBuby4nLCBjaGVjazogbmV3IERvY3RvckNoZWNrKHthdXRvZml4OiB0cnVlfSl9LFxuICAgICAgXTtcbiAgICAgIFMuc2FuZGJveC5zdHViKGRvY3RvciwgJ3J1bkF1dG9GaXgnLCAoZikgPT4ge1xuICAgICAgICBsb2cuaW5mbygnQXV0b2ZpeCBsb2cgZ28gdGhlcmUuJyk7XG4gICAgICAgIGYuZml4ZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuQXV0b0ZpeGVzKCk7XG4gICAgICBkb2N0b3IucnVuQXV0b0ZpeC5jYWxsZWRUaHJpY2Uuc2hvdWxkLmJlLm9rO1xuICAgICAgbG9nU3R1Yi5vdXRwdXQuc2hvdWxkLmVxdWFsKFtcbiAgICAgICAgJ2luZm86IEF1dG9maXggbG9nIGdvIHRoZXJlLicsXG4gICAgICAgICdpbmZvOiAnLFxuICAgICAgICAnaW5mbzogQXV0b2ZpeCBsb2cgZ28gdGhlcmUuJyxcbiAgICAgICAgJ2luZm86ICcsXG4gICAgICAgICdpbmZvOiBBdXRvZml4IGxvZyBnbyB0aGVyZS4nLFxuICAgICAgICAnaW5mbzogJyxcbiAgICAgICAgJ2luZm86IEJ5ZSEgQWxsIGlzc3VlcyBoYXZlIGJlZW4gZml4ZWQhJyxcbiAgICAgICAgJ2luZm86ICcsXG4gICAgICBdLmpvaW4oJ1xcbicpKTtcbiAgICB9KTtcblxuICAgIGl0KCdmYWlsdXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGxvZ1N0dWIgPSBzdHViTG9nKFMuc2FuZGJveCwgbG9nLCB7c3RyaXBDb2xvcnM6IHRydWV9KTtcbiAgICAgIGRvY3Rvci50b0ZpeCA9IFtcbiAgICAgICAge2Vycm9yOiAnT2ggbm8uJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjayh7YXV0b2ZpeDogdHJ1ZX0pfSxcbiAgICAgICAge2Vycm9yOiAnT2ggbm8uJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjayh7YXV0b2ZpeDogdHJ1ZX0pfSxcbiAgICAgICAge2Vycm9yOiAnT2ggbm8uJywgY2hlY2s6IG5ldyBEb2N0b3JDaGVjayh7YXV0b2ZpeDogdHJ1ZX0pfSxcbiAgICAgIF07XG4gICAgICBsZXQgc3VjY2VlZCA9IGZhbHNlO1xuICAgICAgUy5zYW5kYm94LnN0dWIoZG9jdG9yLCAncnVuQXV0b0ZpeCcsIChmKSA9PiB7XG4gICAgICAgIGlmIChzdWNjZWVkKSB7XG4gICAgICAgICAgbG9nLmluZm8oJ3N1Y2NlZWRlZCwgQXV0b2ZpeCBsb2cgZ28gdGhlcmUuJyk7XG4gICAgICAgICAgZi5maXhlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLndhcm4oJ2ZhaWxlZCwgQXV0b2ZpeCBsb2cgZ28gdGhlcmUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3VjY2VlZCA9ICFzdWNjZWVkO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuQXV0b0ZpeGVzKCk7XG4gICAgICBkb2N0b3IucnVuQXV0b0ZpeC5jYWxsZWRUaHJpY2Uuc2hvdWxkLmJlLm9rO1xuICAgICAgbG9nU3R1Yi5vdXRwdXQuc2hvdWxkLmVxdWFsKFtcbiAgICAgICAgJ3dhcm46IGZhaWxlZCwgQXV0b2ZpeCBsb2cgZ28gdGhlcmUuJyxcbiAgICAgICAgJ2luZm86ICcsXG4gICAgICAgICdpbmZvOiBzdWNjZWVkZWQsIEF1dG9maXggbG9nIGdvIHRoZXJlLicsXG4gICAgICAgICdpbmZvOiAnLFxuICAgICAgICAnd2FybjogZmFpbGVkLCBBdXRvZml4IGxvZyBnbyB0aGVyZS4nLFxuICAgICAgICAnaW5mbzogJyxcbiAgICAgICAgJ2luZm86IEJ5ZSEgQSBmZXcgaXNzdWVzIHJlbWFpbiwgZml4IG1hbnVhbGx5IGFuZC9vciByZXJ1biBhcHBpdW0tZG9jdG9yIScsXG4gICAgICAgICdpbmZvOiAnLFxuICAgICAgXS5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgncnVuJywgIHdpdGhNb2Nrcyh7fSwgKG1vY2tzLCBTKSA9PiB7XG4gICAgbGV0IGRvY3RvciA9IG5ldyBEb2N0b3IoKTtcbiAgICBpdCgnc2hvdWxkIHdvcmsnLCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgZG9jdG9yID0gbmV3IERvY3RvcigpO1xuICAgICAgICBhd2FpdCBkb2N0b3IucnVuKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlcG9ydCBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZG9jdG9yID0gUy5zYW5kYm94Lm1vY2soZG9jdG9yKTtcbiAgICAgIG1vY2tzLmRvY3Rvci5leHBlY3RzKCdkaWFnbm9zZScpLm9uY2UoKTtcbiAgICAgIG1vY2tzLmRvY3Rvci5leHBlY3RzKCdyZXBvcnRTdWNjZXNzJykub25jZSgpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5kb2N0b3IuZXhwZWN0cygncmVwb3J0TWFudWFsRml4ZXMnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuZG9jdG9yLmV4cGVjdHMoJ3J1bkF1dG9GaXhlcycpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuKCk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVwb3J0IG1hbnVhbCBmaXhlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmRvY3RvciA9IFMuc2FuZGJveC5tb2NrKGRvY3Rvcik7XG4gICAgICBtb2Nrcy5kb2N0b3IuZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5kb2N0b3IuZXhwZWN0cygncmVwb3J0U3VjY2VzcycpLm9uY2UoKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmRvY3Rvci5leHBlY3RzKCdyZXBvcnRNYW51YWxGaXhlcycpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuZG9jdG9yLmV4cGVjdHMoJ3J1bkF1dG9GaXhlcycpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuKCk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcnVuIGF1dG9maXhlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmRvY3RvciA9IFMuc2FuZGJveC5tb2NrKGRvY3Rvcik7XG4gICAgICBtb2Nrcy5kb2N0b3IuZXhwZWN0cygnZGlhZ25vc2UnKS5vbmNlKCk7XG4gICAgICBtb2Nrcy5kb2N0b3IuZXhwZWN0cygncmVwb3J0U3VjY2VzcycpLm9uY2UoKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmRvY3Rvci5leHBlY3RzKCdyZXBvcnRNYW51YWxGaXhlcycpLm9uY2UoKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmRvY3Rvci5leHBlY3RzKCdydW5BdXRvRml4ZXMnKS5vbmNlKCk7XG4gICAgICBhd2FpdCBkb2N0b3IucnVuKCk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICB9KSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
