require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _libDemo = require('../lib/demo');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _appiumSupport = require('appium-support');

var _teen_process = require('teen_process');

var tp = _interopRequireWildcard(_teen_process);

var _libPrompt = require('../lib/prompt');

var prompt = _interopRequireWildcard(_libPrompt);

var _libLogger = require('../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _libDoctor = require('../lib/doctor');

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var P = _Promise;

describe('demo', function () {
  describe('DirCheck', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    var check = new _libDemo.DirCheck('/a/b/c/d');

    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            mocks.fs.expects('lstat').once().returns(P.resolve({ isDirectory: function isDirectory() {
                return true;
              } }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = { ok: true, message: 'Found directory at: /a/b/c/d' };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('failure - not there', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(P.resolve(false));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = { ok: false, message: 'Could NOT find directory at \'/a/b/c/d\'!' };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('failure - not a dir', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            mocks.fs.expects('lstat').once().returns(P.resolve({ isDirectory: function isDirectory() {
                return false;
              } }));
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 4:
            context$3$0.t0 = { ok: false, message: '\'/a/b/c/d\' is NOT a directory!' };
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
            context$3$0.sent.should.equal('Manually create a directory at: /a/b/c/d');

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('FileCheck', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs, tp: tp, prompt: prompt }, function (mocks, S) {
    var check = new _libDemo.FileCheck('/a/b/c/d');

    it('diagnose - success', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(P.resolve(true));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = { ok: true, message: 'Found file at: /a/b/c/d' };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('failure - not there', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(P.resolve(false));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(check.diagnose());

          case 3:
            context$3$0.t0 = { ok: false, message: 'Could NOT find file at \'/a/b/c/d\'!' };
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            (0, _appiumTestSupport.verify)(mocks);

          case 6:
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

            mocks.prompt.expects('fixIt').once().returns(P.resolve('yes'));
            mocks.tp.expects('exec').once().returns(P.resolve({ stdout: '', stderr: '' }));
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.fix());

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal('info: The following command need be executed: touch \'/a/b/c/d\'');

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

            mocks.prompt.expects('fixIt').once().returns(P.resolve('no'));
            mocks.tp.expects('exec').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(check.fix().should.be.rejectedWith(_libDoctor.FixSkippedError));

          case 5:
            (0, _appiumTestSupport.verify)(mocks);
            logStub.output.should.equal(['info: The following command need be executed: touch \'/a/b/c/d\'', 'info: Skipping you will need to touch \'/a/b/c/d\' manually.'].join('\n'));

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTSxDQUFDLEtBQUssQ0FBQyxDQUMxQixrRUFBa0UsRUFDbEUsOERBQThELENBQy9ELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FDZixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2RlbW8tc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bW9jaGFcblxuaW1wb3J0IHsgRGlyQ2hlY2ssIEZpbGVDaGVjayB9IGZyb20gJy4uL2xpYi9kZW1vJztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgKiBhcyB0cCBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcHJvbXB0IGZyb20gJy4uL2xpYi9wcm9tcHQnO1xuaW1wb3J0IGxvZyBmcm9tICcuLi9saWIvbG9nZ2VyJztcbmltcG9ydCB7IEZpeFNraXBwZWRFcnJvciB9IGZyb20gJy4uL2xpYi9kb2N0b3InO1xuaW1wb3J0IHsgd2l0aE1vY2tzLCB2ZXJpZnksIHN0dWJMb2cgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcbmxldCBQID0gUHJvbWlzZTtcblxuZGVzY3JpYmUoJ2RlbW8nLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdEaXJDaGVjaycsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcbiAgICBsZXQgY2hlY2sgPSBuZXcgRGlyQ2hlY2soJy9hL2IvYy9kJyk7XG5cbiAgICBpdCgnZGlhZ25vc2UgLSBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHRydWUpKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2xzdGF0Jykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7aXNEaXJlY3Rvcnk6ICgpID0+IHsgcmV0dXJuIHRydWU7IH19KSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoXG4gICAgICAgIHsgb2s6IHRydWUsIG1lc3NhZ2U6ICdGb3VuZCBkaXJlY3RvcnkgYXQ6IC9hL2IvYy9kJyB9KTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmFpbHVyZSAtIG5vdCB0aGVyZScsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZShmYWxzZSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKFxuICAgICAgICB7IG9rOiBmYWxzZSwgbWVzc2FnZTogJ0NvdWxkIE5PVCBmaW5kIGRpcmVjdG9yeSBhdCBcXCcvYS9iL2MvZFxcJyEnIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcblxuICAgIGl0KCdmYWlsdXJlIC0gbm90IGEgZGlyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnZXhpc3RzJykub25jZSgpLnJldHVybnMoUC5yZXNvbHZlKHRydWUpKTtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2xzdGF0Jykub25jZSgpLnJldHVybnMoXG4gICAgICAgIFAucmVzb2x2ZSh7aXNEaXJlY3Rvcnk6ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9fSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmRpYWdub3NlKCkpLnNob3VsZC5kZWVwLmVxdWFsKFxuICAgICAgICB7IG9rOiBmYWxzZSwgbWVzc2FnZTogJ1xcJy9hL2IvYy9kXFwnIGlzIE5PVCBhIGRpcmVjdG9yeSEnIH0pO1xuICAgICAgdmVyaWZ5KG1vY2tzKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXgnLCBhc3luYyAoKSA9PiB7XG4gICAgICAoYXdhaXQgY2hlY2suZml4KCkpLnNob3VsZC5lcXVhbCgnTWFudWFsbHkgY3JlYXRlIGEgZGlyZWN0b3J5IGF0OiAvYS9iL2MvZCcpO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUoJ0ZpbGVDaGVjaycsIHdpdGhNb2Nrcyh7ZnMsIHRwLCBwcm9tcHR9LCAobW9ja3MsIFMpID0+IHtcbiAgICBsZXQgY2hlY2sgPSBuZXcgRmlsZUNoZWNrKCcvYS9iL2MvZCcpO1xuXG4gICAgaXQoJ2RpYWdub3NlIC0gc3VjY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSh0cnVlKSk7XG4gICAgICAoYXdhaXQgY2hlY2suZGlhZ25vc2UoKSkuc2hvdWxkLmRlZXAuZXF1YWwoXG4gICAgICAgIHsgb2s6IHRydWUsIG1lc3NhZ2U6ICdGb3VuZCBmaWxlIGF0OiAvYS9iL2MvZCcgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZhaWx1cmUgLSBub3QgdGhlcmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoZmFsc2UpKTtcbiAgICAgIChhd2FpdCBjaGVjay5kaWFnbm9zZSgpKS5zaG91bGQuZGVlcC5lcXVhbChcbiAgICAgICAgeyBvazogZmFsc2UsIG1lc3NhZ2U6ICdDb3VsZCBOT1QgZmluZCBmaWxlIGF0IFxcJy9hL2IvYy9kXFwnIScgfSk7XG4gICAgICB2ZXJpZnkobW9ja3MpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpeCAtIHllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBsb2dTdHViID0gc3R1YkxvZyhTLnNhbmRib3gsIGxvZywge3N0cmlwQ29sb3JzOiB0cnVlfSk7XG4gICAgICBtb2Nrcy5wcm9tcHQuZXhwZWN0cygnZml4SXQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoJ3llcycpKTtcbiAgICAgIG1vY2tzLnRwLmV4cGVjdHMoJ2V4ZWMnKS5vbmNlKCkucmV0dXJucyhcbiAgICAgICAgUC5yZXNvbHZlKHtzdGRvdXQ6ICcnLCBzdGRlcnI6ICcnfSkpO1xuICAgICAgKGF3YWl0IGNoZWNrLmZpeCgpKTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgICBsb2dTdHViLm91dHB1dC5zaG91bGQuZXF1YWwoJ2luZm86IFRoZSBmb2xsb3dpbmcgY29tbWFuZCBuZWVkIGJlIGV4ZWN1dGVkOiB0b3VjaCBcXCcvYS9iL2MvZFxcJycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpeCAtIG5vJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGxvZ1N0dWIgPSBzdHViTG9nKFMuc2FuZGJveCwgbG9nLCB7c3RyaXBDb2xvcnM6IHRydWV9KTtcbiAgICAgIG1vY2tzLnByb21wdC5leHBlY3RzKCdmaXhJdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZSgnbm8nKSk7XG4gICAgICBtb2Nrcy50cC5leHBlY3RzKCdleGVjJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGNoZWNrLmZpeCgpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoRml4U2tpcHBlZEVycm9yKTtcbiAgICAgIHZlcmlmeShtb2Nrcyk7XG4gICAgICBsb2dTdHViLm91dHB1dC5zaG91bGQuZXF1YWwoW1xuICAgICAgICAnaW5mbzogVGhlIGZvbGxvd2luZyBjb21tYW5kIG5lZWQgYmUgZXhlY3V0ZWQ6IHRvdWNoIFxcJy9hL2IvYy9kXFwnJyxcbiAgICAgICAgJ2luZm86IFNraXBwaW5nIHlvdSB3aWxsIG5lZWQgdG8gdG91Y2ggXFwnL2EvYi9jL2RcXCcgbWFudWFsbHkuJ1xuICAgICAgXS5qb2luKCdcXG4nKSk7XG4gICAgfSk7XG4gIH0pKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
