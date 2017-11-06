require('source-map-support').install();

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libUtils = require('../lib/utils');

var _appiumSupport = require('appium-support');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

_chai2['default'].should();

describe('utils', function () {

  it('fs.readFile', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(_libUtils.pkgRoot, 'test', 'fixtures', 'wow.txt'), 'utf8'));

        case 2:
          context$2$0.sent.should.include('WOW');

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('fs.exists', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(_path2['default'].resolve(_libUtils.pkgRoot, 'test', 'fixtures', 'wow.txt')));

        case 2:
          context$2$0.sent.should.be.ok;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(_path2['default'].resolve(_libUtils.pkgRoot, 'test', 'fixtures', 'notwow.txt')));

        case 5:
          context$2$0.sent.should.not.be.ok;

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdXRpbC1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3dCQUV3QixjQUFjOzs2QkFDbkIsZ0JBQWdCOztvQkFDbEIsTUFBTTs7OztvQkFDTixNQUFNOzs7O0FBRXZCLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUVkLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBTTs7QUFFdEIsSUFBRSxDQUFDLGFBQWEsRUFBRTs7Ozs7MkNBQ1Qsa0JBQUcsUUFBUSxDQUFDLGtCQUFLLE9BQU8sb0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFDekQsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLOzs7Ozs7O0dBQzVDLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsV0FBVyxFQUFFOzs7OzsyQ0FDUCxrQkFBRyxNQUFNLENBQUMsa0JBQUssT0FBTyxvQkFBVSxNQUFNLEVBQUUsVUFBVSxFQUN2RCxTQUFTLENBQUMsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTs7MkNBQ3BCLGtCQUFHLE1BQU0sQ0FBQyxrQkFBSyxPQUFPLG9CQUFVLE1BQU0sRUFBRSxVQUFVLEVBQ3ZELFlBQVksQ0FBQyxDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7Ozs7OztHQUNuQyxDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91dGlsLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IHBrZ1Jvb3QgfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jaGFpLnNob3VsZCgpO1xuXG5kZXNjcmliZSgndXRpbHMnLCAoKSA9PiB7XG5cbiAgaXQoJ2ZzLnJlYWRGaWxlJywgYXN5bmMgKCkgPT4ge1xuICAgIChhd2FpdCBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUocGtnUm9vdCwgJ3Rlc3QnLCAnZml4dHVyZXMnLFxuICAgICAgJ3dvdy50eHQnKSwgJ3V0ZjgnKSkuc2hvdWxkLmluY2x1ZGUoJ1dPVycpO1xuICB9KTtcblxuICBpdCgnZnMuZXhpc3RzJywgYXN5bmMgKCkgPT4ge1xuICAgIChhd2FpdCBmcy5leGlzdHMocGF0aC5yZXNvbHZlKHBrZ1Jvb3QsICd0ZXN0JywgJ2ZpeHR1cmVzJyxcbiAgICAgICd3b3cudHh0JykpKS5zaG91bGQuYmUub2s7XG4gICAgKGF3YWl0IGZzLmV4aXN0cyhwYXRoLnJlc29sdmUocGtnUm9vdCwgJ3Rlc3QnLCAnZml4dHVyZXMnLFxuICAgICAgJ25vdHdvdy50eHQnKSkpLnNob3VsZC5ub3QuYmUub2s7XG4gIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
