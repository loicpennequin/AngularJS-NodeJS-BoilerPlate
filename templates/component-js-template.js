module.exports = (moduleName, componentName)=>{
  let content = `
'use strict';
angular.module('${moduleName}')
  .component('${componentName}', {
    templateUrl : '${componentName}.component.html',
    controller : ${componentName}Controller,
  })

function ${componentName}Controller(){
  let $ctrl = this;

  $ctrl.$onInit = function(){
    $ctrl.name = "${componentName}";
  };
};`
  return content;
}
