'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _appiumXcode = require('appium-xcode');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob2 = require('glob');

var _glob3 = _interopRequireDefault(_glob2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var glob = _bluebird2['default'].promisify(_glob3['default']);
var log = _appiumSupport.logger.getLogger('AuthorizeIOS');

exports['default'] = function authorize(insecure) {
  var xcodeDir, user, cmd, _args, olderXcodeSimulatorPath, directories, newerXcodeSimulatorPath, args;

  return _regeneratorRuntime.async(function authorize$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        xcodeDir = undefined;
        user = undefined;
        context$1$0.prev = 2;

        // enable developer tools
        log.info('Enabling DevToolsSecurity');
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('DevToolsSecurity', ['--enable']));

      case 6:
        // update security db -- removes authorization prompt
        log.info('Updating security db for ' + ((insecure ? 'insecure' : 'developer') + ' access'));
        cmd = 'security';
        _args = ['authorizationdb', 'write', 'system.privilege.taskport', insecure ? 'allow' : 'is-developer'];
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, _args));

      case 11:

        log.info('Granting access to built-in simulator apps');

        if (process.env.HOME) {
          context$1$0.next = 14;
          break;
        }

        throw new Error('Could not determine your $HOME');

      case 14:

        user = /\/([^\/]+)$/.exec(process.env.HOME)[1];
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap((0, _appiumXcode.getPath)());

      case 17:
        xcodeDir = context$1$0.sent;

        log.info('The xcode directory is : ' + xcodeDir);
        context$1$0.next = 24;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t0 = context$1$0['catch'](2);

        log.errorAndThrow(context$1$0.t0);

      case 24:
        olderXcodeSimulatorPath = _path2['default'].resolve(xcodeDir, 'Platforms/iPhoneSimulator.platform/' + 'Developer/SDKs/iPhoneSimulator*.sdk/Applications');
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(glob(olderXcodeSimulatorPath));

      case 27:
        directories = context$1$0.sent;
        newerXcodeSimulatorPath = _path2['default'].resolve('/Library/Developer/CoreSimulator/' + 'Profiles/Runtimes/iOS *.simruntime/' + 'Contents/Resources/RuntimeRoot/Applications/');
        context$1$0.t1 = directories;
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(glob(newerXcodeSimulatorPath));

      case 32:
        context$1$0.t2 = context$1$0.sent;
        directories = context$1$0.t1.concat.call(context$1$0.t1, context$1$0.t2);

        directories = directories.filter(function callee$1$0(dir) {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(dir));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });

        args = ['-R', user + ':'].concat(_toConsumableArray(directories));

        log.info('Changing ownership to \'' + user + '\' on directories: ' + directories.join(', '));
        context$1$0.prev = 37;
        context$1$0.next = 40;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('chown', args));

      case 40:
        context$1$0.next = 46;
        break;

      case 42:
        context$1$0.prev = 42;
        context$1$0.t3 = context$1$0['catch'](37);

        log.error('Encountered an issue changing user priveledges ' + ('for iOS sim app dirs: ' + directories));
        log.error('Error was: ' + context$1$0.t3.message);

      case 46:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 21], [37, 42]]);
};

module.exports = exports['default'];

