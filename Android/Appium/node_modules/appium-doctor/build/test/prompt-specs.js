require('source-map-support').install();

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _libPrompt = require('../lib/prompt');

var _libUtils = require('../lib/utils');

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].should();
var P = _Promise;

describe('prompt', (0, _appiumTestSupport.withMocks)({ inquirer: _libUtils.inquirer }, function (mocks) {

  it('fixit - yes', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _libPrompt.clear)();
          mocks.inquirer.expects('prompt').once().returns(P.resolve({ confirmation: 'yes' }));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 4:
          context$2$0.sent.should.equal('yes');

          (0, _appiumTestSupport.verify)(mocks);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('fixit always ', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _libPrompt.clear)();
          mocks.inquirer.expects('prompt').once().returns(P.resolve({ confirmation: 'always' }));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 4:
          context$2$0.sent.should.equal('yes');
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 7:
          context$2$0.sent.should.equal('yes');
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 10:
          context$2$0.sent.should.equal('yes');

          (0, _appiumTestSupport.verify)(mocks);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('fixit never ', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          (0, _libPrompt.clear)();
          mocks.inquirer.expects('prompt').once().returns(P.resolve({ confirmation: 'never' }));
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 4:
          context$2$0.sent.should.equal('no');
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 7:
          context$2$0.sent.should.equal('no');
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap((0, _libPrompt.fixIt)());

        case 10:
          context$2$0.sent.should.equal('no');

          (0, _appiumTestSupport.verify)(mocks);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcHJvbXB0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFFaUIsTUFBTTs7Ozt5QkFDTSxlQUFlOzt3QkFDbkIsY0FBYzs7aUNBQ0wscUJBQXFCOztBQUV2RCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLElBQUksQ0FBQyxXQUFVLENBQUM7O0FBRWhCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsa0NBQVUsRUFBQyxRQUFRLG9CQUFBLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSzs7QUFFbEQsSUFBRSxDQUFDLGFBQWEsRUFBRTs7OztBQUNoQixpQ0FBTyxDQUFDO0FBQ1IsZUFBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQ3ZELEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzs7MkNBQ3JCLHVCQUFPOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOztBQUNsQyx5Q0FBTyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUNmLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsZUFBZSxFQUFFOzs7O0FBQ2xCLGlDQUFPLENBQUM7QUFDUixlQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDdkQsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDOzsyQ0FDeEIsdUJBQU87OzsyQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7OzJDQUMzQix1QkFBTzs7OzJCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSzs7MkNBQzNCLHVCQUFPOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLOztBQUNsQyx5Q0FBTyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUNmLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsY0FBYyxFQUFFOzs7O0FBQ2pCLGlDQUFPLENBQUM7QUFDUixlQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDdkQsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzsyQ0FDdkIsdUJBQU87OzsyQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7OzJDQUMxQix1QkFBTzs7OzJCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTs7MkNBQzFCLHVCQUFPOzs7MkJBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJOztBQUNqQyx5Q0FBTyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUNmLENBQUMsQ0FBQztDQUdKLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvcHJvbXB0LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgZml4SXQsIGNsZWFyIH0gZnJvbSAnLi4vbGliL3Byb21wdCc7XG5pbXBvcnQgeyBpbnF1aXJlciB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5pbXBvcnQgeyB3aXRoTW9ja3MsIHZlcmlmeSB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuXG5jaGFpLnNob3VsZCgpO1xubGV0IFAgPSBQcm9taXNlO1xuXG5kZXNjcmliZSgncHJvbXB0Jywgd2l0aE1vY2tzKHtpbnF1aXJlcn0sIChtb2NrcykgPT4ge1xuXG4gIGl0KCdmaXhpdCAtIHllcycsIGFzeW5jICgpID0+IHtcbiAgICBjbGVhcigpO1xuICAgIG1vY2tzLmlucXVpcmVyLmV4cGVjdHMoJ3Byb21wdCcpLm9uY2UoKS5yZXR1cm5zKFAucmVzb2x2ZShcbiAgICAgIHsgY29uZmlybWF0aW9uOiAneWVzJyB9KSk7XG4gICAgKGF3YWl0IGZpeEl0KCkpLnNob3VsZC5lcXVhbCgneWVzJyk7XG4gICAgdmVyaWZ5KG1vY2tzKTtcbiAgfSk7XG5cbiAgaXQoJ2ZpeGl0IGFsd2F5cyAnLCBhc3luYyAoKSA9PiB7XG4gICAgY2xlYXIoKTtcbiAgICBtb2Nrcy5pbnF1aXJlci5leHBlY3RzKCdwcm9tcHQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoXG4gICAgICB7IGNvbmZpcm1hdGlvbjogJ2Fsd2F5cycgfSkpO1xuICAgIChhd2FpdCBmaXhJdCgpKS5zaG91bGQuZXF1YWwoJ3llcycpO1xuICAgIChhd2FpdCBmaXhJdCgpKS5zaG91bGQuZXF1YWwoJ3llcycpO1xuICAgIChhd2FpdCBmaXhJdCgpKS5zaG91bGQuZXF1YWwoJ3llcycpO1xuICAgIHZlcmlmeShtb2Nrcyk7XG4gIH0pO1xuXG4gIGl0KCdmaXhpdCBuZXZlciAnLCBhc3luYyAoKSA9PiB7XG4gICAgY2xlYXIoKTtcbiAgICBtb2Nrcy5pbnF1aXJlci5leHBlY3RzKCdwcm9tcHQnKS5vbmNlKCkucmV0dXJucyhQLnJlc29sdmUoXG4gICAgICB7IGNvbmZpcm1hdGlvbjogJ25ldmVyJyB9KSk7XG4gICAgKGF3YWl0IGZpeEl0KCkpLnNob3VsZC5lcXVhbCgnbm8nKTtcbiAgICAoYXdhaXQgZml4SXQoKSkuc2hvdWxkLmVxdWFsKCdubycpO1xuICAgIChhd2FpdCBmaXhJdCgpKS5zaG91bGQuZXF1YWwoJ25vJyk7XG4gICAgdmVyaWZ5KG1vY2tzKTtcbiAgfSk7XG5cblxufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
