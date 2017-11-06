require('source-map-support').install();

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _libFactory = require('../lib/factory');

var _libFactory2 = _interopRequireDefault(_libFactory);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('factory', function () {
  var _arr = [{ 'ios': true }, { 'android': true }, { 'dev': true }];

  var _loop = function () {
    var config = _arr[_i];
    it('should work for ' + config, function () {
      var doctor = (0, _libFactory2['default'])(config);
      doctor.should.exists;
      doctor.checks.should.have.length.above(0);
    });
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZmFjdG9yeS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7MEJBRXNCLGdCQUFnQjs7OztvQkFDckIsTUFBTTs7OztBQUV2QixrQkFBSyxNQUFNLEVBQUUsQ0FBQzs7QUFFZCxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07YUFDTCxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDOzs7QUFBL0QsUUFBSSxNQUFNLFdBQUEsQ0FBQTtBQUNiLE1BQUUsQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLEVBQUUsWUFBTTtBQUNwQyxVQUFJLE1BQU0sR0FBRyw2QkFBVSxNQUFNLENBQUMsQ0FBQztBQUMvQixZQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNyQixZQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQyxDQUFDLENBQUM7OztBQUxMLDJDQUFzRTs7R0FNckU7Q0FDRixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mYWN0b3J5LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCBuZXdEb2N0b3IgZnJvbSAnLi4vbGliL2ZhY3RvcnknO1xuaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5cbmNoYWkuc2hvdWxkKCk7XG5cbmRlc2NyaWJlKCdmYWN0b3J5JywgKCkgPT4ge1xuICBmb3IgKGxldCBjb25maWcgb2YgW3snaW9zJzogdHJ1ZX0sIHsnYW5kcm9pZCc6IHRydWV9LCB7J2Rldic6IHRydWV9XSkge1xuICAgIGl0KCdzaG91bGQgd29yayBmb3IgJyArIGNvbmZpZywgKCkgPT4ge1xuICAgICAgbGV0IGRvY3RvciA9IG5ld0RvY3Rvcihjb25maWcpO1xuICAgICAgZG9jdG9yLnNob3VsZC5leGlzdHM7XG4gICAgICBkb2N0b3IuY2hlY2tzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
