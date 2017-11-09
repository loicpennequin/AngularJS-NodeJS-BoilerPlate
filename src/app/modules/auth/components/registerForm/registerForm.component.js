
'use strict';
angular.module('auth')
  .component('registerForm', {
    templateUrl : 'registerForm.component.html',
    controller : registerFormController,
  })

function registerFormController(AuthFactory){
  let $ctrl = this;
  $ctrl.messages;

  $ctrl.$onInit = function(){
    $ctrl.name = "Register Form";
  };

  $ctrl.register =  function(){
      AuthFactory.register($ctrl.new).then(response =>{
          $ctrl.messages = [];
          $ctrl.messages.push(response.data.msg);
      }, error=>{
          $ctrl.messages = response.data.errors;
      });
  };
};
