require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libAndroid = require('../lib/android');

var _appiumSupport = require('appium-support');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
var P = _Promise;

describe('android', function () {
  describe('EnvVarAndPathCheck', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    (0, _appiumTestSupport.stubEnv)();
    var check = new _libAndroid.EnvVarAndPathCheck('ANDROID_HOME');
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
              message: 'ANDROID_HOME is set to: /a/b/c/d'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('failure - not set', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            delete process.env.ANDROID_HOME;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'ANDROID_HOME is NOT set!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('failure - file not exists', function callee$2$0() {
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
              message: 'ANDROID_HOME is set to \'/a/b/c/d\' ' + 'but this is NOT a valid path!'
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
            context$3$0.sent.should.equal('Manually configure ANDROID_HOME.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('AndroidToolCheck', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    (0, _appiumTestSupport.stubEnv)();
    var check = new _libAndroid.AndroidToolCheck('adb', 'platform-tools/adb');
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
              message: 'adb exists at: /a/b/c/d/platform-tools/adb'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - no ANDROID_HOME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            delete process.env.ANDROID_HOME;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'adb could not be found because ANDROID_HOME is NOT set!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - path not valid', function callee$2$0() {
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
              message: 'adb could NOT be found at \'/a/b/c/d/platform-tools/adb\'!'
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
            context$3$0.t0 = 'Manually configure ANDROID_HOME ' + 'and run appium-doctor again.';
            context$3$0.sent.should.equal(context$3$0.t0);

          case 5:
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
            context$3$0.sent.should.equal('Manually install adb and add it to PATH.');

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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SztBQUNULHFCQUFPLEVBQUUsNERBQTREO2FBQ3RFOzZCQUh3QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUs7O0FBSTFDLDJDQUFPLEtBQUssQ0FBQyxDQUFDOzs7Ozs7O0tBQ2YsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG9CQUFvQixFQUFFOzs7O0FBQ3ZCLG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDOzs2Q0FDekIsS0FBSyxDQUFDLEdBQUcsRUFBRTs7OzZCQUFlLGtDQUFrQyxHQUNqRSw4QkFBOEI7NkJBRFosTUFBTSxDQUFDLEtBQUs7Ozs7Ozs7S0FFakMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGVBQWUsRUFBRTs7OztBQUNsQixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDOzs2Q0FDL0IsS0FBSyxDQUFDLEdBQUcsRUFBRTs7OzZCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsMENBQTBDOzs7Ozs7O0tBQzVFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvYW5kcm9pZC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRyYW5zcGlsZTptb2NoYVxuXG5pbXBvcnQgeyBFbnZWYXJBbmRQYXRoQ2hlY2ssIEFuZHJvaWRUb29sQ2hlY2sgfSBmcm9tICcuLi9saWIvYW5kcm9pZCc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgd2l0aE1vY2tzLCB2ZXJpZnksIHN0dWJFbnYgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuY2hhaS5zaG91bGQoKTtcbmxldCBQID0gUHJvbWlzZTtcblxuZGVzY3JpYmUoJ2FuZHJvaWQnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdFbnZWYXJBbmRQYXRoQ2hlY2snLCB3aXRoTW9ja3Moe2ZzfSwgKG1vY2tzKSA9PiB7XG4gICAgc3R1YkVudigpO1xuICAgIGxldCBjaGVjayA9IG5ldyBFbnZWYXJBbmRQYXRoQ2hlY2soJ0FORFJPSURfSE9NRScpO1xuICAgIGl0KCdhdXRvZml4JywgKCkgPT4ge1xuICAgICAgY2hlY2suYXV0b2ZpeC5zaG91bGQubm90LmJlLm9rO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSAnL2EvYi9jL2QnO1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHRydWUpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAnQU5EUk9JRF9IT01FIGlzIHNldCB0bzogL2EvYi9jL2QnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2ZhaWx1cmUgLSBub3Qgc2V0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgZGVsZXRlIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ0FORFJPSURfSE9NRSBpcyBOT1Qgc2V0ISdcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZmFpbHVyZSAtIGZpbGUgbm90IGV4aXN0cycsIGFzeW5jICgpID0+IHtcbiAgICAgIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRSA9ICcvYS9iL2MvZCc7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoZmFsc2UpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ0FORFJPSURfSE9NRSBpcyBzZXQgdG8gXFwnL2EvYi9jL2RcXCcgJyArXG4gICAgICAgICAgJ2J1dCB0aGlzIGlzIE5PVCBhIHZhbGlkIHBhdGghJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgY29uZmlndXJlIEFORFJPSURfSE9NRS4nKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnQW5kcm9pZFRvb2xDaGVjaycsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcbiAgICBzdHViRW52KCk7XG4gICAgbGV0IGNoZWNrID0gbmV3IEFuZHJvaWRUb29sQ2hlY2soJ2FkYicsICdwbGF0Zm9ybS10b29scy9hZGInKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLm5vdC5iZS5vaztcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gJy9hL2IvYy9kJztcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSh0cnVlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJ2FkYiBleGlzdHMgYXQ6IC9hL2IvYy9kL3BsYXRmb3JtLXRvb2xzL2FkYidcbiAgICAgIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBmYWlsdXJlIC0gbm8gQU5EUk9JRF9IT01FJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZGVsZXRlIHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbWVzc2FnZTogJ2FkYiBjb3VsZCBub3QgYmUgZm91bmQgYmVjYXVzZSBBTkRST0lEX0hPTUUgaXMgTk9UIHNldCEnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIHBhdGggbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gJy9hL2IvYy9kJztcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZShmYWxzZSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnYWRiIGNvdWxkIE5PVCBiZSBmb3VuZCBhdCBcXCcvYS9iL2MvZC9wbGF0Zm9ybS10b29scy9hZGJcXCchJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdmaXggLSBBTkRST0lEX0hPTUUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkZWxldGUgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FO1xuICAgICAgKGF3YWl0IGNoZWNrLmZpeCgpKS5zaG91bGQuZXF1YWwoJ01hbnVhbGx5IGNvbmZpZ3VyZSBBTkRST0lEX0hPTUUgJyArXG4gICAgICAgICdhbmQgcnVuIGFwcGl1bS1kb2N0b3IgYWdhaW4uJyk7XG4gICAgfSk7XG4gICAgaXQoJ2ZpeCAtIGluc3RhbGwnLCBhc3luYyAoKSA9PiB7XG4gICAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSAnL2EvYi9jL2QnO1xuICAgICAgKGF3YWl0IGNoZWNrLmZpeCgpKS5zaG91bGQuZXF1YWwoJ01hbnVhbGx5IGluc3RhbGwgYWRiIGFuZCBhZGQgaXQgdG8gUEFUSC4nKTtcbiAgICB9KTtcbiAgfSkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
