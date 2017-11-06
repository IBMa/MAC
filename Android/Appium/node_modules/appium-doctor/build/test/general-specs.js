require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libGeneral = require('../lib/general');

var _teen_process = require('teen_process');

var tp = _interopRequireWildcard(_teen_process);

var _libNodeDetector = require('../lib/node-detector');

var _libNodeDetector2 = _interopRequireDefault(_libNodeDetector);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var P = _Promise;

describe('general', function () {
  describe('NodeBinaryCheck', (0, _appiumTestSupport.withMocks)({ NodeDetector: _libNodeDetector2['default'] }, function (mocks) {
    var check = new _libGeneral.NodeBinaryCheck();
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.NodeDetector.expects('detect').once().returns(P.resolve('/a/b/c/d'));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: true,
              message: 'The Node.js binary was found at: /a/b/c/d'
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
            mocks.NodeDetector.expects('detect').once().returns(P.resolve(null));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = {
              ok: false,
              message: 'The Node.js binary was NOT found!'
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
            context$3$0.sent.should.equal('Manually setup Node.js.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('NodeVersionCheck', (0, _appiumTestSupport.withMocks)({ NodeDetector: _libNodeDetector2['default'], tp: tp }, function (mocks) {
    var check = new _libGeneral.NodeVersionCheck();
    it('autofix', function () {
      check.autofix.should.not.be.ok;
    });
    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.NodeDetector.expects('detect').once().returns(P.resolve('/a/b/c/d'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: 'v4.5.6', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: true,
              message: 'Node version is 4.5.6'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - insufficient version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.NodeDetector.expects('detect').once().returns(P.resolve('/a/b/c/d'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: 'v0.12.18', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'Node version should be at least 4!'
            };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('diagnose - failure - bad output', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.NodeDetector.expects('detect').once().returns(P.resolve('/a/b/c/d'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: 'blahblahblah', stderr: '' }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = {
              ok: false,
              message: 'Unable to find node version (version = \'blahblahblah\')'
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
            context$3$0.sent.should.equal('Manually upgrade Node.js.');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDOzs2Q0FDbEYsS0FBSyxDQUFDLFFBQVEsRUFBRTs7OzZCQUFvQjtBQUN6QyxnQkFBRSxFQUFFLEtBQUs7QUFDVCxxQkFBTyw0REFBMEQ7YUFDbEU7NkJBSHdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSzs7QUFJMUMsMkNBQU8sS0FBSyxDQUFDLENBQUM7Ozs7Ozs7S0FDZixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsS0FBSyxFQUFFOzs7Ozs2Q0FDRCxLQUFLLENBQUMsR0FBRyxFQUFFOzs7NkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkI7Ozs7Ozs7S0FDN0QsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9nZW5lcmFsLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IE5vZGVCaW5hcnlDaGVjaywgTm9kZVZlcnNpb25DaGVjayB9IGZyb20gJy4uL2xpYi9nZW5lcmFsJztcbmltcG9ydCAqIGFzIHRwIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgTm9kZURldGVjdG9yIGZyb20gJy4uL2xpYi9ub2RlLWRldGVjdG9yJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgd2l0aE1vY2tzLCB2ZXJpZnkgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xubGV0IFAgPSBQcm9taXNlO1xuXG5kZXNjcmliZSgnZ2VuZXJhbCcsICgpID0+IHtcbiAgZGVzY3JpYmUoJ05vZGVCaW5hcnlDaGVjaycsIHdpdGhNb2Nrcyh7Tm9kZURldGVjdG9yfSwgKG1vY2tzKSA9PiB7XG4gICAgbGV0IGNoZWNrID0gbmV3IE5vZGVCaW5hcnlDaGVjaygpO1xuICAgIGl0KCdhdXRvZml4JywgKCkgPT4ge1xuICAgICAgY2hlY2suYXV0b2ZpeC5zaG91bGQubm90LmJlLm9rO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIHN1Y2Nlc3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5Ob2RlRGV0ZWN0b3IuZXhwZWN0cygnZGV0ZWN0Jykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKCcvYS9iL2MvZCcpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbCh7XG4gICAgICAgIG9rOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIE5vZGUuanMgYmluYXJ5IHdhcyBmb3VuZCBhdDogL2EvYi9jL2QnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLk5vZGVEZXRlY3Rvci5leHBlY3RzKCdkZXRlY3QnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUobnVsbCkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIE5vZGUuanMgYmluYXJ5IHdhcyBOT1QgZm91bmQhJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgc2V0dXAgTm9kZS5qcy4nKTtcbiAgICB9KTtcbiAgfSkpO1xuXG4gIGRlc2NyaWJlKCdOb2RlVmVyc2lvbkNoZWNrJywgd2l0aE1vY2tzKHtOb2RlRGV0ZWN0b3IsIHRwfSwgKG1vY2tzKSA9PiB7XG4gICAgbGV0IGNoZWNrID0gbmV3IE5vZGVWZXJzaW9uQ2hlY2soKTtcbiAgICBpdCgnYXV0b2ZpeCcsICgpID0+IHtcbiAgICAgIGNoZWNrLmF1dG9maXguc2hvdWxkLm5vdC5iZS5vaztcbiAgICB9KTtcbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ2RldGVjdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnL2EvYi9jL2QnKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHtzdGRvdXQ6ICd2NC41LjYnLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICdOb2RlIHZlcnNpb24gaXMgNC41LjYnXG4gICAgICB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG4gICAgaXQoJ2RpYWdub3NlIC0gZmFpbHVyZSAtIGluc3VmZmljaWVudCB2ZXJzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ2RldGVjdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnL2EvYi9jL2QnKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHtzdGRvdXQ6ICd2MC4xMi4xOCcsIHN0ZGVycjogJyd9KSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoe1xuICAgICAgICBvazogZmFsc2UsXG4gICAgICAgIG1lc3NhZ2U6ICdOb2RlIHZlcnNpb24gc2hvdWxkIGJlIGF0IGxlYXN0IDQhJ1xuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdkaWFnbm9zZSAtIGZhaWx1cmUgLSBiYWQgb3V0cHV0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuTm9kZURldGVjdG9yLmV4cGVjdHMoJ2RldGVjdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnL2EvYi9jL2QnKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHtzdGRvdXQ6ICdibGFoYmxhaGJsYWgnLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtZXNzYWdlOiBgVW5hYmxlIHRvIGZpbmQgbm9kZSB2ZXJzaW9uICh2ZXJzaW9uID0gJ2JsYWhibGFoYmxhaCcpYFxuICAgICAgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuICAgIGl0KCdmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgdXBncmFkZSBOb2RlLmpzLicpO1xuICAgIH0pO1xuICB9KSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
