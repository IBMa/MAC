'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer2 = require('inquirer');

var _inquirer3 = _interopRequireDefault(_inquirer2);

var _libLogger = require('../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _authorizeIos = require('authorize-ios');

var _authorizeIos2 = _interopRequireDefault(_authorizeIos);

var pkgRoot = process.env.NO_PRECOMPILE ? _path2['default'].resolve(__dirname, '..') : _path2['default'].resolve(__dirname, '..', '..');

var ok = function ok(message) {
  return { ok: true, message: message };
};
var nok = function nok(message) {
  return { ok: false, message: message };
};

var inquirer = {
  prompt: _bluebird2['default'].promisify(function (question, cb) {
    _inquirer3['default'].prompt(question, function (resp) {
      cb(null, resp);
    });
  })
};

function configureBinaryLog(opts) {
  var actualLog = _libLogger2['default'].unwrap().log;
  _libLogger2['default'].unwrap().log = function (level, prefix, msg) {
    var l = this.levels[level];
    if (l < this.levels[this.level]) return;
    actualLog(level, prefix, msg);
  };
  _libLogger2['default'].level = opts.debug ? 'debug' : 'info';
}

exports.pkgRoot = pkgRoot;
exports.ok = ok;
exports.nok = nok;
exports.inquirer = inquirer;
exports.configureBinaryLog = configureBinaryLog;
exports.authorize = _authorizeIos2['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozt3QkFBYyxVQUFVOzs7O29CQUNQLE1BQU07Ozs7eUJBQ0QsVUFBVTs7Ozt5QkFDaEIsZUFBZTs7Ozs0QkFDVCxlQUFlOzs7O0FBRXJDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUNyQyxrQkFBSyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV0RSxJQUFJLEVBQUUsR0FBRyxTQUFMLEVBQUUsQ0FBSSxPQUFPLEVBQUs7QUFBRSxTQUFPLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFDLENBQUM7Q0FBRSxDQUFDO0FBQ3RELElBQUksR0FBRyxHQUFHLFNBQU4sR0FBRyxDQUFJLE9BQU8sRUFBSztBQUFFLFNBQU8sRUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUMsQ0FBQztDQUFFLENBQUM7O0FBRXhELElBQUksUUFBUSxHQUFHO0FBQ2IsUUFBTSxFQUFFLHNCQUFFLFNBQVMsQ0FBQyxVQUFVLFFBQVEsRUFBRSxFQUFFLEVBQUU7QUFDMUMsMEJBQVUsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLElBQUksRUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FBRSxDQUFDLENBQUM7R0FDakUsQ0FBQztDQUNILENBQUM7O0FBRUYsU0FBUyxrQkFBa0IsQ0FBRSxJQUFJLEVBQUU7QUFDakMsTUFBSSxTQUFTLEdBQUcsdUJBQUksTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ2pDLHlCQUFJLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQy9DLFFBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsUUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTztBQUN4QyxhQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztHQUMvQixDQUFDO0FBQ0YseUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztDQUMzQzs7UUFFUSxPQUFPLEdBQVAsT0FBTztRQUFFLEVBQUUsR0FBRixFQUFFO1FBQUUsR0FBRyxHQUFILEdBQUc7UUFBRSxRQUFRLEdBQVIsUUFBUTtRQUFFLGtCQUFrQixHQUFsQixrQkFBa0I7UUFBRSxTQUFTIiwiZmlsZSI6ImxpYi91dGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF9pbnF1aXJlciBmcm9tICdpbnF1aXJlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xpYi9sb2dnZXInO1xuaW1wb3J0IGF1dGhvcml6ZSBmcm9tICdhdXRob3JpemUtaW9zJztcblxubGV0IHBrZ1Jvb3QgPSBwcm9jZXNzLmVudi5OT19QUkVDT01QSUxFID9cbiAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJykgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nKTtcblxubGV0IG9rID0gKG1lc3NhZ2UpID0+IHsgcmV0dXJuIHtvazogdHJ1ZSwgbWVzc2FnZX07IH07XG5sZXQgbm9rID0gKG1lc3NhZ2UpID0+IHsgcmV0dXJuIHtvazogZmFsc2UsIG1lc3NhZ2V9OyB9O1xuXG5sZXQgaW5xdWlyZXIgPSB7XG4gIHByb21wdDogQi5wcm9taXNpZnkoZnVuY3Rpb24gKHF1ZXN0aW9uLCBjYikge1xuICAgIF9pbnF1aXJlci5wcm9tcHQocXVlc3Rpb24sIGZ1bmN0aW9uIChyZXNwKSB7IGNiKG51bGwsIHJlc3ApOyB9KTtcbiAgfSlcbn07XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZUJpbmFyeUxvZyAob3B0cykge1xuICBsZXQgYWN0dWFsTG9nID0gbG9nLnVud3JhcCgpLmxvZztcbiAgbG9nLnVud3JhcCgpLmxvZyA9IGZ1bmN0aW9uIChsZXZlbCwgcHJlZml4LCBtc2cpIHtcbiAgICBsZXQgbCA9IHRoaXMubGV2ZWxzW2xldmVsXTtcbiAgICBpZiAobCA8IHRoaXMubGV2ZWxzW3RoaXMubGV2ZWxdKSByZXR1cm47XG4gICAgYWN0dWFsTG9nKGxldmVsLCBwcmVmaXgsIG1zZyk7XG4gIH07XG4gIGxvZy5sZXZlbCA9IG9wdHMuZGVidWcgPyAnZGVidWcnIDogJ2luZm8nO1xufVxuXG5leHBvcnQgeyBwa2dSb290LCBvaywgbm9rLCBpbnF1aXJlciwgY29uZmlndXJlQmluYXJ5TG9nLCBhdXRob3JpemUgfTtcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