// change permission
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hdXRob3JpemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQUFxQixjQUFjOzsyQkFDWCxjQUFjOzs2QkFDWCxnQkFBZ0I7O29CQUMxQixNQUFNOzs7O3FCQUNMLE1BQU07Ozs7d0JBQ1YsVUFBVTs7OztBQUd4QixJQUFNLElBQUksR0FBRyxzQkFBRSxTQUFTLG1CQUFPLENBQUM7QUFDaEMsSUFBTSxHQUFHLEdBQUcsc0JBQU8sU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztxQkFFOUIsU0FBZSxTQUFTLENBQUUsUUFBUTtNQUMzQyxRQUFRLEVBQ1IsSUFBSSxFQVNGLEdBQUcsRUFDSCxLQUFJLEVBaUJOLHVCQUF1QixFQUd2QixXQUFXLEVBRVgsdUJBQXVCLEVBU3ZCLElBQUk7Ozs7Ozs7QUExQ0osZ0JBQVE7QUFDUixZQUFJOzs7O0FBSU4sV0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOzt5Q0FDaEMsd0JBQUssa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztBQUU1QyxXQUFHLENBQUMsSUFBSSxDQUFDLGdDQUNNLFFBQVEsR0FBRyxVQUFVLEdBQUcsV0FBVyxDQUFBLGFBQVMsQ0FBQyxDQUFDO0FBQ3pELFdBQUcsR0FBRyxVQUFVO0FBQ2hCLGFBQUksR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSwyQkFBMkIsRUFDdEQsUUFBUSxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUU7O3lDQUM1Qyx3QkFBSyxHQUFHLEVBQUUsS0FBSSxDQUFDOzs7O0FBRXJCLFdBQUcsQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQzs7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJOzs7OztjQUNiLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDOzs7O0FBR25ELFlBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O3lDQUM5QiwyQkFBUzs7O0FBQTFCLGdCQUFROztBQUNSLFdBQUcsQ0FBQyxJQUFJLCtCQUE2QixRQUFRLENBQUcsQ0FBQzs7Ozs7Ozs7QUFFakQsV0FBRyxDQUFDLGFBQWEsZ0JBQUcsQ0FBQzs7O0FBSW5CLCtCQUF1QixHQUFHLGtCQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQ3ZCLHFDQUFxQyxHQUNyQyxrREFBa0QsQ0FBQzs7eUNBQ3ZELElBQUksQ0FBQyx1QkFBdUIsQ0FBQzs7O0FBQWpELG1CQUFXO0FBRVgsK0JBQXVCLEdBQUcsa0JBQUssT0FBTyxDQUFDLG1DQUFtQyxHQUNsRCxxQ0FBcUMsR0FDckMsOENBQThDLENBQUM7eUJBQzdELFdBQVc7O3lDQUFjLElBQUksQ0FBQyx1QkFBdUIsQ0FBQzs7OztBQUFwRSxtQkFBVyxrQkFBZSxNQUFNOztBQUVoQyxtQkFBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsb0JBQU8sR0FBRzs7Ozs7aURBQzVCLGtCQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Ozs7U0FDNUIsQ0FBQyxDQUFDOztBQUVDLFlBQUksSUFBSSxJQUFJLEVBQUssSUFBSSxrQ0FBUSxXQUFXOztBQUU1QyxXQUFHLENBQUMsSUFBSSw4QkFBMkIsSUFBSSwyQkFBcUIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRyxDQUFDOzs7eUNBRTlFLHdCQUFLLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFFekIsV0FBRyxDQUFDLEtBQUssQ0FBQyxnRkFDNEIsV0FBVyxDQUFFLENBQUMsQ0FBQztBQUNyRCxXQUFHLENBQUMsS0FBSyxpQkFBZSxlQUFJLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRTFDIiwiZmlsZSI6ImxpYi9hdXRob3JpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcbmltcG9ydCB7IGdldFBhdGggfSBmcm9tICdhcHBpdW0teGNvZGUnO1xuaW1wb3J0IHsgZnMsIGxvZ2dlciB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IF9nbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5cbmNvbnN0IGdsb2IgPSBCLnByb21pc2lmeShfZ2xvYik7XG5jb25zdCBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdBdXRob3JpemVJT1MnKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYXV0aG9yaXplIChpbnNlY3VyZSkge1xuICBsZXQgeGNvZGVEaXI7XG4gIGxldCB1c2VyO1xuXG4gIHRyeSB7XG4gICAgLy8gZW5hYmxlIGRldmVsb3BlciB0b29sc1xuICAgIGxvZy5pbmZvKCdFbmFibGluZyBEZXZUb29sc1NlY3VyaXR5Jyk7XG4gICAgYXdhaXQgZXhlYygnRGV2VG9vbHNTZWN1cml0eScsIFsnLS1lbmFibGUnXSk7XG4gICAgLy8gdXBkYXRlIHNlY3VyaXR5IGRiIC0tIHJlbW92ZXMgYXV0aG9yaXphdGlvbiBwcm9tcHRcbiAgICBsb2cuaW5mbyhgVXBkYXRpbmcgc2VjdXJpdHkgZGIgZm9yIGAgK1xuICAgICAgICAgICAgICAgIGAke2luc2VjdXJlID8gJ2luc2VjdXJlJyA6ICdkZXZlbG9wZXInfSBhY2Nlc3NgKTtcbiAgICBsZXQgY21kID0gJ3NlY3VyaXR5JztcbiAgICBsZXQgYXJncyA9IFsnYXV0aG9yaXphdGlvbmRiJywgJ3dyaXRlJywgJ3N5c3RlbS5wcml2aWxlZ2UudGFza3BvcnQnLFxuICAgICAgICAgICAgICAgIChpbnNlY3VyZSA/ICdhbGxvdycgOiAnaXMtZGV2ZWxvcGVyJyldO1xuICAgIGF3YWl0IGV4ZWMoY21kLCBhcmdzKTtcblxuICAgIGxvZy5pbmZvKCdHcmFudGluZyBhY2Nlc3MgdG8gYnVpbHQtaW4gc2ltdWxhdG9yIGFwcHMnKTtcbiAgICBpZiAoIXByb2Nlc3MuZW52LkhPTUUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSB5b3VyICRIT01FJyk7XG4gICAgfVxuXG4gICAgdXNlciA9IC9cXC8oW15cXC9dKykkLy5leGVjKHByb2Nlc3MuZW52LkhPTUUpWzFdO1xuICAgIHhjb2RlRGlyID0gYXdhaXQgZ2V0UGF0aCgpO1xuICAgIGxvZy5pbmZvKGBUaGUgeGNvZGUgZGlyZWN0b3J5IGlzIDogJHt4Y29kZURpcn1gKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGUpO1xuICB9XG5cbiAgLy8gY2hhbmdlIHBlcm1pc3Npb25cbiAgbGV0IG9sZGVyWGNvZGVTaW11bGF0b3JQYXRoID0gcGF0aC5yZXNvbHZlKHhjb2RlRGlyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1BsYXRmb3Jtcy9pUGhvbmVTaW11bGF0b3IucGxhdGZvcm0vJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnRGV2ZWxvcGVyL1NES3MvaVBob25lU2ltdWxhdG9yKi5zZGsvQXBwbGljYXRpb25zJyk7XG4gIGxldCBkaXJlY3RvcmllcyA9IGF3YWl0IGdsb2Iob2xkZXJYY29kZVNpbXVsYXRvclBhdGgpO1xuXG4gIGxldCBuZXdlclhjb2RlU2ltdWxhdG9yUGF0aCA9IHBhdGgucmVzb2x2ZSgnL0xpYnJhcnkvRGV2ZWxvcGVyL0NvcmVTaW11bGF0b3IvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnUHJvZmlsZXMvUnVudGltZXMvaU9TICouc2ltcnVudGltZS8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50cy9SZXNvdXJjZXMvUnVudGltZVJvb3QvQXBwbGljYXRpb25zLycpO1xuICBkaXJlY3RvcmllcyA9IGRpcmVjdG9yaWVzLmNvbmNhdChhd2FpdCBnbG9iKG5ld2VyWGNvZGVTaW11bGF0b3JQYXRoKSk7XG5cbiAgZGlyZWN0b3JpZXMgPSBkaXJlY3Rvcmllcy5maWx0ZXIoYXN5bmMgKGRpcikgPT4ge1xuICAgIHJldHVybiBhd2FpdCBmcy5leGlzdHMoZGlyKTtcbiAgfSk7XG5cbiAgbGV0IGFyZ3MgPSBbJy1SJywgYCR7dXNlcn06YCwgLi4uZGlyZWN0b3JpZXNdO1xuXG4gIGxvZy5pbmZvKGBDaGFuZ2luZyBvd25lcnNoaXAgdG8gJyR7dXNlcn0nIG9uIGRpcmVjdG9yaWVzOiAke2RpcmVjdG9yaWVzLmpvaW4oJywgJyl9YCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgZXhlYygnY2hvd24nLCBhcmdzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yKGBFbmNvdW50ZXJlZCBhbiBpc3N1ZSBjaGFuZ2luZyB1c2VyIHByaXZlbGVkZ2VzIGAgK1xuICAgICAgICAgICAgICAgICBgZm9yIGlPUyBzaW0gYXBwIGRpcnM6ICR7ZGlyZWN0b3JpZXN9YCk7XG4gICAgbG9nLmVycm9yKGBFcnJvciB3YXM6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uIn0=
