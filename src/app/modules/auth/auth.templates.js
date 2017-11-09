angular.module('auth').run(['$templateCache', function($templateCache) {
    $templateCache.put('loginForm.component.html',
        "<div class=\"loginForm-component\">\r\n  <h1>{{$ctrl.name}}</h1>\r\n  <form ng-submit=\"$ctrl.login()\">\r\n      <div class=\"form-control\">\r\n          <label>Username</label>\r\n          <input type=\"text\" ng-model=\"$ctrl.user.username\"/>\r\n      </div>\r\n      <div class=\"form-control\">\r\n          <label>Password</label>\r\n          <input type=\"password\" ng-model=\"$ctrl.user.password\"/>\r\n      </div>\r\n      <div class=\"form-control\">\r\n          <input type=\"submit\" value=\"Login\"/>\r\n      </div>\r\n  </form>\r\n  <button ng-click=\"$ctrl.logout()\">Logout</button>\r\n  <p>{{$ctrl.message}}</p>\r\n\r\n</div>\r\n<p>Are you logged in ? <strong>\r\n  <span style=\"color: limegreen\" ng-if=\"$ctrl.isLoggedIn === true\">YES</span>\r\n  <span ng-if=\"$ctrl.isLoggedIn === false\" style=\"color: red\">NO</span></strong></p>\r\n");
}]);
angular.module('auth').run(['$templateCache', function($templateCache) {
    $templateCache.put('registerForm.component.html',
        "<div class=\"registerForm-component\">\r\n    <h1>{{$ctrl.name}}</h1>\r\n    <form ng-submit=\"$ctrl.register()\" name=\"registerForm\" novalidate>\r\n        <div class=\"form-control\">\r\n            <label>UserName</label>\r\n            <input type=\"text\"\r\n                   name=\"username\"\r\n                   ng-model=\"$ctrl.new.username\"\r\n                   ng-minlength=\"4\"\r\n                   ng-maxlength=\"20\"\r\n                   required/>\r\n            <div ng-if=\"registerForm.username.$touched\" ng-messages=\"registerForm.username.$error\">\r\n                <div class=\"form-alert\" ng-message=\"minlength\">\r\n                    Username must be at least 4 characters long.\r\n                </div>\r\n                <div class=\"form-alert\" ng-message=\"maxlength\">\r\n                    Username must be under 20 characters long.\r\n                </div>\r\n                <div class=\"form-alert\" ng-message=\"required\">\r\n                    Username is required.\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"form-control\">\r\n            <label>Password</label>\r\n            <input type=\"password\"\r\n                   name=\"password\"\r\n                   ng-model=\"$ctrl.new.password\"\r\n                   ng-minlength=\"8\"\r\n                   required/>\r\n            <div ng-if=\"registerForm.password.$touched\" ng-messages=\"registerForm.password.$error\">\r\n                <div class=\"form-alert\" ng-message=\"minlength\">\r\n                    Password must be at least 8 characters long.\r\n                </div>\r\n                <div class=\"form-alert\" ng-message=\"required\">\r\n                    Password is required.\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"form-control\">\r\n            <label>Confirm Password</label>\r\n            <input type=\"password\"\r\n                   name=\"passwordmatch\"\r\n                   ng-model=\"$ctrl.new.passwordMatch\"\r\n                   required/>\r\n            <div ng-if=\"registerForm.passwordmatch.$touched\" ng-messages=\"registerForm.passwordmatch.$error\">\r\n                <div class=\"form-alert\" ng-message=\"required\">\r\n                    Please confirm your password.\r\n                </div>\r\n                <div class=\"form-alert\" ng-if=\"$ctrl.new.password !== $ctrl.new.passwordMatch\">\r\n                    Your passwords don't match.\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"form-control\">\r\n            <label>Email</label>\r\n            <input ng-model=\"$ctrl.new.email\" name=\"email\" type=\"email\" required/>\r\n            <div ng-if=\"registerForm.email.$touched\" ng-messages=\"registerForm.email.$error\">\r\n                <div class=\"form-alert\" ng-message=\"required\">\r\n                    Email is required.\r\n                </div>\r\n                <div class=\"form-alert\" ng-message=\"email\">\r\n                    Invalid email address.\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"form-control\">\r\n            <input type=\"submit\" value=\"Register\" ng-disabled=\"!registerForm.$valid\"/>\r\n        </div>\r\n    </form>\r\n    <div ng-repeat=\"msg in $ctrl.messages\">\r\n        {{msg}}\r\n    </div>\r\n</div>\r\n");
}]);