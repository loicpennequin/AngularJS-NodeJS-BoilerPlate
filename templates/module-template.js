module.exports = (moduleName)=>{
  let content = `
'use strict';

angular.module('${moduleName}', []);`;
  return content;
}
