
'use strict';
angular.module('auth')
  .component('loginForm', {
    templateUrl : 'loginForm.component.html',
    controller : loginFormController,
  })

function loginFormController(AuthFactory){
  let $ctrl = this;
  $ctrl.isLoggedIn;

  $ctrl.$onInit = function(){
    $ctrl.name = "Login Form";
    AuthFactory.isLoggedIn().then(response =>{
        $ctrl.isLoggedIn = response.data.loggedIn;
    }, error =>{
        $ctrl.isLoggedIn = error.data.loggedIn;
    })
  };

  $ctrl.login = function(){
      AuthFactory.login($ctrl.user).then(response =>{
          $ctrl.message = "Hello, " + response.data.username + ", you are now logged in"
          $ctrl.isLoggedIn = true;
      }, error =>{
          $ctrl.message = error.data.message;
      });
  };

  $ctrl.logout = function(){
      AuthFactory.logout().then(response =>{
          $ctrl.isLoggedIn = false;
          $ctrl.message = "You are now logged out."
      });
  };
};
