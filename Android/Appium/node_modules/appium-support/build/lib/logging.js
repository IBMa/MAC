'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// levels that are available from `npmlog`
var NPM_LEVELS = ['silly', 'verbose', 'debug', 'info', 'http', 'warn', 'error'];
var MAX_LOG_RECORDS_COUNT = 3000;

// mock log object used in testing mode
var mockLog = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _getIterator(NPM_LEVELS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var level = _step.value;

    mockLog[level] = function () {};
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator['return']) {
      _iterator['return']();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function patchLogger(logger) {
  if (!logger.debug) {
    logger.addLevel('debug', 1000, { fg: 'blue', bg: 'black' }, 'dbug');
  }
}

function _getLogger() {
  // check if the user set the `_TESTING` or `_FORCE_LOGS` flag
  var testingMode = parseInt(process.env._TESTING, 10) === 1;
  var forceLogMode = parseInt(process.env._FORCE_LOGS, 10) === 1;

  // if is possible that there is a logger instance that is already around,
  // in which case we want t o use that
  var usingGlobalLog = !!global._global_npmlog;
  var logger = undefined;
  if (testingMode && !forceLogMode) {
    // in testing mode, use a mock logger object that we can query
    logger = mockLog;
  } else {
    // otherwise, either use the global, or a new `npmlog` object
    logger = global._global_npmlog || _npmlog2['default'];
    // The default value is 10000, which causes excessive memory usage
    logger.maxRecordSize = MAX_LOG_RECORDS_COUNT;
  }
  patchLogger(logger);
  return [logger, usingGlobalLog];
}

function getLogger() {
  var prefix = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  var _getLogger2 = _getLogger();

  var _getLogger22 = _slicedToArray(_getLogger2, 2);

  var logger = _getLogger22[0];
  var usingGlobalLog = _getLogger22[1];

  // wrap the logger so that we can catch and modify any logging
  var wrappedLogger = { unwrap: function unwrap() {
      return logger;
    } };

  // allow access to the level of the underlying logger
  Object.defineProperty(wrappedLogger, 'level', {
    get: function get() {
      return logger.level;
    },
    set: function set(newValue) {
      logger.level = newValue;
    },
    enumerable: true,
    configurable: true
  });
  // This lambda function is necessary to workaround unexpected memory leaks
  // caused by NodeJS behavior described in https://bugs.chromium.org/p/v8/issues/detail?id=2869
  var unleakIfString = function unleakIfString(x) {
    return _lodash2['default'].isString(x) ? (' ' + x).substr(1) : x;
  };
  // add all the levels from `npmlog`, and map to the underlying logger
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function () {
      var level = _step2.value;

      wrappedLogger[level] = function () {
        var _logger$level;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_logger$level = logger[level]).call.apply(_logger$level, [logger, _lodash2['default'].isFunction(prefix) ? prefix() : prefix].concat(_toConsumableArray(args.map(unleakIfString))));
      };
    };

    for (var _iterator2 = _getIterator(NPM_LEVELS), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
    // add method to log an error, and throw it, for convenience
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  wrappedLogger.errorAndThrow = function (err) {
    // make sure we have an `Error` object. Wrap if necessary
    if (!(err instanceof Error)) {
      err = new Error(err);
    }
    // log and throw
    this.error(unleakIfString(err));
    throw err;
  };
  if (!usingGlobalLog) {
    // if we're not using a global log specified from some top-level package,
    // set the log level to a default of verbose. Otherwise, let the top-level
    // package set the log level
    wrappedLogger.level = 'verbose';
  }
  wrappedLogger.levels = NPM_LEVELS;
  return wrappedLogger;
}

// export a default logger with no prefix
var log = getLogger();

exports.log = log;
exports.patchLogger = patchLogger;
exports.getLogger = getLogger;
exports['default'] = log;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFFO09BQUEsQ0FBQzs7O0FBSG5DLHVDQUFrQixVQUFVLGlIQUFFOztLQUk3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxlQUFhLENBQUMsYUFBYSxHQUFHLFVBQVUsR0FBRyxFQUFFOztBQUUzQyxRQUFJLEVBQUUsR0FBRyxZQUFZLEtBQUssQ0FBQSxBQUFDLEVBQUU7QUFDM0IsU0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCOztBQUVELFFBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDaEMsVUFBTSxHQUFHLENBQUM7R0FDWCxDQUFDO0FBQ0YsTUFBSSxDQUFDLGNBQWMsRUFBRTs7OztBQUluQixpQkFBYSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7R0FDakM7QUFDRCxlQUFhLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztBQUNsQyxTQUFPLGFBQWEsQ0FBQztDQUN0Qjs7O0FBR0QsSUFBTSxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUM7O1FBRWYsR0FBRyxHQUFILEdBQUc7UUFBRSxXQUFXLEdBQVgsV0FBVztRQUFFLFNBQVMsR0FBVCxTQUFTO3FCQUNyQixHQUFHIiwiZmlsZSI6ImxpYi9sb2dnaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5wbWxvZyBmcm9tICducG1sb2cnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG4vLyBsZXZlbHMgdGhhdCBhcmUgYXZhaWxhYmxlIGZyb20gYG5wbWxvZ2BcbmNvbnN0IE5QTV9MRVZFTFMgPSBbJ3NpbGx5JywgJ3ZlcmJvc2UnLCAnZGVidWcnLCAnaW5mbycsICdodHRwJywgJ3dhcm4nLCAnZXJyb3InXTtcbmNvbnN0IE1BWF9MT0dfUkVDT1JEU19DT1VOVCA9IDMwMDA7XG5cbi8vIG1vY2sgbG9nIG9iamVjdCB1c2VkIGluIHRlc3RpbmcgbW9kZVxubGV0IG1vY2tMb2cgPSB7fTtcbmZvciAobGV0IGxldmVsIG9mIE5QTV9MRVZFTFMpIHtcbiAgbW9ja0xvZ1tsZXZlbF0gPSAoKSA9PiB7fTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hMb2dnZXIgKGxvZ2dlcikge1xuICBpZiAoIWxvZ2dlci5kZWJ1Zykge1xuICAgIGxvZ2dlci5hZGRMZXZlbCgnZGVidWcnLCAxMDAwLCB7IGZnOiAnYmx1ZScsIGJnOiAnYmxhY2snIH0sICdkYnVnJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2dldExvZ2dlciAoKSB7XG4gIC8vIGNoZWNrIGlmIHRoZSB1c2VyIHNldCB0aGUgYF9URVNUSU5HYCBvciBgX0ZPUkNFX0xPR1NgIGZsYWdcbiAgY29uc3QgdGVzdGluZ01vZGUgPSBwYXJzZUludChwcm9jZXNzLmVudi5fVEVTVElORywgMTApID09PSAxO1xuICBjb25zdCBmb3JjZUxvZ01vZGUgPSBwYXJzZUludChwcm9jZXNzLmVudi5fRk9SQ0VfTE9HUywgMTApID09PSAxO1xuXG4gIC8vIGlmIGlzIHBvc3NpYmxlIHRoYXQgdGhlcmUgaXMgYSBsb2dnZXIgaW5zdGFuY2UgdGhhdCBpcyBhbHJlYWR5IGFyb3VuZCxcbiAgLy8gaW4gd2hpY2ggY2FzZSB3ZSB3YW50IHQgbyB1c2UgdGhhdFxuICBjb25zdCB1c2luZ0dsb2JhbExvZyA9ICEhZ2xvYmFsLl9nbG9iYWxfbnBtbG9nO1xuICBsZXQgbG9nZ2VyO1xuICBpZiAodGVzdGluZ01vZGUgJiYgIWZvcmNlTG9nTW9kZSkge1xuICAgIC8vIGluIHRlc3RpbmcgbW9kZSwgdXNlIGEgbW9jayBsb2dnZXIgb2JqZWN0IHRoYXQgd2UgY2FuIHF1ZXJ5XG4gICAgbG9nZ2VyID0gbW9ja0xvZztcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2UsIGVpdGhlciB1c2UgdGhlIGdsb2JhbCwgb3IgYSBuZXcgYG5wbWxvZ2Agb2JqZWN0XG4gICAgbG9nZ2VyID0gZ2xvYmFsLl9nbG9iYWxfbnBtbG9nIHx8IG5wbWxvZztcbiAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAxMDAwMCwgd2hpY2ggY2F1c2VzIGV4Y2Vzc2l2ZSBtZW1vcnkgdXNhZ2VcbiAgICBsb2dnZXIubWF4UmVjb3JkU2l6ZSA9IE1BWF9MT0dfUkVDT1JEU19DT1VOVDtcbiAgfVxuICBwYXRjaExvZ2dlcihsb2dnZXIpO1xuICByZXR1cm4gW2xvZ2dlciwgdXNpbmdHbG9iYWxMb2ddO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dnZXIgKHByZWZpeCA9IG51bGwpIHtcbiAgbGV0IFtsb2dnZXIsIHVzaW5nR2xvYmFsTG9nXSA9IF9nZXRMb2dnZXIoKTtcblxuICAvLyB3cmFwIHRoZSBsb2dnZXIgc28gdGhhdCB3ZSBjYW4gY2F0Y2ggYW5kIG1vZGlmeSBhbnkgbG9nZ2luZ1xuICBsZXQgd3JhcHBlZExvZ2dlciA9IHt1bndyYXA6ICgpID0+IGxvZ2dlcn07XG5cbiAgLy8gYWxsb3cgYWNjZXNzIHRvIHRoZSBsZXZlbCBvZiB0aGUgdW5kZXJseWluZyBsb2dnZXJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdyYXBwZWRMb2dnZXIsICdsZXZlbCcsIHtcbiAgICBnZXQ6ICgpID0+IHsgcmV0dXJuIGxvZ2dlci5sZXZlbDsgfSxcbiAgICBzZXQ6IChuZXdWYWx1ZSkgPT4geyBsb2dnZXIubGV2ZWwgPSBuZXdWYWx1ZTsgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgLy8gVGhpcyBsYW1iZGEgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmthcm91bmQgdW5leHBlY3RlZCBtZW1vcnkgbGVha3NcbiAgLy8gY2F1c2VkIGJ5IE5vZGVKUyBiZWhhdmlvciBkZXNjcmliZWQgaW4gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Mjg2OVxuICBjb25zdCB1bmxlYWtJZlN0cmluZyA9ICh4KSA9PiBfLmlzU3RyaW5nKHgpID8gYCAke3h9YC5zdWJzdHIoMSkgOiB4O1xuICAvLyBhZGQgYWxsIHRoZSBsZXZlbHMgZnJvbSBgbnBtbG9nYCwgYW5kIG1hcCB0byB0aGUgdW5kZXJseWluZyBsb2dnZXJcbiAgZm9yIChsZXQgbGV2ZWwgb2YgTlBNX0xFVkVMUykge1xuICAgIHdyYXBwZWRMb2dnZXJbbGV2ZWxdID0gKC4uLmFyZ3MpID0+IGxvZ2dlcltsZXZlbF0uY2FsbChsb2dnZXIsXG4gICAgICBfLmlzRnVuY3Rpb24ocHJlZml4KSA/IHByZWZpeCgpIDogcHJlZml4LFxuICAgICAgLi4uKGFyZ3MubWFwKHVubGVha0lmU3RyaW5nKSkpO1xuICB9XG4gIC8vIGFkZCBtZXRob2QgdG8gbG9nIGFuIGVycm9yLCBhbmQgdGhyb3cgaXQsIGZvciBjb252ZW5pZW5jZVxuICB3cmFwcGVkTG9nZ2VyLmVycm9yQW5kVGhyb3cgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gYEVycm9yYCBvYmplY3QuIFdyYXAgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgLy8gbG9nIGFuZCB0aHJvd1xuICAgIHRoaXMuZXJyb3IodW5sZWFrSWZTdHJpbmcoZXJyKSk7XG4gICAgdGhyb3cgZXJyO1xuICB9O1xuICBpZiAoIXVzaW5nR2xvYmFsTG9nKSB7XG4gICAgLy8gaWYgd2UncmUgbm90IHVzaW5nIGEgZ2xvYmFsIGxvZyBzcGVjaWZpZWQgZnJvbSBzb21lIHRvcC1sZXZlbCBwYWNrYWdlLFxuICAgIC8vIHNldCB0aGUgbG9nIGxldmVsIHRvIGEgZGVmYXVsdCBvZiB2ZXJib3NlLiBPdGhlcndpc2UsIGxldCB0aGUgdG9wLWxldmVsXG4gICAgLy8gcGFja2FnZSBzZXQgdGhlIGxvZyBsZXZlbFxuICAgIHdyYXBwZWRMb2dnZXIubGV2ZWwgPSAndmVyYm9zZSc7XG4gIH1cbiAgd3JhcHBlZExvZ2dlci5sZXZlbHMgPSBOUE1fTEVWRUxTO1xuICByZXR1cm4gd3JhcHBlZExvZ2dlcjtcbn1cblxuLy8gZXhwb3J0IGEgZGVmYXVsdCBsb2dnZXIgd2l0aCBubyBwcmVmaXhcbmNvbnN0IGxvZyA9IGdldExvZ2dlcigpO1xuXG5leHBvcnQgeyBsb2csIHBhdGNoTG9nZ2VyLCBnZXRMb2dnZXIgfTtcbmV4cG9ydCBkZWZhdWx0IGxvZztcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==
