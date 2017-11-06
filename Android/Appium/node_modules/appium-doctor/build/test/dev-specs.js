require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libDev = require('../lib/dev');

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var tp = _interopRequireWildcard(_teen_process);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
var P = _Promise;

describe('dev', function () {
  describe('BinaryIsInPathCheck', (0, _appiumTestSupport.withMocks)({ tp: tp, fs: _appiumSupport.fs }, function (mocks) {
    (0, _appiumTestSupport.stubEnv)();
    var check = new _libDev.BinaryIsInPathCheck('mvn');
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.PATH = '/a/b/c/d;/e/f/g/h';
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '/a/b/c/d/mvn\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 5:
            context$3$0.t0 = {
              ok: true,
              message: 'mvn was found at /a/b/c/d/mvn'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - not in path ', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.PATH = '/a/b/c/d;/e/f/g/h';
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: 'mvn not found\n', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'mvn is MISSING in PATH!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - invalid path', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.PATH = '/a/b/c/d;/e/f/g/h';
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '/a/b/c/d/mvn\n', stderr: '' }));
            mocks.fs.expects('exists').once().returns(P.resolve(false));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 5:
            context$3$0.t0 = {
              ok: false,
              message: 'mvn was found in PATH at \'/a/b/c/d/mvn\', ' + 'but this is NOT a valid path!'
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
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(check.fix());

          case 2:
            context$3$0.sent.should.equal('Manually install the mvn binary and add it to PATH.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('AndroidSdkExists', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    (0, _appiumTestSupport.stubEnv)();
    var check = new _libDev.AndroidSdkExists('android-16');
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.ANDROID_HOME = '/a/b/c/d';
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: true,
              message: 'android-16 was found at: /a/b/c/d/platforms/android-16'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('failure - missing android home', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            delete process.env.ANDROID_HOME;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'android-16 could not be found because ANDROID_HOME is NOT set!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - invalid path', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.ANDROID_HOME = '/a/b/c/d';
            mocks.fs.expects('exists').once().returns(P.resolve(false));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'android-16 could NOT be found at \'/a/b/c/d/platforms/android-16\'!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix - ANDROID_HOME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            delete process.env.ANDROID_HOME;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.fix());

          case 3:
            context$3$0.sent.should.equal('Manually configure ANDROID_HOME.');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('fix - install', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.ANDROID_HOME = '/a/b/c/d';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.fix());

          case 3:
            context$3$0.sent.should.equal('Manually install the android-16 sdk.');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QU0sQ0FBQyxLQUFLLENBQUMsc0NBQXNDOzs7Ozs7O0tBQ3hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZGV2LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IEJpbmFyeUlzSW5QYXRoQ2hlY2ssIEFuZHJvaWRTZGtFeGlzdHMgfSBmcm9tICcuLi9saWIvZGV2JztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0ICogYXMgdHAgZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgd2l0aE1vY2tzLCB2ZXJpZnksIHN0dWJFbnYgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuY2hhaS5zaG91bGQoKTtcbmxldCBQID0gUHJvbWlzZTtcblxuZGVzY3JpYmUoJ2RldicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ0JpbmFyeUlzSW5QYXRoQ2hlY2snLCB3aXRoTW9ja3Moe3RwLCBmc30sIChtb2NrcykgPT4ge1xuICAgIHN0dWJFbnYoKTtcbiAgICBsZXQgY2hlY2sgPSBuZXcgQmluYXJ5SXNJblBhdGhDaGVjaygnbXZuJyk7XG4gICAgaXQoJ2F1dG9maXgnLCAoKSA9PiB7XG4gICAgICBjaGVjay5hdXRvZml4LnNob3VsZC5ub3QuYmUub2s7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gc3VjY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgIHByb2Nlc3MuZW52LlBBVEggPSAnL2EvYi9jL2Q7L2UvZi9nL2gnO1xuICAgICAgbW9ja3MudHAuZXhwZWN0cygnZXhlYycpLm9uY2UoKS5yZXR1cm5zKFxuICAgICAgICBQLnJlc29sdmUoe3N0ZG91dDogJy9hL2IvYy9kL212blxcbicsIHN0ZGVycjogJyd9KSk7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUodHJ1ZSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdtdm4gd2FzIGZvdW5kIGF0IC9hL2IvYy9kL212bidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBmYWlsdXJlIC0gbm90IGluIHBhdGggJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcHJvY2Vzcy5lbnYuUEFUSCA9ICcvYS9iL2MvZDsvZS9mL2cvaCc7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7c3Rkb3V0OiAnbXZuIG5vdCBmb3VuZFxcbicsIHN0ZGVycjonJ30pKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ212biBpcyBNSVNTSU5HIGluIFBBVEghJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUgLSBpbnZhbGlkIHBhdGgnLCBhc3luYyAoKSA9PiB7XG4gICAgICBwcm9jZXNzLmVudi5QQVRIID0gJy9hL2IvYy9kOy9lL2YvZy9oJztcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgUC5yZXNvbHZlKHtzdGRvdXQ6ICcvYS9iL2MvZC9tdm5cXG4nLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKGZhbHNlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdtdm4gd2FzIGZvdW5kIGluIFBBVEggYXQgXFwnL2EvYi9jL2QvbXZuXFwnLCAnICtcbiAgICAgICAgICAnYnV0IHRoaXMgaXMgTk9UIGEgdmFsaWQgcGF0aCEnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2ZpeCcsIGFzeW5jICgpID0+IHtcbiAgICAgIChhd2FpdCBjaGVjay5maXgoKSkuc2hvdWxkLmVxdWFsKCdNYW51YWxseSBpbnN0YWxsIHRoZSBtdm4gYmluYXJ5IGFuZCBhZGQgaXQgdG8gUEFUSC4nKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnQW5kcm9pZFNka0V4aXN0cycsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcbiAgICBzdHViRW52KCk7XG4gICAgbGV0IGNoZWNrID0gbmV3IEFuZHJvaWRTZGtFeGlzdHMoJ2FuZHJvaWQtMTYnKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLm5vdC5iZS5vaztcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gJy9hL2IvYy9kJztcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSh0cnVlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJ2FuZHJvaWQtMTYgd2FzIGZvdW5kIGF0OiAvYS9iL2MvZC9wbGF0Zm9ybXMvYW5kcm9pZC0xNidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZmFpbHVyZSAtIG1pc3NpbmcgYW5kcm9pZCBob21lJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZGVsZXRlIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ2FuZHJvaWQtMTYgY291bGQgbm90IGJlIGZvdW5kIGJlY2F1c2UgQU5EUk9JRF9IT01FIGlzIE5PVCBzZXQhJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUgLSBpbnZhbGlkIHBhdGgnLCBhc3luYyAoKSA9PiB7XG4gICAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSAnL2EvYi9jL2QnO1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKGZhbHNlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdhbmRyb2lkLTE2IGNvdWxkIE5PVCBiZSBmb3VuZCBhdCBcXCcvYS9iL2MvZC9wbGF0Zm9ybXMvYW5kcm9pZC0xNlxcJyEnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2ZpeCAtIEFORFJPSURfSE9NRScsIGFzeW5jICgpID0+IHtcbiAgICAgIGRlbGV0ZSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgY29uZmlndXJlIEFORFJPSURfSE9NRS4nKTtcbiAgICB9KTtcbiAgICBpdCgnZml4IC0gaW5zdGFsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRSA9ICcvYS9iL2MvZCc7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgaW5zdGFsbCB0aGUgYW5kcm9pZC0xNiBzZGsuJyk7XG4gICAgfSk7XG4gIH0pKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
