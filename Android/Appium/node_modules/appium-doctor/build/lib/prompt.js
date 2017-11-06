'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utils = require('./utils');

var persistentResponse = undefined;

var fixItQuestion = {
  type: 'list',
  name: 'confirmation',
  message: 'Fix it:',
  choices: ['yes', 'no', 'always', 'never'],
  filter: function filter(val) {
    return val.toLowerCase();
  }
};

function configure(opts) {
  if (opts.yes) {
    persistentResponse = 'yes';
  }
  if (opts.no) {
    persistentResponse = 'no';
  }
}

function clear() {
  persistentResponse = undefined;
}

function fixIt() {
  var resp;
  return _regeneratorRuntime.async(function fixIt$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!persistentResponse) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', persistentResponse);

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_utils.inquirer.prompt(fixItQuestion));

      case 4:
        resp = context$1$0.sent;

        persistentResponse = resp.confirmation === 'always' ? 'yes' : persistentResponse;
        persistentResponse = resp.confirmation === 'never' ? 'no' : persistentResponse;
        return context$1$0.abrupt('return', persistentResponse || resp.confirmation);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports.configure = configure;
exports.fixIt = fixIt;
exports.clear = clear;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm9tcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQXlCLFNBQVM7O0FBRWxDLElBQUksa0JBQWtCLFlBQUEsQ0FBQzs7QUFFdkIsSUFBTSxhQUFhLEdBQUc7QUFDcEIsTUFBSSxFQUFFLE1BQU07QUFDWixNQUFJLEVBQUUsY0FBYztBQUNwQixTQUFPLEVBQUUsU0FBUztBQUNsQixTQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7QUFDekMsUUFBTSxFQUFDLGdCQUFDLEdBQUcsRUFBRTtBQUNYLFdBQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0dBQzFCO0NBQ0YsQ0FBQzs7QUFFRixTQUFTLFNBQVMsQ0FBRSxJQUFJLEVBQUU7QUFDeEIsTUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1osc0JBQWtCLEdBQUcsS0FBSyxDQUFDO0dBQzVCO0FBQ0QsTUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ1gsc0JBQWtCLEdBQUcsSUFBSSxDQUFDO0dBQzNCO0NBQ0Y7O0FBRUQsU0FBUyxLQUFLLEdBQUk7QUFDaEIsb0JBQWtCLEdBQUcsU0FBUyxDQUFDO0NBQ2hDOztBQUVELFNBQWUsS0FBSztNQUlkLElBQUk7Ozs7YUFISixrQkFBa0I7Ozs7OzRDQUNiLGtCQUFrQjs7Ozt5Q0FFVixnQkFBUyxNQUFNLENBQUMsYUFBYSxDQUFDOzs7QUFBM0MsWUFBSTs7QUFDUiwwQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsR0FBRyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7QUFDakYsMEJBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLEdBQUcsSUFBSSxHQUFHLGtCQUFrQixDQUFDOzRDQUN4RSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsWUFBWTs7Ozs7OztDQUMvQzs7UUFFUSxTQUFTLEdBQVQsU0FBUztRQUFFLEtBQUssR0FBTCxLQUFLO1FBQUUsS0FBSyxHQUFMLEtBQUsiLCJmaWxlIjoibGliL3Byb21wdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlucXVpcmVyIH0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBwZXJzaXN0ZW50UmVzcG9uc2U7XG5cbmNvbnN0IGZpeEl0UXVlc3Rpb24gPSB7XG4gIHR5cGU6ICdsaXN0JyxcbiAgbmFtZTogJ2NvbmZpcm1hdGlvbicsXG4gIG1lc3NhZ2U6ICdGaXggaXQ6JyxcbiAgY2hvaWNlczogWyd5ZXMnLCAnbm8nLCAnYWx3YXlzJywgJ25ldmVyJ10sXG4gIGZpbHRlciAodmFsKSB7XG4gICAgcmV0dXJuIHZhbC50b0xvd2VyQ2FzZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjb25maWd1cmUgKG9wdHMpIHtcbiAgaWYgKG9wdHMueWVzKSB7XG4gICAgcGVyc2lzdGVudFJlc3BvbnNlID0gJ3llcyc7XG4gIH1cbiAgaWYgKG9wdHMubm8pIHtcbiAgICBwZXJzaXN0ZW50UmVzcG9uc2UgPSAnbm8nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgcGVyc2lzdGVudFJlc3BvbnNlID0gdW5kZWZpbmVkO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmaXhJdCAoKSB7XG4gIGlmIChwZXJzaXN0ZW50UmVzcG9uc2UpIHtcbiAgICByZXR1cm4gcGVyc2lzdGVudFJlc3BvbnNlO1xuICB9XG4gIGxldCByZXNwID0gYXdhaXQgaW5xdWlyZXIucHJvbXB0KGZpeEl0UXVlc3Rpb24pO1xuICBwZXJzaXN0ZW50UmVzcG9uc2UgPSByZXNwLmNvbmZpcm1hdGlvbiA9PT0gJ2Fsd2F5cycgPyAneWVzJyA6IHBlcnNpc3RlbnRSZXNwb25zZTtcbiAgcGVyc2lzdGVudFJlc3BvbnNlID0gcmVzcC5jb25maXJtYXRpb24gPT09ICduZXZlcicgPyAnbm8nIDogcGVyc2lzdGVudFJlc3BvbnNlO1xuICByZXR1cm4gcGVyc2lzdGVudFJlc3BvbnNlIHx8IHJlc3AuY29uZmlybWF0aW9uO1xufVxuXG5leHBvcnQgeyBjb25maWd1cmUsIGZpeEl0LCBjbGVhciB9O1xuIl0sInNvdXJjZVJvb3QiOiIuLi8uLiJ9
