require('source-map-support').install();

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _index = require('../index');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

_chai2['default'].should();

describe('index', function () {
  it('should work', function () {
    _index.newDoctor.should.exists;
    _index.Doctor.should.exists;
    _index.DoctorCheck.should.exists;
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5kZXgtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FCQUUrQyxVQUFVOztvQkFDeEMsTUFBTTs7OztBQUV2QixrQkFBSyxNQUFNLEVBQUUsQ0FBQzs7QUFFZCxRQUFRLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDdEIsSUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFNO0FBQ3RCLHFCQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDeEIsa0JBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNyQix1QkFBWSxNQUFNLENBQUMsTUFBTSxDQUFDO0dBQzNCLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2luZGV4LXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHJhbnNwaWxlOm1vY2hhXG5cbmltcG9ydCB7IG5ld0RvY3RvciwgRG9jdG9yLCBEb2N0b3JDaGVjayB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuXG5jaGFpLnNob3VsZCgpO1xuXG5kZXNjcmliZSgnaW5kZXgnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICBuZXdEb2N0b3Iuc2hvdWxkLmV4aXN0cztcbiAgICBEb2N0b3Iuc2hvdWxkLmV4aXN0cztcbiAgICBEb2N0b3JDaGVjay5zaG91bGQuZXhpc3RzO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
